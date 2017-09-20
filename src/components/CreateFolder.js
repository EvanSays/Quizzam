import React, { Component } from 'react';
import PropTypes from 'prop-types';
import add from '../assets/add.svg';
import './styles/CreateFolder.scss';

class CreateFolder extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    const name = event.target.value;

    this.setState({ name });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { postFolder } = this.props;
    const { name } = this.state;

    postFolder({ name });
    this.setState({ name: '' });
  }

  render() {
    const style = { backgroundImage: `url(${add})` };
    return (
      <form onSubmit={this.handleOnSubmit} className="create-folder">
        <button style={style} className="folder-submit" />
        <input
          className="folder-input"
          onChange={this.handleOnChange}
          type="text"
          value={this.state.name}
          placeholder="Create new folder"
        />
      </form>
    );
  }
}

CreateFolder.propTypes = {
  postFolder: PropTypes.func,
};

export default CreateFolder;
