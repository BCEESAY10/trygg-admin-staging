import { useEffect, useRef, useState } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import styles from '@/src/styles/Map.module.css';
import type { DriverMapProps } from '@/types/driver';

import DriverDetailsModal from '../modals/DriverDetailsModal';

const DriverMap = ({ drivers }: DriverMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const adminLocationRef = useRef<[number, number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  useEffect(() => {
    // ===== 1. Initialize map ONCE =====
    if (!mapRef.current) {
      mapRef.current = L.map('map');

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        }
      ).addTo(mapRef.current);
    }

    // ===== 2. Center logic (drivers > admin > fallback) =====
    const validDrivers = drivers.filter(
      d =>
        typeof d.location?.latitude === 'number' &&
        typeof d.location?.longitude === 'number'
    );

    if (validDrivers.length > 0) {
      const bounds = L.latLngBounds(
        validDrivers.map(d => [d.location.latitude, d.location.longitude])
      );

      mapRef.current.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 15,
      });
    } else if (navigator.geolocation) {
      if (adminLocationRef.current) {
        mapRef.current.setView(adminLocationRef.current, 12);
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            const coords: [number, number] = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            adminLocationRef.current = coords;
            mapRef.current?.setView(coords, 12);
          },
          () => {
            mapRef.current?.setView([0, 0], 2);
          }
        );
      }
    } else {
      mapRef.current.setView([0, 0], 2);
    }

    // ====== 3. Update markers ===========
    drivers.forEach(driver => {
      const existingMarker = markersRef.current[driver.driverId];

      if (existingMarker) {
        existingMarker.setLatLng([
          driver.location.latitude,
          driver.location.longitude,
        ]);
      } else {
        const marker = L.marker(
          [driver.location.latitude, driver.location.longitude],
          {
            icon: L.divIcon({
              className: styles.driverMarker,
              html: `<img src="${driver.profilePicture ?? '/profiles/profile-1.avif'}" alt="Driver" />`,
              iconSize: [40, 40],
            }),
          }
        ).addTo(mapRef.current!);

        // ======== Create popup content with clickable div ========
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
      <strong>${driver.fullName}</strong><br/>
      ${driver.status}
    `;
        popupContent.style.cursor = 'pointer';

        popupContent.addEventListener('click', () => {
          setSelectedDriverId(driver?.userId);
          setIsModalOpen(true);
        });

        marker.bindPopup(popupContent);

        marker.on('mouseover', () => {
          marker.openPopup();
        });

        markersRef.current[driver.driverId] = marker;
      }
    });

    // ======== 4. Cleanup removed drivers ==========
    Object.keys(markersRef.current).forEach(driverId => {
      if (!drivers.find(d => d.driverId === driverId)) {
        mapRef.current?.removeLayer(markersRef.current[driverId]);
        delete markersRef.current[driverId];
      }
    });
  }, [drivers]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriverId(null);
  };

  return (
    <>
      <div id="map" className={styles.map__wrapper} />
      {isModalOpen && (
        <DriverDetailsModal
          onClose={handleCloseModal}
          selectedDriverId={selectedDriverId!}
        />
      )}
    </>
  );
};

export default DriverMap;
