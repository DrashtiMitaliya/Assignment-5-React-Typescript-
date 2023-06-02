import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { encryptedText } from '../../utils/cipher';
import { signUpValidationSchema } from '../../Constants/validation';
import { Messages } from '../../Constants/Messages';
import { signUpFormValues } from '../../Constants/commonType';


export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: signUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    isActive: false,
    confirmPassword: '',
  };
  const navigate = useNavigate();

  const onSubmit = (values: signUpFormValues) => {
    values.password = encryptedText(values.password);
    values.confirmPassword = encryptedText(values.confirmPassword);

    let signUpData: signUpFormValues[] = [];
    if (localStorage.getItem('signUpData') === null) {
      signUpData = [];
    } else {
      signUpData = JSON.parse(localStorage.getItem('signUpData') || '[]');
    }

    if (signUpData.some(item => item.email === values.email)) {
      toast.error(Messages.Already_Exists_User);
    } else {
      values.isActive = true;
      signUpData.push(values);
      localStorage.setItem('signUpData', JSON.stringify(signUpData));
      localStorage.setItem('isLogin', 'true');
      toast.success(Messages.Successful_SignIn);
      navigate('/home');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Flex
            minH={'93.5vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
          >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Sign up
                </Heading>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Field type="text" name='firstName' className="form-control" />
                        <p className='text-danger text-start'><ErrorMessage name='firstName'></ErrorMessage></p>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName" >
                        <FormLabel>Last Name</FormLabel>
                        <Field type="text" name='lastName' className="form-control" />
                        <p className='text-danger text-start'><ErrorMessage name='lastName' ></ErrorMessage></p>
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="mobileNumber" isRequired>
                    <FormLabel>Mobile Number</FormLabel>
                    <Field type="tel" name='phoneNumber' className="form-control" />
                    <p className='text-danger text-start'><ErrorMessage name='phoneNumber'></ErrorMessage></p>
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Field type="email" name='email' className="form-control" />
                    <p className='text-danger text-start'> <ErrorMessage name='email'></ErrorMessage></p>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Field type={showPassword ? 'text' : 'password'} name='password' className="form-control" />
                      <InputRightElement h={'full'}>
                        <Button
                          size='sm'
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <p className='text-danger text-start'> <ErrorMessage name='password'></ErrorMessage></p>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Field type={showPassword ? 'text' : 'password'} name='confirmPassword' className="form-control" />
                      <InputRightElement h={'full'}>
                      <Button
                          size='sm'
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <p className='text-danger text-start'> <ErrorMessage name='confirmPassword'></ErrorMessage></p>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type='submit'
                      loadingText="Submitting"
                      size="sm"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user? <Link to='/login' color={'blue.400'}>Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      </Formik>
    </div>
  );
};
