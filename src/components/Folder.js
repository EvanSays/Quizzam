import React from 'react';
import { func, object } from 'prop-types';
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

Folder.defaultProps = {
  folder: {},
  getSelectedFolder: func,
};

Folder.propTypes = {
  folder: object,
  getSelectedFolder: func,
};

export default Folder;
