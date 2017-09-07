import React, { Component } from 'react';
import FolderAside from './FolderAside';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <section className="App">
        <FolderAside />
        <h1 className="hello">hello</h1>
      </section>
    );
  }
}

export default App;
