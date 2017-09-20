import React from 'react';
import { object } from 'prop-types';
import { getWidths } from '../helpers';
import Bar from './Bar';
import { object } from 'prop-types';
import './styles/ResultsChart.scss';

const ResultsChart = ({ selectedQuestion, users }) => {
  if (!selectedQuestion.id) {
    return <div />;
  }

  const { id, answers, question_text: questionText } = selectedQuestion;
  const total = Object.values(users).filter(obj => `${id}` in obj).length;
  const results = Object.values(users).reduce((arr, user) => {
    arr.push(...Object.values(user));
    return arr;
  }, []);

  const widths = getWidths(results);
  const bars = answers.map((answer, i) => {
    const percentage = widths[answer.id] ? ((widths[answer.id] / total) * 100) : 0;
    const width = `${Math.round(percentage)}%`;

    return <Bar key={answer.id} name={answer.answer_text} width={width} index={i} />;
  });

  return (
    <section className="results-chart">
      <h2>{questionText}</h2>
      <section className="bar-list">
        {bars}
      </section>
    </section>
  );
};

ResultsChart.defaultProps = {
  selectedQuestion: {},
  users: {},
};

ResultsChart.propTypes = {
  selectedQuestion: object,
  users: object,
};

export default ResultsChart;
