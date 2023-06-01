import { toast } from 'react-hot-toast';
import { Messages } from '../Constants/Messages';
import { decryptedText } from './cipher';

const checkLoginAuth = (values: { email: string; password: string }): boolean => {
  if (localStorage.getItem('signUpData') === null) return false;
  const logInData: any[] = JSON.parse(localStorage.getItem('signUpData') || '[]');
  let isUser = false;
  let isLogin = false;
  isUser = logInData.some(
    (item) => item.email === values.email && decryptedText(item.password) === values.password
  );

  if (!isUser) {
    isLogin = false;
    toast.error(Messages.LogIn_Failed);
  } else {
    const temp = logInData.map((item) => {
      if (item.email === values.email && decryptedText(item.password) === values.password) {
        item.isActive = true;
      }
      return item;
    });

    localStorage.setItem('signUpData', JSON.stringify(temp));
    isLogin = true;
  }
  return isLogin;
};

export default checkLoginAuth;
