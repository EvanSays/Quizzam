import React from 'react';
import PropTypes from 'prop-types';
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

Bar.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  width: PropTypes.string,
};

export default Bar;
