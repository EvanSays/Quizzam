import React from 'react';
import Bar from './Bar';
import './styles/ResultsChart.scss';

const ResultsChart = ({ selectedQuestion, users }) => {
  if (!selectedQuestion.id) {
    return <div />;
  }

  const { id, answers, question_text } = selectedQuestion;
  const total = Object.values(users).filter(obj => obj.hasOwnProperty(`${id}`)).length;
  const results = Object.values(users).reduce((arr, user) => {
    arr.push(...Object.values(user));
    return arr;
  }, []);

  const widths = results.reduce((obj, result) => {
    const current = obj;

    if (!obj[result]) {
      current[result] = 0;
    }
    current[result] += 1;

    return current;
  }, {});

  const bars = answers.map((answer, i) => {
    const percentage = widths[answer.id] ? (widths[answer.id] / total * 100) : 0;
    const width = `${Math.round(percentage)}%`;

    return <Bar key={answer.id} name={answer.answer_text} width={width} index={i} />;
  });

  return (
    <section className="results-chart">
      <h2>{question_text}</h2>
      <section className="bar-list">
        {bars}
      </section>
    </section>
  );
};

export default ResultsChart;
