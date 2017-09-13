import React from 'react';
import './styles/Folder.scss';

const Folder = ({ folder, getSelectedFolder }) => {
  const { name, quizzes } = folder;
  const length = quizzes.length;

  return (
    <button onClick={() => getSelectedFolder(folder)} className="folder">
      <h2>name: {name}</h2>
      <p>{length}</p>
    </button>
  );
};

export default Folder;
