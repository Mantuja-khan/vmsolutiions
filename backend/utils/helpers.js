export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};

export const generateOrderId = () => {
  return 'VM' + Date.now() + Math.floor(Math.random() * 1000);
};