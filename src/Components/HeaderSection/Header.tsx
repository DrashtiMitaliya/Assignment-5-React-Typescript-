import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Messages } from '../../Constants/Messages';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Stack,
  Flex,
} from '@chakra-ui/react';

export const Header: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(JSON.parse(localStorage.getItem('isLogin') || 'false'));
  const location = useLocation();

  const logout = () => {
    localStorage.setItem('isLogin', JSON.stringify(false));
    toast.success(Messages.LogOut_Account);
    let signUpData: any[] = JSON.parse(localStorage.getItem('signUpData') || '[]');
    let temp = signUpData.map((item) => {
      item.isActive = false;
      return item;
    });
    localStorage.setItem('signUpData', JSON.stringify(temp));
  };

  useEffect(() => {
    setIsActive(JSON.parse(localStorage.getItem('isLogin') || 'false'));
  }, [location]);

  return (
    <div>
      <Navbar style={{ background: '#4299e1' }} variant="light" className="flex-wrap flex-column ">
        <Container className="d-flex">
          <BsFillCartCheckFill size={25} />
          <Navbar.Brand href="#home">Zig-cart</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="mx-3">
              Home
            </Link>

          </Nav>
        
          {isActive &&
            <Flex justifyContent="center" mt={4}>
              <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                  <IconButton
                    aria-label="More server options"
                    icon={<BsThreeDotsVertical />}
                    variant="solid"
                    w="fit-content"
                  />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                  <PopoverArrow />
                  <PopoverBody>
                    <Stack>
                      {isActive && <Link to="/profile"><Button variant=" d-flex align-items-center">
                        <RiLockPasswordFill className='me-2' /> Profile
                      </Button></Link>}
                      {isActive && (
                        <Link to="/password">
                          <Button variant="  d-flex align-items-center">
                            <RiLockPasswordFill className='me-2'/> Change Password
                          </Button>
                        </Link>
                      )}
                      {isActive && (
                        <Link to="/login">
                          <Button variant="  d-flex align-items-center" onClick={logout}>
                            <RiLogoutBoxRFill className='me-2' /> Log Out
                          </Button>
                        </Link>
                      )}


                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>}
        </Container>
      </Navbar>
    </div>
  );
};
