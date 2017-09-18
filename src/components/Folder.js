import React from 'react';
import { getFolderColor } from '../helpers';
import './styles/Folder.scss';

const Folder = ({ folder, getSelectedFolder }) => {
  const { name, quizzes } = folder;
  const length = quizzes.length;
  const { bg, dark } = getFolderColor();
  const bgStyle = { backgroundColor: bg };
  const topStyle = { borderBottom: `40px solid ${bg}` };
  const insideStyle = { backgroundColor: dark };

  return (
    <button style={bgStyle} onClick={() => getSelectedFolder(folder)} className="folder">
      <div style={topStyle} className="folder-top" />
      <div style={insideStyle} className="folder-inside" />
       <h2>{name}: {length}</h2>
    </button>
  );
};

export default Folder;
