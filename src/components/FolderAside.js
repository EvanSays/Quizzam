import React, { Component } from 'react';
import CreateFolder from './CreateFolder';
import Folder from './Folder';
import { getKey } from '../helpers';
import './styles/FolderAside.scss';

class FolderAside extends Component {
  componentDidMount() {
    const { fetchFolders } = this.props;

    fetchFolders(1);
  }

  render() {
    const { folders } = this.props;
    const foldersArray = folders.map(folder => <Folder key={getKey()} folder={folder} />);

    return (
      <aside className="folder-aside">
        <CreateFolder />
        <section className="folders-wrapper">
          {foldersArray}
        </section>
      </aside>
    );
  }
};

export default FolderAside;
