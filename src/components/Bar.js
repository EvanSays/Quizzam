import React from 'react';
import { string, number } from 'prop-types';
import './styles/Bar.scss';

const Bar = ({ name, width, index }) => {
  const style = { width };
  const result = width === '0%' ? '' : width;

  return (
    <article className="bar">
      <h3 className="bar-label">{`A${index + 1}`}</h3>
      <div className="bar-wrapper">
        <div style={style} className="bar-color" />
        <p className="bar-result">{result}</p>
      </div>
      <div className="bar-name">{name}</div>
    </article>
  );
};

Bar.defaultProps = {
  index: 0,
  name: {},
  width: {},
};

Bar.propTypes = {
  index: number,
  name: string,
  width: string,
};

export default Bar;
