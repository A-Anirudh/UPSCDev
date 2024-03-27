import CryptoJS from 'crypto-js';

// Assuming your PASSWORD variable is set globally in your deployment environment
const secretKey = 'p#7sDfG!2hQ9';

export const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encrypted;
};

export const decrypt = (data) => {
  const decrypted = CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
  return decrypted;
};
