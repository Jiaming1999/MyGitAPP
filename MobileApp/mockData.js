export const REPO_DATA = {
  data: {
    user: {
      repositories: {
        totalCount: 1,
        nodes: [
          {
            id: 'test',
            name: 'TEST',
            nameWithOwner: 'jmz',
            owner: {
              id: '123',
              avatarUrl: 'www.gig.com',
              login: 'test',
            },
            description: 'gig',
          },
        ],
      },
    },
  },
};

export const PROFILE_DATA = {
  data: {
    user: {
      avatarUrl: 'test',
      name: 'test',
      websiteUrl: 'www.gig.com',
      email: 'test',
      bio: 'test',
      login: 'test',
      createdAt: 'test',
      repositories: {
        totalCount: 0,
      },
      followers: {
        totalCount: 0,
      },
      following: {
        totalCount: 0,
      },
    },
  },
};

export const FOLLOWING_DATA = {
  data: {
    user: {
      following: {
        nodes: [{
          avatarUrl: 'www.google.com',
          name: 'Test',
          login: 'Test',
        },
        ],
      },
    },
  },
};

export const FOLLOWER_DATA = {
  data: {
    user: {
      followers: {
        nodes: [{
          avatarUrl: 'www.google.com',
          name: 'Test',
          login: 'Test',
        },
        ],
      },
    },
  },
};
