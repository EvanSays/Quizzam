import React, { Component } from 'react';

class CreateFolder extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  handleOnChange(event) {
    const name = event.target.value;

    this.setState({ name });
  }

  render() {
    return (
      <form className="create-folder">
        <input 
          onChange={this.handleOnChange}
          className="input-folder" 
          type="text" 
          value={this.state.name} 
        />
        <button className="folder-submit">Submit</button>
      </form>
    );
  }
}

export default CreateFolder;