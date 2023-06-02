import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/Store/Store'
import { fetchProducts } from '../../Redux/Reducers/ProductSlice';

export const PageNav: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const dispatch = useDispatch();
  const totalProduct = useSelector((state: RootState) => state.products.totalProduct);
  
  const handleChange = (number: number) => {
    setActivePage(number);
  };

  useEffect(() => {
    dispatch(fetchProducts((activePage ?? 0) * 8));
  }, [activePage, dispatch]);


  let active = activePage;
  let items: React.ReactNode[] = [];

  for (let number = 0; number <= totalProduct / 8; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handleChange(number)}>
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination className="d-flex w-100 flex-wrap justify-content-center  ">{items}</Pagination>
    </>
  );
};
