import axios from "axios";

const PictureConvertChinpoUI = () => {
    const url = "http://127.0.0.1:8000/chinpo";

    const onClick = (e) => {

      const params = new FormData(document.forms[0]);
      const src = document.getElementById('original-image').src;

      if (src != "") {
        params.append('originalImage', src); 

        axios.post(
            url,
            params
            )
            .then(res => {
              const img = document.querySelector('#chinpo-image')
              img.src = "data:image/png;base64," + res.data
                
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