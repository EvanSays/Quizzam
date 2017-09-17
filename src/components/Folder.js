import React from 'react';
import './styles/Folder.scss';

const Folder = ({ folder, getSelectedFolder }) => {
  const { name, quizzes } = folder;
  const length = quizzes.length;

  return (
    <button onClick={() => getSelectedFolder(folder)} className="folder">
      <div className="folder-top" />
      <div className="folder-inside" />
      <h2>{name}: {length}</h2>
    </button>
  );
};

export default Folder;
