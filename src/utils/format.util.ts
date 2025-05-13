/**
 * Format số tiền theo định dạng VND
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

/**
 * Format số lượng theo đơn vị
 */
export const formatQuantity = (quantity: number, unit: string): string => {
  return `${quantity.toLocaleString('vi-VN')} ${unit}`;
};

/**
 * Format ngày tháng theo định dạng Việt Nam
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
