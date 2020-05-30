import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import ImageIcon from '@material-ui/icons/ImageRounded';
import Button from '@material-ui/core/Button';

export const AppDrop = (props) => {
  const [image, setImage] = useState(null);

  const uploadImage = (files) => {
    // Assuming only image
    var file = files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage(reader.result);
      props.onChange(reader.result);
    };
  };

  const removeImage = () => {
    setImage(null);
    props.onChange(null);
  };

  return (
    <div style={!image ? props.dropStyle : props.imgStyle}>
      <FileDrop
        style={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onDrop={(files) => uploadImage(files)}>
        {!image ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'gray',
            }}>
            <ImageIcon style={{ fontSize: '30px', color: 'gray' }} />
            Drop your image here!
          </div>
        ) : (
          <div>
            <img style={props.imgStyle} src={image} />
            <Button
              onClick={() => removeImage()}
              style={{ float: 'right' }}
              color='primary'>
              Remove
            </Button>
          </div>
        )}
      </FileDrop>
    </div>
  );
};
