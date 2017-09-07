import React, { Component } from 'react';

class CreateQuiz extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
      <div>
        <section>
          <h1>CreateQuiz</h1>
          <div>
            <h3>Folder 1</h3>
            <h3>Folder 2</h3>
            <h3>Folder 3</h3>
          </div>
          <button>Submit</button>
        </section>
        <form action="">
          <input type="text" value="question" />
          <input type="text" value="answer" />
          <button>Add</button>
        </form>

      </div>
    );
  }
}

export default CreateQuiz;
