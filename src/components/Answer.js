import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <input id={this.props.id} type="text"
          placeholder="Answer"
          onBlur={this.props.handleChange}
          onChange={(e) => this.setState({answer:e.target.value})}
          value={this.state.answer}/>
      </div>
    );
  }
}

Answer.propTypes = {

};

export default Answer;
