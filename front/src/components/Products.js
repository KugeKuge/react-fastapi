import React from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { setPageNameJson } from '../redux/pageNameSlice';
import { useDispatch } from 'react-redux';
import PictureUploadUI from './PictureUploadUI'
import PictureConvertChinpoUI from './PictureConvertChinpoUI'

function Products(props) {
	const [data, setData] = React.useState();

  const url = "http://127.0.0.1:8000";

	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};

  const date1 = new Date();

  const dispatch = useDispatch();
  const pageName = JSON.stringify({name: "Products", time: date1.toLocaleString()});

  return (
    < div className="products">
      <h1>Productです</h1>
      <Link to="/about" onClick={() => dispatch(setPageNameJson(pageName))}>Link to About</Link>
      <br></br>
      <Link to="/" onClick={() => dispatch(setPageNameJson(pageName))}>Link to Home</Link>
      <br></br>
      {data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
      <br></br>
      <PictureUploadUI/>
      <PictureConvertChinpoUI/>
    </ div>
  );
}
  
export default Products;