import React from 'react';
import './styles/Folder.scss';

const Folder = ({ folder }) => {
  const { name, quizzes } = folder;
  const length = quizzes.length;

  return (
    <article className="folder">
      <h2>name: {name}</h2>
      <p>{length}</p>
    </article>
  );
};

export default Folder;
