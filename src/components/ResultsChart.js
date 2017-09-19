import React from 'react';
import Bar from './Bar';
import './styles/ResultsChart.scss';

const ResultsChart = ({ selectedQuestion, users }) => {


  if (!selectedQuestion.id) {
    return (
      <section className="results-chart">
        <h2>Question Name</h2>
        <section className="bar-list">
        </section>
      </section>
    );
  }

  const { id, answers } = selectedQuestion;
  const total = Object.values(users).filter(obj => obj.hasOwnProperty(`${id}`)).length;
  const results = Object.values(users).reduce((arr, user) => {
    arr.push(...Object.values(user));
    return arr;
  }, []);

  const widths = results.reduce((obj, result) => {
    if (!obj[result]) {
      obj[result] = 0;
    }
    obj[result] += 1;

    return obj;
  }, {});

  // console.log(i);
  

  const bars = answers.map((answer) => {
    // const width = widths
    console.log(answer);
    
    return <Bar key={answer.id} name={answer.answer_text} width={'20%'} />
  });

  return (
    <section className="results-chart">
      <h2>Question Name</h2>
      <section className="bar-list">
        {bars}
      </section>
    </section>
  );
};

export default ResultsChart;
