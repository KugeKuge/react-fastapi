import React, { useRef } from 'react';

const PictureUploadUI = () => {
    const userImg = useRef();
  
    const onChange = (e) => {
          const image = e.target.files[0];

          if (image) {
            userImg.current.title = image.name;

            const reader = new FileReader();        
            reader.onload = (event) => {
                userImg.current.setAttribute('src', event.target.result)

                const wkImage = new Image();
                wkImage.src = event.target.result;
                wkImage.onload = function() {
                  const imagePreviewSize = 500;

                  const wkWidth = wkImage.naturalWidth;
                  const wkHeight = wkImage.naturalHeight;

                  let magnification = 0

                  if (wkWidth > wkHeight) {
                    magnification = imagePreviewSize / wkWidth;
                  } else {
                    magnification = imagePreviewSize / wkHeight;
                  }

                  document.getElementById('original-image').width = magnification * wkWidth
                  document.getElementById('original-image').height = magnification * wkHeight
                }
            };
            reader.readAsDataURL(image);
          }
    }

    return (
      <div>
        <input type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={onChange} />
        <br></br>
        <img id="original-image" ref={userImg}/>
      </div>
    )
  }

export default PictureUploadUI;