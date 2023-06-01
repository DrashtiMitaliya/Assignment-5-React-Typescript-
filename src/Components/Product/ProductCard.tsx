import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStock } from 'react-icons/ai';
import { MdDiscount } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';
import { PageNav } from '../Pagination/PageNav';

import { fetchProducts } from '../../Redux/Reducers/ProductSlice';

export const ProductCard = () => {
    const productsData = useSelector((state: any) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className='container-fluid'>
            <div className="row">
                {productsData.products ? (
                    productsData.products.map((data: any, index: number) => {
                        if (!data) {
                            return (
                                <div key={index} className=' d-flex justify-content-center'>
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth='5px'
                                        animationDuration='0.75s'
                                        width='96px'
                                        visible={true}
                                    />
                                </div>
                            );
                        }
                        return (
                            <Col sm={12} md={6} lg={4} xl={3} className='p-2' key={index}>
                                <Card style={{ height: '680px' }} className='my-3 bg-light'>
                                    <Card.Header className='p-0'>
                                        <img src={data.thumbnail} style={{ height: '250px', margin: 'auto' }} alt='' />
                                    </Card.Header>
                                    <Card.Header>
                                        <div className='d-flex justify-content-between  align-items-center'>
                                            <Card.Title >{data.title}</Card.Title>
                                            <Button variant='light' className='ms-3 '>
                                                {data.price} $
                                            </Button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className='text-center'>{data.brand}</Card.Title>
                                        <Card.Text  className='text-center' >{data.description}</Card.Text>
                                        <div className='d-flex justify-content-center my-3'>
                                            <Button variant='secondary' className='ms-3 d-flex align-items-center'>
                                                {data.stock} <AiOutlineStock />
                                            </Button>
                                            <Button variant='warning' className='ms-3 d-flex align-items-center'>
                                                {data.rating} <AiFillStar />
                                            </Button>
                                        </div>
                                        <Card.Text className='d-flex justify-content-between w-50 m-auto'>
                                            <div>{data.category}</div>
                                            <div className='d-flex align-items-center'>
                                                <div>{data.discountPercentage}</div>
                                                <div>
                                                    <MdDiscount />
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className='text-muted text-center'>
                                        <Link to={`/products/${data.id}`}>
                                            <Button variant='secondary'>Show More</Button>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <div className='d-flex justify-content-center'>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth='5px'
                            animationDuration='0.75s'
                            width='96px'
                            visible={true}
                        />
                    </div>
                )}
            </div>
            <PageNav />
        </div>
    );
};
