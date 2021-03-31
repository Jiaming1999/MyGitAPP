import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { ProfileData } from '../parser/ProfileParser';
import { Text, View } from '../components/Themed';
import RemindingView from './RemindingView';
import { TabOneNavigationProp } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  Info: {
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  infotext: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 1,
  },
  name: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  repo: {
    alignItems: 'center',
  },
  display: {
    flexDirection: 'row',
  },
  bio: {
    padding: 5,
    margin: 5,
  },
  placeholdertext: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 1,
    color: '#eee',
  },
});

/**
 * The display block for Bio information
 * @param data
 * @returns
 */
const MyBio = (data: ProfileData | null) => (
  <View style={styles.bio}>
    {data?.bio ? (
      <Text style={styles.infotext}>
        About me:
        {' '}
        {data?.bio}
      </Text>
    ) : <Text style={styles.placeholdertext}>I dont have Bio</Text>}
  </View>
);

/**
 * The display block for Repositories and followers information
 * @param data profile data
 * @param navigation navigator
 * @returns repo stat information
 */
const RepoStat = (data: ProfileData | null,
  navigation: TabOneNavigationProp,
  userId: string | undefined) => (
  <View style={styles.repo}>
    {data?.repoCount ? (
      <Button title={`I have ${data?.repoCount} public repositories`} onPress={() => { navigation.push('RepoScreen', { userId }); }} />
    ) : <Text />}
    {data?.repoCount ? (
      <Button title={`Followed By: ${data?.followerCount}`} onPress={() => { navigation.push('FollowerScreen', { userId }); }} />
    ) : <Text />}
    {data?.repoCount ? (
      <Button title={`Following: ${data?.followingCount}`} onPress={() => { navigation.push('FollowingScreen', { userId }); }}>
        Following:
        {' '}
        {data?.followingCount}
      </Button>
    ) : <Text />}
    {data?.createdAt ? (
      <Text style={styles.infotext}>
        Founded since:
        {' '}
        {data?.createdAt}
      </Text>
    ) : <Text />}
  </View>
);

/**
 * Display block for personal information
 * @param data profile data
 * @returns display my own information
 */
const MyInfo = (data: ProfileData | null) => (
  <View style={styles.Info}>
    <Avatar
      size="large"
      rounded
      title={data?.name}
      source={{ uri: data?.avatarUrl }}
    />
    <View style={styles.name}>
      <View style={styles.display}>
        <Icon name="people" />
        <Text style={styles.infotext}>{data?.name}</Text>
      </View>
      <View style={styles.display}>
        <Icon name="people" />
        <Text style={styles.infotext}>{data?.websiteUrl}</Text>
      </View>
      <View style={styles.display}>
        <Icon name="email" />
        <Text style={styles.infotext}>{data?.email}</Text>
      </View>
    </View>
  </View>
);

/**
 * Screen 1 for Profile information view
 * @param data profile data
 * @param navigation navigator to other screen
 * @returns display component of profile screen
 */
const ProfileView = (props: {
  navigation: TabOneNavigationProp;
  data: ProfileData | null;
  loading: Boolean | null;
  userId: string | undefined;
}) => {
  const {
    data, loading, navigation, userId,
  } = props;
  if (loading === true) {
    return (
      <RemindingView>
        Loading...
      </RemindingView>
    );
  }
  return (
    <View style={styles.container}>
      {MyInfo(data)}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {MyBio(data)}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {RepoStat(data, navigation, userId)}
    </View>
  );
};

export default ProfileView;
