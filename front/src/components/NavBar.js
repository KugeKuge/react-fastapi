import React from 'react'
import { useSelector } from 'react-redux';

function NavBar() {
  const pageName = useSelector(state => state.pageName.pageName)
  return (
    < div className="navbar">
      <h1>ようこそお越しくださいました。</h1>
      {pageName ? <div><h2>{pageName}から来ました。</h2></div> : <div></div>}
    </ div>
  );
}
  
export default NavBar;