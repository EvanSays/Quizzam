import React from 'react';
import './styles/Folder.scss';

const Folder = ({ folder, displayQuizzes }) => {
  const { name, quizzes } = folder;
  const length = quizzes.length;

  return (
    <button onClick={() => displayQuizzes(folder)} className="folder">
      <h2>name: {name}</h2>
      <p>{length}</p>
    </button>
  );
};

export default Folder;
