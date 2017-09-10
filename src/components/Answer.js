<<<<<<< HEAD
import React from 'react';
import { func, string } from 'prop-types';

const Answer = ({ id, onChange, value }) => {
  return (
<<<<<<< HEAD
    <form>
      <input
        id={id}
        onChange={onChange}
        type="text"
        value={value}
      />
    </form>
  );
};

Answer.defaultProps = {
  id: '',
  onChange: () => '',
  value: '',
};

Answer.propTypes = {
  id: string,
  onChange: func,
  value: string,
};

=======
    <input id={id} type="text" placeholder="Answer" />
  );
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
    };
  }
  render() {
    return (
      <div>
        <input
          id={this.props.id}
          type="text"
          placeholder="Answer"
          onBlur={this.props.handleChange}
          onChange={e => this.setState({ answer: e.target.value })}
          value={this.state.answer}
        />
      </div>
    );
  }
}

Answer.propTypes = {

>>>>>>> wip
};

>>>>>>> Add dynamically add answers.
export default Answer;
