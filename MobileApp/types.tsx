import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Profile: { userId: string | undefined };
  Repo: { userId: string | undefined };
  Follower: { userId: string | undefined };
  Following: { userId: string | undefined };
};

export type TabOneParamList = {
  ProfileScreen: { userId: string | undefined };
  RepoScreen: { userId: string | undefined };
  FollowerScreen: { userId: string | undefined };
  FollowingScreen: { userId: string | undefined };
};

export type TabTwoParamList = {
  RepoScreen: { userId: string | undefined };
  ProfileScreen: { userId: string | undefined };
  FollowerScreen: { userId: string | undefined };
  FollowingScreen: { userId: string | undefined };
};

export type TabThreeParamList = {
  ProfileScreen: { userId: string | undefined };
  RepoScreen: { userId: string | undefined };
  FollowerScreen: { userId: string | undefined };
  FollowingScreen: { userId: string | undefined };
};

export type TabFourParamList = {
  ProfileScreen: { userId: string | undefined };
  RepoScreen: { userId: string | undefined };
  FollowerScreen: { userId: string | undefined };
  FollowingScreen: { userId: string | undefined };
};

export type ProfileScreenNavigationProp = StackNavigationProp<BottomTabParamList, 'Profile'>;

export type RepoScreenNavigationProp = StackNavigationProp<TabTwoParamList, 'RepoScreen'>;

export type FollowerScreenNavigationProp = StackNavigationProp<TabThreeParamList, 'FollowerScreen'>;

export type FollowingScreenNavigationProp = StackNavigationProp<TabFourParamList, 'FollowingScreen'>;

export type TabOneNavigationProp = StackNavigationProp<TabOneParamList, 'ProfileScreen'>;

export type ProfileScreenRouteProp = RouteProp<TabOneParamList, 'ProfileScreen'>;
