import { API_TOKEN } from '../../envs/env';

/**
 * returning profile interface containing profile data
 */
export interface FollowData {
  follow: Array<RawNode>;
}

interface RawData {
  data: {
    user: RawFollowData
  }
}

interface RawFollowData {
  followers: {
    nodes: Array<RawNode>
  };
  following: {
    nodes: Array<RawNode>
  };
}

interface RawNode {
  avatarUrl: string | undefined;
  name: string | undefined;
  login: string | undefined;
}

const getFollowerBody = (username: string | undefined) => (
  {
    query: `
    {
      user(login: "${username}") {
        followers(first: 100) {
          nodes {
            avatarUrl
            name
            login
          }
        }
      }
    }
    `,
  }
);

const getFollowingBody = (username: string | undefined) => (
  {
    query: `
    {
      user(login: "${username}") {
        following(first: 100) {
          nodes {
            avatarUrl
            name
            login
          }
        }
      }
    }
    `,
  }
);

const URL: string = 'https://api.github.com/graphql';

const fetch = require('node-fetch');

const HEADER: Object = {
  ContentType: 'application/json',
  Authorization: `bearer ${API_TOKEN}`,
};

/**
 * helper function that takes in rawdata from api and transfer it to interface
 * @param json raw data get from api
 * @returns followers data contained followers information
 */
export const parseFollower = (json: RawData): FollowData => {
  if (json === undefined) {
    throw new Error('Fail to fetch');
  }
  const data: RawFollowData = json.data.user;
  const allFollowers: Array<RawNode> = data.followers.nodes.map((follower: RawNode) => follower);
  const retData: FollowData = {
    follow: allFollowers,
  };
  return retData;
};

/**
 * helper function that takes in rawdata from api and transfer it to interface
 * @param json raw data get from api
 * @returns followings data contained followings information
 */
export const parseFollowing = (json: RawData): FollowData => {
  if (json === undefined) {
    throw new Error('Fail to fetch');
  }
  const data: RawFollowData = json.data.user;
  const allFollowers: Array<RawNode> = data.following.nodes.map((follower: RawNode) => follower);
  const retData: FollowData = {
    follow: allFollowers,
  };
  return retData;
};

/**
 * fetching followers data from backend api
 * return interface used for other files
 *
 */
export const getFollow = async (type: string, userId: string | undefined):
  Promise<FollowData | null> => {
  const BODY = type === 'following' ? getFollowingBody(userId) : getFollowerBody(userId);
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify(BODY),
    });
    const json: RawData = await response.json();
    const retData: FollowData = type === 'following' ? parseFollowing(json) : parseFollower(json);
    return retData;
  } catch (error) {
    throw new Error(error);
  }
};
