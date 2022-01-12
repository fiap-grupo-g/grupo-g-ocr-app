import React, { useState } from "react";
import { useSelector } from 'react-redux';

import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';
import VMasker from "vanilla-masker";

import { MASKS } from "./constants";
import imageIcon from '../assets/image.svg';
import textIcon from '../assets/text.svg';

import './styles.scss';

const FileOutput = ({ mode }) => {

  const DISPLAY_MODE = {
    TEXT: "TEXT",
    IMAGE: "IMAGE"
  };

  const { cupomFiscal, isLoading, error } = useSelector((store) => store.cupomFiscal);

  const [cupomDisplayMode, setCupomDisplayMode] = useState(DISPLAY_MODE.TEXT);
  const [cupomDisplayImage, setCupomDisplayImage] = useState(null);

  React.useEffect(() => {
    if (!cupomFiscal || !cupomFiscal.documentProcessed) return;
    const { documentProcessed } = cupomFiscal;

    setCupomDisplayImage(documentProcessed.base64File);
  }, [cupomFiscal]);

  const shouldDisplayCupomFiscal = () => {
    return Boolean(cupomFiscal && mode === "DISPLAY");
  };

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <FadingBalls color="#0097e6"/>
        <div className="loader-label">Extraindo informações...</div>
      </div>
    )
  };

  const renderValue = (label, value, valueLabel = "") => {
    return value && (
      <div className="cupom-value-container">
        <div className="cupom-value-label">{label}</div>
        <div className="cupom-value-value">{valueLabel + value}</div>
      </div>
    )
  };

  const renderProduct = (label, value) => {
    return value && (
      <div className="cupom-value-products-container">
        <div className="cupom-value-products-label">{label}</div>
        <div className="cupom-value-products-value">{value}</div>
      </div>
    )
  };

  const renderProducts = (products) => {
    return products && (
      <div>
        <div class="line-separator"></div>
        {products.map(product => {
          return (
            <div className="cupom-value-products">
              {renderProduct("ITEM", product.itemN)}
              {renderProduct("CODIGO", product.codigo)}
              {renderProduct("DESC", product.descricao)}
              {renderProduct("QTD", product.quantidade)}
              {renderProduct("VALOR", product.valor)}
            </div>
          )
        })}
        <div class="line-separator"></div>
      </div>
    )
  };

  const renderError = () => {
    return (
      <div className="file-output-error">{error}</div>
    )
  };

  const renderCnpj = (label, value) => {
    return value && renderValue(label, VMasker.toPattern(value, MASKS.CNPJ));
  };

  const renderCpf = (label, value) => {
    return value && renderValue(label, VMasker.toPattern(value, MASKS.CPF));
  };

  const renderCupomImage = () => {
    return (
      <div className="cupom-image-container">
        <img className="cupom-image" src={'data:image/png;base64,' + cupomDisplayImage}></img>
      </div>
    )
  };

  const renderCupomFiscal = () => {
    return (
      <div>
        {error ? renderError() :
          <div className="file-output-container">
            {cupomDisplayMode === DISPLAY_MODE.IMAGE ? renderCupomImage() : ( <div>
              {renderCnpj("Estabelecimento:", cupomFiscal.cnpjEstabelecimento)}
              {renderCpf("Cliente:", cupomFiscal.documentoConsumidor)}
              {renderProducts(cupomFiscal.produtos)}
              {renderValue("Valor Total:", cupomFiscal.valorTotal, "R$ ")}
            </div>
            )}
          </div>
        }
      </div>
    )
  };

  const renderZeroState = () => {
    return (
      <div className="file-output-zerostate"/>
    )
  };
  
  return (
    <div className="file-output">
      {isLoading 
        ? renderLoader()
        : shouldDisplayCupomFiscal() 
            ? renderCupomFiscal() 
            : renderZeroState()}
      { shouldDisplayCupomFiscal() && (
        <div className="button-container">
          <img className="button-icon" src={imageIcon} onClick={() => setCupomDisplayMode(DISPLAY_MODE.IMAGE)}></img>
          <img className="button-icon" src={textIcon} onClick={() => setCupomDisplayMode(DISPLAY_MODE.TEXT)}></img>
        </div>
      )}
    </div>
  )
};

export default FileOutput;
