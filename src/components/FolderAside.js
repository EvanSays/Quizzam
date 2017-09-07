import React from 'react';
import CreateFolder from './CreateFolder';
import './styles/FolderAside.scss';

const FolderAside = () => {
  const folders = [];
  return (
    <aside className="folder-aside">
      <CreateFolder />
      <section className="folders-wrapper">

      </section>
    </aside>
  );
};

export default FolderAside;
