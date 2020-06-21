import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import ImageIcon from '@material-ui/icons/ImageRounded';
import Button from '@material-ui/core/Button';

export const AppDrop = (props) => {
  const uploadImage = (files) => {
    // Assuming only image
    var file = files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      props.onChange(reader.result);
    };
  };

  const removeImage = () => {
    props.onChange(null);
  };

  return (
    <div style={!props.image ? props.dropStyle : props.imgStyle}>
      <FileDrop
        style={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onDrop={(files) => uploadImage(files)}>
        {!props.image ? (
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
            <img style={props.imgStyle} src={props.image} />
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