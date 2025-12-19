// import { useState } from 'react';

// import Modal from '@/src/components/ui/Modal';
// import styles from '@/src/styles/modals/EditSubAdminModal.module.css';

// const EditSubAdminModal = ({
//   isOpen,
//   onClose,
//   admin,
//   onUpdate,
// }: EditSubAdminModalProps) => {
//   const [formData, setFormData] = useState<AdminFormData>({
//     fullName: admin?.fullName ?? '',
//     email: admin?.email ?? '',
//     phone: admin?.phone ?? '',
//     avatar: admin?.avatar ?? '/profiles/profile-1.avif',
//   });

//   // const [showPassword, setShowPassword] = useState(false);
//   // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (field: keyof AdminFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!admin) return;

//     if (!formData.fullName || !formData.email) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     onUpdate(admin.id, formData);
//     onClose();
//   };

//   const handleClose = () => {
//     if (admin) {
//       setFormData({
//         fullName: admin.fullName,
//         email: admin.email,
//         phone: admin?.phone,
//         avatar: admin.avatar ?? '/profiles/profile-1.avif',
//       });
//     }
//     onClose();
//   };

//   if (!admin) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose} title="Edit Admin Profile">
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/*==================== Avatar Section ====================*/}
//         <div className={styles.avatar__section}>
//           {/* <div className={styles.avatar__wrapper}>
//             <Image
//               width={80}
//               height={80}
//               src={formData.avatar}
//               alt="Admin Avatar"
//               className={styles.avatar__image}
//             />
//           </div> */}
//           {/* <button
//             type="button"
//             onClick={handleAvatarUpload}
//             className={styles.upload__button}
//           >
//             <Upload size={16} />
//             Upload New
//           </button> */}
//         </div>
//         {/*==================== End of Avatar Section ====================*/}

//         {/*==================== Form Fields ====================*/}
//         <div className={styles.form__fields}>
//           {/*==================== Full Name ====================*/}
//           <div className={styles.field__group}>
//             <label className={styles.field__label}>Full Name</label>
//             <input
//               type="text"
//               value={formData.fullName}
//               onChange={e => handleInputChange('fullName', e.target.value)}
//               placeholder="John Migurdia"
//               className={styles.field__input}
//               required
//             />
//           </div>
//           {/*==================== End of Full Name ====================*/}
//           {/*==================== Email ====================*/}
//           <div className={styles.field__group}>
//             <label className={styles.field__label}>Email</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={e => handleInputChange('email', e.target.value)}
//               placeholder="example@gmail.com"
//               className={styles.field__input}
//               required
//             />
//           </div>
//           {/*==================== End of Email ====================*/}
//           {/*==================== Email ====================*/}
//           <div className={styles.field__group}>
//             <label className={styles.field__label}>Phone</label>
//             <input
//               type="phone"
//               value={formData.phone}
//               onChange={e => handleInputChange('phone', e.target.value)}
//               placeholder="Enter Phone Number"
//               className={styles.field__input}
//               required
//             />
//           </div>
//           {/*==================== End of Email ====================*/}
//           {/*==================== Password ====================*/}
//           {/* <div className={styles.field__group}>
//             <label className={styles.field__label}>Phone</label>
//             <div className={styles.password__wrapper}>
//               <input
//                 type={showPassword ? 'text' : 'password}
//                 value={formData.password}
//                 onChange={e => handleInputChange('password', e.target.value)}
//                 placeholder="........."
//                 className={styles.field__input}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className={styles.password__toggle}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div> */}
//           {/*==================== End of Password ====================*/}
//           ==================== Confirm Password ====================
//           {/* <div className={styles.field__group}>
//             <label className={styles.field__label}>Confirm Password</label>
//             <div className={styles.password__wrapper}>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={e =>
//                   handleInputChange('confirmPassword', e.target.value)
//                 }
//                 placeholder="••••••••"
//                 className={styles.field__input}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className={styles.password__toggle}
//               >
//                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div> */}
//           {/*==================== End of Confirm Password ====================*/}
//         </div>
//         {/*==================== End of Form Fields ====================*/}

//         {/*==================== Submit Button ====================*/}
//         <button type="submit" className={styles.update__button}>
//           Update Details
//         </button>
//         {/*==================== End of Submit Button ====================*/}
//       </form>
//     </Modal>
//   );
// };

// export default EditSubAdminModal;
