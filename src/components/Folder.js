import React from 'react';
import PropTypes from 'prop-types';
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

Folder.propTypes = {
  folder: PropTypes.object,
  getSelectedFolder: PropTypes.func,
};

export default Folder;
