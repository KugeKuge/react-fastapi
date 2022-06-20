import React from 'react'
import { Link } from 'react-router-dom'
import { setPageNameJson } from '../redux/pageNameSlice';
import { useDispatch } from 'react-redux';

function Home(props) {
  // JSONで複数の引数を渡す(setPageNameJson)
  const date1 = new Date();
  const dispatch = useDispatch();
  const pageName = JSON.stringify({name: "Home", time: date1.toLocaleString()});

  return (
    < div className="home">
      <h1 className="text-3xl font-bold underline">Homeです。</h1>
      <Link to="/products" onClick={() => dispatch(setPageNameJson(pageName))}>Link to Products</Link>
      <br></br>
      <Link to="/about" onClick={() => dispatch(setPageNameJson(pageName))}>Link to About</Link>
      <br></br>
    </ div>
  );
}
  
export default Home;