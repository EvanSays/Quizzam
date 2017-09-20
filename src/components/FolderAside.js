import React, { Component } from 'react';
import { func, array, object } from 'prop-types';
import CreateFolder from './CreateFolder';
import Folder from './Folder';
import { getKeyType } from '../helpers';
import './styles/FolderAside.scss';

class FolderAside extends Component {
  constructor() {
    super();
    this.state = {
      folders: [],
    };

    this.getSelectedFolder = this.getSelectedFolder.bind(this);
    this.postFolder = this.postFolder.bind(this);
  }

  componentDidMount() {
    const { fetchFolders, user } = this.props;

    fetchFolders(user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.folders.length !== this.props.folders.length) {
      this.setState({ folders: nextProps.folders });
    }

    if (nextProps.folders.quizzes.length !== this.props.folders.quizzes.length) {
      this.setState({ folders: nextProps.folders });
    }
  }

  getSelectedFolder(folder) {
    const { history, selectFolder } = this.props;

    selectFolder(folder);
    history.push('/folder');
  }

  postFolder(folder) {
    const { createFolder, user } = this.props;
    const body = Object.assign(folder, { id: user.id });

    createFolder(body);
  }

  render() {
    const { folders } = this.state;
    const foldersArray = folders.map((folder, i) => {
      return <Folder key={getKeyType(i, 'folder')} folder={folder} getSelectedFolder={this.getSelectedFolder} />;
    });

    return (
      <aside className="folder-aside">
        <CreateFolder postFolder={this.postFolder} />
        <section className="folders-wrapper">
          {foldersArray}
        </section>
      </aside>
    );
  }
}

FolderAside.propTypes = {
  createFolder: func,
  fetchFolders: func,
  folders: array,
  history: object,
  selectFolder: func,
  user: object,
};

export default FolderAside;
