// import from packages
import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// import from files
import checkLoginAuth from '../../utils/CheckLoginAuth';
import { Messages } from '../../Constants/Messages';
import { logInPageValidationSchema } from '../../Constants/validation';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import {FormValues} from '../../Constants/commonType'


export const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("isLogin") || "false");

  useEffect(() => {
    if (isLogin) {
      navigate('/home');
    }
  }, [isLogin, navigate]);

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values: FormValues) => {
    if (checkLoginAuth(values)) {
      localStorage.setItem('isLogin', 'true');
      toast.success(Messages.LogIn_Successfully);
      navigate('/home');
    } else {
      toast.error(Messages.Invalid_user);
    }
  };

  return (
    <div>
     { /* This is the LogIn form  */}
      <Formik
        initialValues={initialValues}
        validationSchema={logInPageValidationSchema}
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
                <Heading fontSize={'4xl'}>Log in to your account</Heading>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Field type="email" className="form-control" name='email' />
                    <p className='text-danger text-start'><ErrorMessage name='email'></ErrorMessage></p>
                  </FormControl>
                  <FormControl id="password">
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


                    <p className='text-danger text-start'><ErrorMessage name='password'></ErrorMessage></p>
                  </FormControl>
                  <Stack spacing={15}>
                    <Button
                      type='submit'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Log in
                    </Button>
                    <Stack pt={6}>
                      <Text align={'center'}>
                        don't have a account ? <Link to='/signup' color={'blue.400'} > Sign Up</Link>
                      </Text>
                    </Stack>
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
