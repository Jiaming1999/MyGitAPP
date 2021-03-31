import { API_TOKEN } from '../../envs/env';

/**
 * returning profile interface containing profile data
 */
export interface ProfileData {
  avatarUrl: string | undefined;
  username: string | undefined;
  name: string | undefined;
  websiteUrl: string | undefined;
  email: string | undefined;
  bio: string | undefined;
  repoCount: number | undefined;
  followerCount: number | undefined;
  followingCount: number | undefined;
  createdAt: string | undefined;
}

interface RawData {
  data: {
    user: RawProfile
  }
}

interface RawProfile {
  avatarUrl: string | undefined;
  login: string | undefined;
  name: string | undefined;
  websiteUrl: string | undefined;
  email: string | undefined;
  bio: string | undefined;
  repositories: {
    totalCount: number,
  },
  followers: {
    totalCount: number
  },
  following: {
    totalCount: number
  },
  createdAt: string | undefined;
}

const getBody = (userName: string | undefined) => ({
  query: `
    {
      user(login: "${userName}") {
        avatarUrl
        name
        websiteUrl
        email
        bio
        login
        createdAt
        repositories(privacy: PUBLIC) {
          totalCount,
        }
        followers{
          totalCount
        }
        following{
          totalCount
        }
      }
    }
    `,
});

const URL: string = 'https://api.github.com/graphql';

const fetch = require('node-fetch');

const HEADER: Object = {
  ContentType: 'application/json',
  Authorization: `bearer ${API_TOKEN}`,
};

/**
 * helper function that takes in rawdata from api and transfer it to interface
 * @param json raw data get from api
 * @returns profile data contained profile information
 */
export const parseProfile = (json: RawData): ProfileData => {
  if (!json) {
    throw new Error('Fail to fetch');
  }
  const data: RawProfile = json.data.user;
  const retData: ProfileData = {
    avatarUrl: data.avatarUrl,
    name: data.name,
    username: data.login,
    websiteUrl: data.websiteUrl,
    email: data.email,
    bio: data.bio,
    repoCount: data.repositories.totalCount,
    followerCount: data.followers.totalCount,
    followingCount: data.following.totalCount,
    createdAt: data.createdAt,
  };
  return retData;
};

/**
 * fetching profile data from backend api
 * return interface used for other files
 *
 */
export const getProfileData = async (username: string | undefined): Promise<ProfileData | null> => {
  const BODY = getBody(username);
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify(BODY),
    });
    const json: RawData = await response.json();
    const retData: ProfileData = parseProfile(json);
    return retData;
  } catch (error) {
    throw new Error(error);
  }
};
