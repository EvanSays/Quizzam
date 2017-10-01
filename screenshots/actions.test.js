import fetchMock from 'fetch-mock';
import * as constants from '../constants';
import * as actions from '../actions';

describe('Action Creators', () => {
  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  const mockDispatch = result => action => result.push(action);
  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

  describe('Folders', () => {
    it('(getFolders) should return action with correct type and payload', () => {
      const folders = ['hello'];
      const expected = { type: constants.GET_FOLDERS, folders };

      expect(actions.getFolders(folders)).toEqual(expected);
    });

    it('(foldersLoading) should return action with correct type and payload', () => {
      const bool = true;
      const expected = { type: constants.FOLDERS_LOADING, bool };

      expect(actions.foldersLoading(bool)).toEqual(expected);
    });

    it('(foldersFail) should return action with correct type and payload', () => {
      const bool = true;
      const expected = { type: constants.FOLDERS_FAIL, bool };

      expect(actions.foldersFail(bool)).toEqual(expected);
    });

    it('(fetchFolders) should fetch folders when function is triggerd', async () => {
      const folders = [{ folderSample: 'Pop Quiz' }];
      fetchMock.get('api/v1/users/1/folders', { status: 200, body: folders });
      const result = [];
      const dispatch = mockDispatch(result);
      const getFolders = actions.fetchFolders(1);
      const expected = { type: constants.GET_FOLDERS, folders };

      getFolders(dispatch);
      await resolveAfter2Seconds();

      expect(result[2]).toEqual(expected);
      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual('api/v1/users/1/folders');
    });

    it('(selectFolder) should return action with correct type and payload', () => {
      const folder = { folderSample: 'Pop Quiz' };
      const expected = { type: constants.SELECT_FOLDER, folder };

      expect(actions.selectFolder(folder)).toEqual(expected);
    });

    it('(addFolder) should return action with correct type and payload', () => {
      const data = { name: 'Pop Quiz' };
      const folder = Object.assign(data, { quizzes: [] });
      const expected = { type: constants.NEW_FOLDER, folder };

      expect(actions.addFolder(data)).toEqual(expected);
    });

    it('(createFolder) should create folder when function is triggerd', async () => {
      const name = 'Pop Quiz';
      fetchMock.post('api/v1/users/1/folders', { status: 200, body: { name } });
      const dispatch = mockDispatch([]);
      const createFolder = actions.createFolder({ name, id: 1 });

      createFolder(dispatch);
      await resolveAfter2Seconds();

      expect(fetchMock.called()).toEqual(true);
      expect(fetchMock.lastUrl()).toEqual('api/v1/users/1/folders');
      expect(fetchMock.lastOptions()).toEqual({
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });
});
