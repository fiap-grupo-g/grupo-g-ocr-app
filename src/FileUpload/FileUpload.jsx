import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import tempIcon from '../assets/temp-social-contract-icon.svg';
import closeIcon from '../assets/clear-field.svg';
import { acceptedFileExtensions, fileToBase64 } from "./utils";
import { fileExtensions, MAX_DOCUMENT_FILE_SIZE_IN_BYTES } from "./constants";
import { readCupom } from '../common/store/thunks/cupomFiscal';

import "./styles.scss";

const FileUpload = ({ setMode }) => {

  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const formRef = React.useRef();

  const [cupomFile, setCupomFile] = useState(null);
  const isFileSelected = Boolean(cupomFile);

  const clickFileInput = () => {
    if (!isFileSelected) {
      inputRef.current.click();
    }
  };

  const resetFile = () => {
    formRef.current.reset();
    setCupomFile(null);
    setMode("UPLOAD");
  };

  const handleInputChange = async event => {
    const file = event.target.files[0];
    const fileBase64 = await fileToBase64(file);

    if (fileBase64.size > MAX_DOCUMENT_FILE_SIZE_IN_BYTES) {
      return;
    }

    setMode("DISPLAY");
    setCupomFile(URL.createObjectURL(file));
    dispatch(readCupom({ base64File: fileBase64 }));
  };

  const renderCupomFile = () => {
    return (
      <div className="file-upload">
        <div className="file-upload-container">
          <img className="img-container" src={cupomFile}></img>
        </div>
        <div className="close-icon-container">
          <img className="close-icon" src={closeIcon} onClick={resetFile}></img>
        </div>
      </div> 
    )
  };

  const renderFileInput = () => {
    return (
      <div className='file-upload-component' onClick={clickFileInput}>
        <img src={tempIcon}></img>
        <div className="label-container">
          <a className="label">Envie o cupom fiscal</a>
          <a className="sublabel">Formato JPG, PNG ou PDF (máximo 1.5MB)</a>
        </div>
      </div>
    )
  };

  return (
    <div className="file-upload">
      <form className="file-upload-form" ref={formRef}>
        <input className='file-upload-input'
          name="file"
          type="file"
          ref={inputRef}
          disabled={isFileSelected}
          onChange={handleInputChange}
          {...acceptedFileExtensions(fileExtensions)}
        />
      </form>
      {isFileSelected ? renderCupomFile() : renderFileInput()}
    </div>
  )
};

export default FileUpload;
