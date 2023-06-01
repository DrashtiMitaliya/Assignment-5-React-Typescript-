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
      <Navbar style={{background:'#4299e1'}} variant="light" className="flex-wrap flex-column ">
        <Container className="d-flex">
          <BsFillCartCheckFill size={25} />
          <Navbar.Brand href="#home">Zig-cart</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="mx-3">
              Home
            </Link>
            {isActive && <Link to="/profile">Profile</Link>}
          </Nav>
          {isActive && (
            <Link to="/login">
              <Button variant="light me-3  d-flex align-items-center" onClick={logout}>
                <RiLogoutBoxRFill /> Log Out
              </Button>
            </Link>
          )}
          {isActive && (
            <Link to="/password">
              <Button variant="light d-flex align-items-center">
                <RiLockPasswordFill /> Change Password
              </Button>
            </Link>
          )}
        </Container>
      </Navbar>
    </div>
  );
};
