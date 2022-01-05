import React from "react";
import { Provider } from 'react-redux';
import store from '../common/store';

import FileUpload from '../FileUpload';
import FileOutput from '../FileOutput';

import './styles.scss';

const OcrApp = () => {

  const MODE = {
    UPLOAD: "UPLOAD",
    DISPLAY: "DISPLAY"
  };

  const [mode, setMode] =  React.useState(MODE.UPLOAD);

  return (
    <div className="ocr-app">
      <Provider store={store}>
        <h2 className="ocr-app-header">OCR Reader - Grupo G</h2>
        <div className="ocr-app-body">
          <FileUpload setMode={setMode}/>
          <FileOutput mode={mode}/>
        </div>
      </Provider>
    </div>
  )
};

export default OcrApp;
