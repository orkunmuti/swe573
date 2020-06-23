import React, { useState, useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import ImageIcon from '@material-ui/icons/ImageRounded';
import Button from '@material-ui/core/Button';
import api from '../constants/api';

export const AppDrop = (props) => {
  let browseButton = useRef().current;
  const uploadImage = (files) => {
    // Assuming only image
    var file = files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      props.onChange(reader.result);
    };
  };

  const fileUpload = (fileInput) => {
    var reader = new FileReader();
    reader.readAsDataURL(fileInput[0]);

    reader.onload = function () {
      props.onChange(reader.result);
    };
  };

  const removeImage = () => {
    props.onChange(null);
  };

  return (
    <div
      style={!props.image && !props.image?.length > 0 ? props.dropStyle : null}>
      <FileDrop
        style={{
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onDrop={(files) => uploadImage(files)}>
        {!props.image && !props.image?.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'gray',
            }}>
            <ImageIcon style={{ fontSize: '30px', color: 'gray' }} />
            Drop your image here!
            <a
              style={{ cursor: 'pointer', color: '#0074D9' }}
              onClick={() => browseButton.click()}>
              or browse
              <input
                ref={(ref) => (browseButton = ref)}
                type='file'
                onChange={(e) => fileUpload(e.target.files)}
                accept='image/*'
                style={{ display: 'none' }}
              />
            </a>
          </div>
        ) : (
          <div>
            <div style={props.imgStyle}>
              <img
                src={
                  props.api === true ? api.images + props.image : props.image
                }
              />
            </div>

            <a
              onClick={() => removeImage()}
              style={{
                float: 'right',
                fontSize: '12px',
                color: '#800000',
                cursor: 'pointer',
              }}
              color='primary'>
              Remove
            </a>
          </div>
        )}
      </FileDrop>
    </div>
  );
};
