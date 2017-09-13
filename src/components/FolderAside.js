import React, { Component } from 'react';
import { func, array, object } from 'prop-types';
import { Link } from 'react-router-dom';
import CreateFolder from './CreateFolder';
import Folder from './Folder';
import { getKey } from '../helpers';
import './styles/FolderAside.scss';

class FolderAside extends Component {
  constructor() {
    super();
    this.state = {
      folders: [],
    };

    this.displayQuizzes = this.displayQuizzes.bind(this);
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
  }

  displayQuizzes({ name, quizzes }) {
    const { history, getQuizzes } = this.props;

    getQuizzes(quizzes);
    history.push(`/dashboard/folder/${name}`);
  }

  postFolder(folder) {
    const { createFolder, user } = this.props;
    const body = Object.assign(folder, { id: user.id });

    createFolder(body);
  }

  render() {
    const { folders } = this.state;

    const foldersArray = folders.map((folder) => {
      return <Folder key={getKey()} folder={folder} displayQuizzes={this.displayQuizzes} />;
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
  fetchFolders: func,
  folders: array,
  getQuizzes: func,
  history: object,
  createFolder: func,
};

export default FolderAside;
