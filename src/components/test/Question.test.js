import React from 'react';
import { shallow } from 'enzyme';
import { Question } from '../Question';

describe.skip('QUESTION COMPONENT TEST', () => {
  const mockFn = jest.fn();
  const mockQuestion = {
    id: 1,
    question_text: 'What is your favorite color?',
    quiz_id: 1,
    subject: 'Jquery',
    question_type: 'multiple choice',
    difficulty: 1,
    created_at: '2017-09-11T18:48:41.729Z',
    updated_at: '2017-09-11T18:48:41.729Z',
    answers: [{
      id: 3,
      answer_text: 'Blue',
      question_id: 1,
    },
    {
      id: 4,
      answer_text: 'Red',
      question_id: 1,
    },
    {
      id: 5,
      answer_text: 'Yellow',
      question_id: 1,
    },
    {
      id: 6,
      answer_text: 'Chartreuse',
      question_id: 1,
    }],
  };

  const wrapper = shallow(<Question
    questionText={mockQuestion.question_text}
    history={[]}
    handleUpdateQuestion={mockFn()}
    handleRadioClick={mockFn()}
    answers={mockQuestion.answers}
    handleAddAnswer={mockFn()}
    handleUpdateAnswer={mockFn()}
    questionId={1}
  />);

  it('should render the current question', () => {
    const question = wrapper.find('input');

    expect(question.text()).toEqual('What is your favorite color?');
    expect(question.length).toEqual(1);
  });

  it('should have button that calls a function', () => {
    const button = wrapper.find('button');

    button.simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should have button that calls a function', () => {
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'I love testing FE' } });
    expect(mockFn).toHaveBeenCalled();
  });
});
