import React from 'react';
import PropTypes from 'prop-types';

const EditQuiz = ({ quizObj,
  onHandleUpdateQuestion,
  onHandleUpdateAnswer,
  onHandleSubmitEdit }) => {
  const questions = quizObj.questions.map((question, index) => {
    const quesId = question.id;
    return (
      <div key={quesId}>
        <input
          id={quesId}
          value={quizObj.questions[index].question_text}
          onChange={e => onHandleUpdateQuestion(e, quesId)}
        />
        {
          question.answers.map((answer, i) => {
            const ansId = answer.id;
            return (
              <div key={ansId}>
                <input
                  id={ansId}
                  name={answer.answer_text}
                  value={quizObj.questions[index].answers[i].answer_text}
                  onChange={e => onHandleUpdateAnswer(e, quesId, ansId)}
                />
              </div>
            );
          })
        }
      </div>
    );
  });

  return (
    <div>
      <h1>{quizObj.name}</h1>
      {questions}
      <button onClick={onHandleSubmitEdit}>submit changes</button>
    </div>
  );
};

EditQuiz.propTypes = {
  onHandleSubmitEdit: PropTypes.func,
  onHandleUpdateAnswer: PropTypes.func,
  onHandleUpdateQuestion: PropTypes.func,
  quizObj: PropTypes.object,
};

export default EditQuiz;
