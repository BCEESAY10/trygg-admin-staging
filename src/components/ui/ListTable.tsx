import styles from '@/src/styles/ListTable.module.css';
import type { ExtendedListTableProps } from '@/types/interfaces/admin-layout';

const ListTable = <T extends Record<string, any>>({
  columns,
  data,
  title,
  onRowClick,
}: ExtendedListTableProps<T>) => {
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className={styles.table__container}>
      {/*==================== Table Header ====================*/}
      {title && (
        <div className={styles.table__header}>
          <h3 className={styles.table__title}>{title}</h3>
        </div>
      )}

      {/*==================== Table Content ====================*/}
      <div className={styles.table__wrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map(column => (
                <th key={column.key} className={styles.th}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${styles.tr} ${onRowClick ? styles.clickable : ''}`}
                onClick={() => handleRowClick(row)}
              >
                {columns.map(column => (
                  <td key={column.key} className={styles.td}>
                    {column.render
                      ? column.render(row[column.key], row, index)
                      : (row[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*==================== End of Table Content ====================*/}
    </div>
  );
};

export default ListTable;
