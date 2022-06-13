import { Link } from "react-router-dom";

function NotFound() {
  return (
    < div className="notfound">
      <h1>お探しのページは見つかりませんでした。</h1>
      <Link to="/">Link to Home</Link>
      <br></br>
    </ div>
  );

};

export default NotFound;