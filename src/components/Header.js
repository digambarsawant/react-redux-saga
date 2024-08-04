import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { productSearch } from '../redux/productAction'
import React, { useState } from 'react';
import useDebounce from './useDebounce';

const Header = () => {
    const result = useSelector((state) => state.cartData);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Debounce the searchTerm with a 2000ms delay
    const debouncedSearchTerm = useDebounce(searchTerm, 2000);

    React.useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(productSearch(debouncedSearchTerm));
        }
    }, [debouncedSearchTerm, dispatch]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="header">
            <Link to="/"><h1 className='logo'>E-Commerce</h1></Link>
            <div className='search-box'>
                <input type="text" onChange={handleInputChange} placeholder='Search Product' />
            </div>
            <Link to="/cart">
                <div className="cart-div">
                    <span>{result.length}</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="" />
                </div></Link>
        </div>
    )
}

export default Header;