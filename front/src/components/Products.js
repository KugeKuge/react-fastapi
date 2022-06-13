import React from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { setPageName } from '../redux/pageNameSlice';
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

  const dispatch = useDispatch();
  const pageName = "Products";

  return (
    < div className="products">
      <h1>Productです</h1>
      <Link to="/about" onClick={() => dispatch(setPageName(pageName))}>Link to About</Link>
      <br></br>
      <Link to="/" onClick={() => dispatch(setPageName(pageName))}>Link to Home</Link>
      <br></br>
      {data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
      <br></br>
      <PictureUploadUI/>
      <PictureConvertChinpoUI/>
    </ div>
  );
}
  
export default Products;