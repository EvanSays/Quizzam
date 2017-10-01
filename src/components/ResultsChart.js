import React from 'react';
import PropTypes from 'prop-types';
import { getWidths, getTotalSubmissions, getResults, getPercentage } from '../helpers';
import Bar from './Bar';
import ProgressChart from './ProgressChart';
import './styles/ResultsChart.scss';

const ResultsChart = ({ question, users }) => {
  if (!question.id) {
    return <div />;
  }

  const { id, answers, question_text: questionText } = question;
  const total = getTotalSubmissions(users, id);
  const results = getResults(users);
  const correct = getPercentage(results, total, answers);
  const widths = getWidths(results);
  const bars = answers.map((answer, i) => {
    const percentage = widths[answer.id] ? ((widths[answer.id] / total) * 100) : 0;
    const width = `${Math.round(percentage)}%`;

    return <Bar key={answer.id} name={answer.answer_text} width={width} index={i} />;
  });

  return (
    <section className="results-chart-wrapper">
      <section className="results-chart">
        <h2 className="results-title">{questionText}</h2>
        <section className="bar-list">
          {bars}
        </section>
      </section>
      <section className="progress-results">
        <h2>Percent Correct:</h2>
        <ProgressChart total={correct} />
        <h2>Total Responses: <span>{total}</span></h2>
      </section>
    </section>
  );
};

ResultsChart.propTypes = {
  question: PropTypes.object,
  users: PropTypes.object,
};

export default ResultsChart;
