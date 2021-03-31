/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import renderer from 'react-test-renderer';
import api from '../src/util/api';
import {
  REPO_DATA, PROFILE_DATA, FOLLOWER_DATA, FOLLOWING_DATA,
} from '../mockData';
import { parseRepo } from '../src/parser/RepositoryParser';
import { parseProfile } from '../src/parser/ProfileParser';
import { parseFollower, parseFollowing } from '../src/parser/FollowParser';
import ProfileView from '../src/views/ProfileView';
import RepoView from '../src/views/RepoView';
import FollowersView from '../src/views/FollowersView';
import FollowingView from '../src/views/FollowingView';

beforeEach(() => {
  fetch.resetMocks();
});

/**
 * test for repository view with mock api call
 */
test('returns result for Repository View', () => {
  fetch.mockResponseOnce(JSON.stringify([REPO_DATA]));
  const navigation = { navigate: jest.fn(), push: jest.fn() };
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/posts')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseRepo(onResponse.mock.calls[0][0][0]);
      const tree = renderer.create(<RepoView data={data} navigation={navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(onResponse.mock.calls[0][0][0]).toEqual({
        data: {
          user: {
            repositories: {
              nodes: [
                {
                  description: 'gig',
                  id: 'test',
                  name: 'TEST',
                  nameWithOwner: 'jmz',
                  owner: {
                    avatarUrl: 'www.gig.com',
                    id: '123',
                    login: 'test',
                  },
                },
              ],
              totalCount: 1,
            },
          },
        },
      });
    });
});

/**
 * test for repo error
 */
test('returns result for Repo Error View', () => {
  fetch.mockResponseOnce(() => Promise.reject(res.errorToRaise));
  const tree = renderer.create(<RepoView loading={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * test for repo loading
 */
test('returns result for Repo Loading View', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const tree = renderer.create(<RepoView loading={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});


/**
 * test profile view with mock data api
 */
test('returns result for Profile View', () => {
  fetch.mockResponseOnce(JSON.stringify([PROFILE_DATA]));
  const navigation = { navigate: jest.fn(), push: jest.fn() };
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/posts')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseProfile(onResponse.mock.calls[0][0][0]);
      const tree = renderer.create(<ProfileView data={data} navigation={navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(onResponse.mock.calls[0][0][0]).toEqual({
        data: {
          user: {
            avatarUrl: 'test',
            bio: 'test',
            createdAt: 'test',
            email: 'test',
            followers: {
              totalCount: 0,
            },
            following: {
              totalCount: 0,
            },
            login: 'test',
            name: 'test',
            repositories: {
              totalCount: 0,
            },
            websiteUrl: 'www.gig.com',
          },
        },
      });
    });
});

/**
 * test for profile error
 */
test('returns result for Repo Error View', () => {
  fetch.mockResponseOnce(() => Promise.reject(res.errorToRaise));
  const tree = renderer.create(<ProfileView loading={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * test for profile loading
 */
test('returns result for Repo Loading View', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const tree = renderer.create(<ProfileView loading={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});



/**
 * test Following view with mock data api
 */
test('returns result for Following View', () => {
  fetch.mockResponseOnce(JSON.stringify([FOLLOWING_DATA]));
  const onResponse = jest.fn();
  const onError = jest.fn();
  const navigation = { navigate: jest.fn(), push: jest.fn() };

  return api('/posts')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseFollowing(onResponse.mock.calls[0][0][0]);
      const tree = renderer.create(<FollowingView data={data} navigation={navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(onResponse.mock.calls[0][0][0]).toEqual({
        data: {
          user: {
            following: {
              nodes: [
                {
                  avatarUrl: 'www.google.com',
                  login: 'Test',
                  name: 'Test',
                },
              ],
            },
          },
        },
      });
    });
});

/**
 * test for following error
 */
test('returns result for Following Error View', () => {
  fetch.mockResponseOnce(() => Promise.reject(res.errorToRaise));
  const tree = renderer.create(<FollowingView loading={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * test for following loading
 */
test('returns result for Following Loading View', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const tree = renderer.create(<FollowingView loading={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});



/**
 * test Follower view with mock data api
 */
test('returns result for Follower View', () => {
  fetch.mockResponseOnce(JSON.stringify([FOLLOWER_DATA]));
  const navigation = { navigate: jest.fn(), push: jest.fn() };
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/posts')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      const data = parseFollower(onResponse.mock.calls[0][0][0]);
      const tree = renderer.create(<FollowersView data={data} navigation={navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(onResponse.mock.calls[0][0][0]).toEqual({
        data: {
          user: {
            followers: {
              nodes: [
                {
                  avatarUrl: 'www.google.com',
                  login: 'Test',
                  name: 'Test',
                },
              ],
            },
          },
        },
      });
    });
});

/**
 * test for following error
 */
test('returns result for Follower Error View', () => {
  fetch.mockResponseOnce(() => Promise.reject(res.errorToRaise));
  const tree = renderer.create(<FollowersView loading={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * test for following loading
 */
test('returns result for Follower Loading View', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const tree = renderer.create(<FollowersView loading={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

