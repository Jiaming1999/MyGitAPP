import { API_TOKEN } from '../../envs/env';

/**
 * Return interface containing information of repositories data
 */
export interface AllRepoData {
  RepoCount: number | undefined;
  Repositories: Array<RepoData> | undefined;
}

/**
 * Interface with single repo data
 */
export interface RepoData {
  id: string | undefined;
  name: string | undefined;
  nameWithOwner: string | undefined;
  ownerUrl: string | undefined;
  ownerId: string | undefined;
  description: string | undefined;
  login: string | undefined
}

interface RawData {
  data: {
    user: RawAllRepo
  }
}

interface RawAllRepo {
  repositories: {
    totalCount: number;
    nodes: Array<RawRepo>
  }
}

interface RawRepo {
  id: string | undefined;
  name: string | undefined;
  nameWithOwner: string | undefined;
  owner: {
    id: string | undefined;
    avatarUrl: string | undefined;
    login: string | undefined;
  }
  description: string | undefined;
}

const getBody = (username: string | undefined) => (
  {
    query: `
    {
      user(login: "${username}") {
        repositories(last: 100, orderBy: {field: CREATED_AT, direction: ASC}, privacy: PUBLIC) {
          totalCount
          nodes {
            id
            name
            nameWithOwner
            owner {
              id
              avatarUrl
              login
            }
            description
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
 * parse the repositories data to interface
 * @param json raw data get from api
 * @returns interface that contain repositories data
 */
export const parseRepo = (json: RawData): AllRepoData => {
  if (!json) {
    throw new Error('Fail to fetch');
  }
  const data: RawAllRepo = json.data.user;
  const repositories: Array<RepoData> = [];
  const repoCount: number = data.repositories.totalCount;
  for (let i = 0; i < repoCount; i += 1) {
    const repo: RawRepo = data.repositories.nodes[i];
    const singleRepoData: RepoData = {
      id: repo.id,
      name: repo.name,
      nameWithOwner: repo.nameWithOwner,
      ownerUrl: repo.owner.avatarUrl,
      ownerId: repo.owner.id,
      description: repo.description,
      login: repo.owner.login,
    };
    repositories.push(singleRepoData);
  }
  const allRepoData: AllRepoData = {
    RepoCount: repoCount,
    Repositories: repositories,
  };
  return allRepoData;
};

/**
 * fetching repositories list information from backend
 * return repo interface
 */
export const getRepository = async (userId: string | undefined): Promise<AllRepoData | null> => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify(getBody(userId)),
    });
    const json: RawData = await response.json();
    const allRepoData: AllRepoData = parseRepo(json);
    return allRepoData;
  } catch (error) {
    throw new Error(error);
  }
};
