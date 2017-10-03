import React from 'react';
import PropTypes from 'prop-types';
import './styles/ProgressChart.scss';

const ProgressChart = ({ total }) => {
  const strokeDashoffset = 376.99 * ((100 - total) / 100);
  const style = { strokeDasharray: 376.99, strokeDashoffset };

  return (
    <section className="progress-chart">
      <span className="progress-label">{total}%</span>
      <svg id="progress" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle r="60" cx="100" cy="100" fill="transparent" />
        <circle style={style} id="bar" r="60" cx="100" cy="100" fill="transparent" />
      </svg>
    </section>
  );
};

ProgressChart.propTypes = {
  total: PropTypes.number,
};

export default ProgressChart;
