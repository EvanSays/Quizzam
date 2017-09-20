import fetchMock from 'fetch-mock';
import * as constants from '../constants';
import * as actions from '../actions';

describe('Folders', () => {
  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  const mockDispatch = result => action => result.push(action);
  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

  it('should return object with the correct type and folders', () => {
    const folders = ['hello'];
    const expected = { type: constants.GET_FOLDERS, folders };

    expect(actions.getFolders(folders)).toEqual(expected);
  });

  it('should return object with the correct type and loading boolean', () => {
    const bool = true;
    const expected = { type: constants.FOLDERS_LOADING, bool };

    expect(actions.foldersLoading(bool)).toEqual(expected);
  });

  it('should return object with the correct type and fail boolean', () => {
    const bool = true;
    const expected = { type: constants.FOLDERS_FAIL, bool };

    expect(actions.foldersFail(bool)).toEqual(expected);
  });

  it('should fetch folders when function is triggerd', async () => {
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
});
