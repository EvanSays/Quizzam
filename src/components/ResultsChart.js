import React from 'react';
import Bar from './Bar';
import './styles/ResultsChart.scss';

const ResultsChart = ({ results }) => {
console.log(results);

  
  
  return (
    <section className="results-chart">
      <h2>Question Name</h2>
      <section className="bar-list">
        <Bar name={"one"} width={'30%'} />
        <Bar name={"two"} width={'10%'} />
        <Bar name={"three"} width={'50%'} />
        <Bar name={"four"} width={'100%'} />
      </section>
    </section>
  );
};

export default ResultsChart;
