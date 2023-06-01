import * as Yup from 'yup';

// Change Password validation schema
export const changePasswordValidations = Yup.object().shape({
  password: Yup.string()
    .required('please enter password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  nPassword: Yup.string()
    .required('please enter password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("confirmPassword")], "Password does not match"),
});

// Update Profile Page validation schema
export const updateProfileValidations = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  email: Yup.string()
    .email('Invalid email Format')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number can only contain numeric characters")
    .min(10, "Mobile number must be at least 10 digits")
    .max(12, "Mobile number cannot be more than 12 digits")
    .required("Mobile Number is required"),
});

// Sign Up Page validation schema
export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  email: Yup.string()
    .email('Invalid email Format')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number can only contain numeric characters")
    .min(10, "Mobile number must be at least 10 digits")
    .max(12, "Mobile number cannot be more than 12 digits")
    .required("Mobile Number is required"),
  password: Yup.string()
    .required("Please enter a password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref<string>("password")], "Password does not match"),
});

// Log in Page validation schema
export const logInPageValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email Format')
    .required('Email is required'),
  password: Yup.string()
    .required("Please enter a password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
