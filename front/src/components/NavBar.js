import React from 'react'
import { useSelector } from 'react-redux';

function NavBar() {
  const pageName = useSelector(state => state.pageName.pageName)
  const openTime = useSelector(state => state.pageName.openTime)

  return (
    < div className="navbar">
      <h1>ようこそお越しくださいました。</h1>
      {pageName ? <div><h2>{pageName}から来ました。</h2></div> : <div></div>}
      {openTime ? <div><h2>{pageName}を開いたのは{openTime}でした。</h2></div> : <div></div>}
      
    </ div>
  );
}
  
export default NavBar;