import axios from "axios";

const PictureConvertChinpoUI = () => {
    const url = "http://127.0.0.1:8000/chinpo";

    const onClick = (e) => {

      // const params = new FormData(document.forms[0]); // FormDataで送る場合
      const src = document.getElementById('original-image').src;

      if (src !== "") {
        // params.append('originalImage', src); //FormDataで送る場合 

        axios.post(
            url,
            {
              base64_image_string: src // リクエストボディで送る場合 JSONで複数指定
            }//,
            //{headers: {'Content-Type': 'application/json'}} //うまくいかないときはヘッダを指定すれば良いケースもあるらしい
            // params //FormDataで送る場合 
            )
            .then(res => {
              const img = document.querySelector('#chinpo-image')
              // img.src = "data:image/jpg;base64," + res.data //画像単体で帰ってきたとき
              img.src = "data:image/jpg;base64," + res.data.base64_image_string // Jsonで帰ってきたとき

              img.onload = function() {
                const imagePreviewSize = 500;

                const wkWidth = img.naturalWidth;
                const wkHeight = img.naturalHeight;
                
                let magnification = 0

                if (wkWidth > wkHeight) {
                  magnification = imagePreviewSize / wkWidth;
                } else {
                  magnification = imagePreviewSize / wkHeight;
                }

                document.getElementById('chinpo-image').width = magnification * wkWidth
                document.getElementById('chinpo-image').height = magnification * wkHeight
              }
            }
        )
      }
    }
  
    return (
      <div>
        <button onClick={onClick}>ちんぽ</button>
        <br></br>
        <img id="chinpo-image" className="chinpo-image"/>
      </div>
    )
  }

export default PictureConvertChinpoUI;