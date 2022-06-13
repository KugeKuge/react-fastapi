import React from 'react'
import { Link } from 'react-router-dom'
import { setPageNameJson } from '../redux/pageNameSlice';
import { useDispatch } from 'react-redux';

function Home(props) {
  // Homeだけ、JSONで複数の引数を渡すテスト(setPageNameJson)
  const dispatch = useDispatch();
  const jsonTest = {name: 'Home', aaaaa: 20};
  const pageName = JSON.stringify(jsonTest);
  return (
    < div className="home">
      <h1>Homeです。</h1>
      <Link to="/products" onClick={() => dispatch(setPageNameJson(pageName))}>Link to Products</Link>
      <br></br>
      <Link to="/about" onClick={() => dispatch(setPageNameJson(pageName))}>Link to About</Link>
      <br></br>
    </ div>
  );
}
  
export default Home;