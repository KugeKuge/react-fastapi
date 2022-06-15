import React from 'react'
import { Link } from 'react-router-dom'
import { setPageNameJson } from '../redux/pageNameSlice';
import { useDispatch } from 'react-redux';

function About(props) {
  const date1 = new Date();

  const dispatch = useDispatch();
  const pageName = JSON.stringify({name: "About", time: date1.toLocaleString()});

  return (
    < div className="about">
      <h1>Aboutです</h1>
      <Link to="/products" onClick={() => dispatch(setPageNameJson(pageName))}>Link to Products</Link>
      <br></br>
      <Link to="/" onClick={() => dispatch(setPageNameJson(pageName))}>Link to Home</Link>
      <br></br>
    </ div>
  );
}
  
export default About;