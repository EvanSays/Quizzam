import React from 'react';
import CreateFolder from './CreateFolder';
import Folder from './Folder';
import './styles/FolderAside.scss';

const FolderAside = () => {
  const folders = [];
  return (
    <aside className="folder-aside">
      <CreateFolder />
      <section className="folders-wrapper">
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
      </section>
    </aside>
  );
};

export default FolderAside;
