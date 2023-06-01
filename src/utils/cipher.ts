import CryptoJS from 'crypto-js' ;

const key: string | undefined = process.env.REACT_APP_CIPHER_KEY;

const encryptedText = (text: string): string => {
  const data = CryptoJS.AES.encrypt(JSON.stringify(text), key || '').toString();
  return data;
};

const decryptedText = (text: string): string => {
  const bytes = CryptoJS.AES.decrypt(text, key || '');
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export { encryptedText, decryptedText };
