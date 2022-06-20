import React from 'react'
import axios from "axios";

const RecentChinpoTweetUI = () => {
  const url = "http://127.0.0.1:8000/getRecentChinpo";

	//const [data, setData] = React.useState();

	const GetData = () => {
		axios.get(url).then((res) => {
			const ret = res.data;
      for (let i = 0; i < ret.length; i++) {
          const li = document.createElement('li');
          const innerUl = document.createElement('innerUl');
          const innerLiUser = document.createElement('innerLiUser');
          const innerLiText = document.createElement('innerLiText');

          innerLiUser.textContent = (ret[i].user_name + "(@" + ret[i].user_id + ") ");
          innerLiUser.style.fontWeight = "bold";
          innerLiUser.style.textDecoration = "underline";

          innerLiText.textContent = ret[i].text + "  " + ret[i].created_at;

          innerUl.appendChild(innerLiUser);
          innerUl.appendChild(innerLiText);

          innerUl.style.display = "inline";

          li.appendChild(innerUl);

          document.getElementById('chinpoTweetList').appendChild(li);

//          li.textContent = ret[i].user_name + " (@" + ret[i].user_id + ") " + ret[i].text + "  " + ret[i].created_at;

          //document.getElementById('chinpoTweetList').appendChild(li);
      }
		});
	};
  
    return (
      < div className="products">
        <br></br>
        <button onClick={GetData}>最新ちんぽを取得</button>
        <br></br>
        <ul id="chinpoTweetList" className="content-list"></ul>
      </ div>
    );
  }

export default RecentChinpoTweetUI;