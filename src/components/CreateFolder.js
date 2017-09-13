import React, { Component } from 'react';

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
    return (
      <form onSubmit={this.handleOnSubmit} className="create-folder">
        <input
          className="input-folder"
          onChange={this.handleOnChange}
          type="text"
          value={this.state.name}
        />
        <button className="folder-submit">Submit</button>
      </form>
    );
  }
}

export default CreateFolder;
