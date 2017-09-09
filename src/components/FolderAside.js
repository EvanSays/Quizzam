import React from 'react';
import CreateFolder from './CreateFolder';
import Folder from './Folder';
import { getKey } from '../helpers';
import './styles/FolderAside.scss';

const FolderAside = ({ folders }) => {
  const foldersArray = folders.map((folder) => <Folder key={getKey()}  />);
  return (
    <aside className="folder-aside">
      <CreateFolder />
      <section className="folders-wrapper">
        
      </section>
    </aside>
  );
};

export default FolderAside;
