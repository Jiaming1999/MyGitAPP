import { parseRepo } from "../src/parser/RepositoryParser";
import { parseProfile } from '../src/parser/ProfileParser';
import { REPO_DATA, PROFILE_DATA } from '../mockData';

/**
 * test for correct repositories fetching
 */
test('correct repo parsing', () => {
  expect(parseRepo(REPO_DATA)).toStrictEqual(
    {
      "RepoCount": 1,
      "Repositories":
        [
          {
            "id": 'test',
            "description": "gig",
            "name": "TEST",
            "nameWithOwner": "jmz",
            "ownerId": "123",
            "ownerUrl": "www.gig.com",
            "login": "test"
          }
        ]
    }
  );
});

/**
 * Test for correct profile data parsing
 */
test('correct profile parsing', () => {
  expect(parseProfile(PROFILE_DATA)).toStrictEqual(
    {
      "avatarUrl": "test",
      "bio": "test",
      "createdAt": "test",
      "email": "test",
      "followerCount": 0,
      "followingCount": 0,
      "name": "test",
      "repoCount": 0,
      "username": "test",
      "websiteUrl": "www.gig.com"
    }
  );
});

/**
 * Test for incorrect profile data parsing
 */
test('empty profile parsing', () => {
  expect(() => { parseProfile(null) }).toThrow("Fail to fetch");
});

/**
 * Test for incorrect repo data parsing
 */
test('empty repo parsing', () => {
  expect(() => { parseRepo(null) }).toThrow("Fail to fetch");
});

/**
 * Test for incorrect format profile data parsing
 */
test('empty profile parsing', () => {
  expect(() => { parseProfile("This is not a valid data form") }).toThrow("Cannot read property 'user' of undefined");
});

/**
 * invalid object data formating for profile parsing
 */
test('empty profile parsing', () => {
  expect(() => {
    parseProfile({
      "data": {
        "user": {
          "Myname": "no",
        }
      }
    })
  }).toThrow("Cannot read property 'totalCount' of undefined");
});