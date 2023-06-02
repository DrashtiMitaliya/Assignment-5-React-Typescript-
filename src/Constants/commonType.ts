export interface FormValues {
  email: string;
  password: string;
}
export interface signUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isActive: boolean;
  confirmPassword: string;
}
export interface updateProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductState {
  loading: boolean;
  products: Product[];
  error: string;
  totalProduct: number;
  skip: number;
}
