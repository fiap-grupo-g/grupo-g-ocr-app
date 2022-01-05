import React from "react";
import { useSelector } from 'react-redux';
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';

import './styles.scss';

const FileOutput = ({ mode }) => {

  const { cupomFiscal, isLoading } = useSelector((store) => store.cupomFiscal);

  const shouldDisplayCupomFiscal = () => {
    return Boolean(cupomFiscal && mode === "DISPLAY");
  }

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <FadingBalls color="#0097e6"/>
        <div className="loader-label">Extraindo informações...</div>
      </div>
    )
  }

  const renderValue = (label, value, valueLabel = "") => {
    return value && (
      <div className="cupom-value-container">
        <div className="cupom-value-label">{label}</div>
        <div className="cupom-value-label">{valueLabel + value}</div>
      </div>
    )
  }

  const renderProduct = (label, value) => {
    return value && (
      <div className="cupom-value-products-container">
        <div className="cupom-value-products-label">{label}</div>
        <div className="cupom-value-products-value">{value}</div>
      </div>
    )
  }

  const renderProducts = (products) => {
    return products && (
      <div>
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
      </div>
    )
  };

  const renderCupomFiscal = () => {
    return (
      <div className="file-output-container">
        {renderValue("Estabelecimento:", cupomFiscal.cnpjEstabelecimento)}
        {renderValue("Cliente:", cupomFiscal.documentoConsumidor)}
        {renderProducts(cupomFiscal.produtos)}
        {renderValue("Valor Total:", cupomFiscal.valorTotal, "R$ ")}
      </div>
    )
  };

  const renderZeroState = () => {
    return (
      <div className="file-output-zerostate">Selecione o cupom fiscal</div>
    )
  };
  
  return (
    <div className="file-output">
      {isLoading ? renderLoader()
       : shouldDisplayCupomFiscal() ? renderCupomFiscal() : renderZeroState()}
    </div>
  )
}

export default FileOutput;
