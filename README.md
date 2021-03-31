# sp21-cs242-assignment3

## My Github CS242 assignment-3

For this project, I have written a Mobile App displaying my own github information.

## Used Technology:

Framework: React-Native with Typescript. The project is built with expo init tab template.

API: GraphQL api that supports me fetching my github information from github

## Features

### Profile Screen

Displaying my basic github account information. The information including my username, biography, avatar and number of following/follower/repositories. Clicking on them will navigate to corresponding detailed page

### Repository Screen

Displaying all my repositories information including owner, description of the repositories. Clicking on avatars will lead you to the owner's profile page. Also all displayed repositories are public. No private repositories shown.

### Following and Follower Screen

These two screens are similar. Showing information of my followers and people I am following currently. Clicking on avatar will navigate you to corresponding profile page.

## Test
### Unittests:

 ordinary unittests which test basic parsing functions

### Snapshot tests: 

snapshot tests with mock api calls and mock navigation