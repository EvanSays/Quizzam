import React from 'react';
import { mount, shallow } from 'enzyme';
import TakeQuiz from '../TakeQuiz';
import { MemoryRouter } from 'react-router-dom';

describe('TAKE QUIZ COMPONENT TEST', () => {
  const mockFn = jest.fn();
  const middlewares = [];
  const mockQuiz = {
    name: 'First Quiz',
    subject: 'Javascript',
    type: 'Pop Quiz',
    id: 'AAAA',
    quiz_id: 1,
    questions: [{
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
    }],
  };

  const wrapper = mount(<TakeQuiz username={'George'} quiz={mockQuiz} history={[]} handleClick={mockFn()} />);


  it('should hold state', () => {
    expect(wrapper.state().name).toBeTruthy();
    expect(wrapper.state().currentQuestion).toEqual(0);
    expect(wrapper.state().answers.length).toEqual(mockQuiz.questions.length);
  });

  it('name in state should be a name with a unique key', () => {
    const name = wrapper.state().name.split('_');

    expect(name.length).toEqual(2);
    expect(name[0]).toEqual('George');
  });

  it('should render the current question, and all its answers', () => {
    const inputs = wrapper.find('input');
    const labels = wrapper.find('label');
    const question = wrapper.find('.take-quiz-question-title');

    expect(question.text()).toEqual('What is your favorite color?');
    expect(inputs.length).toEqual(mockQuiz.questions[0].answers.length);
    expect(labels.at(0).text()).toEqual('Blue');
    expect(labels.at(1).text()).toEqual('Red');
    expect(labels.at(2).text()).toEqual('Yellow');
    expect(labels.at(3).text()).toEqual('Chartreuse');
  });

  it('buttons should call a function', () => {
    const button = wrapper.find('button');

    button.at(0).simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
