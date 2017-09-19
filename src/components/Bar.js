import React from 'react';
import './styles/Bar.scss';

const Bar = ({ name, width }) => {
  const style = { width };
  const result = width === '0%' ? '' : width;

  return (
    <article className="bar">
      <h3 className="bar-label">{name}</h3>
      <div className="bar-wrapper">
        <div style={style} className="bar-color" />
        <p className="bar-result">{result}</p>
      </div>
    </article>
  );
};

export default Bar;
