import React from 'react'
import { Link } from 'react-router-dom'
import { setPageName } from '../redux/pageNameSlice';
import { useDispatch } from 'react-redux';

function About(props) {
  const dispatch = useDispatch();
  const pageName = "About";
  return (
    < div className="about">
      <h1>Aboutです</h1>
      <Link to="/products" onClick={() => dispatch(setPageName(pageName))}>Link to Products</Link>
      <br></br>
      <Link to="/" onClick={() => dispatch(setPageName(pageName))}>Link to Home</Link>
      <br></br>
    </ div>
  );
}
  
export default About;