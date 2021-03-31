import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { FollowData } from '../parser/FollowParser';
import RemindingView from './RemindingView';
import { FollowerScreenNavigationProp } from '../../types';

type Props = {
  data: FollowData | null,
  loading: Boolean | null,
  navigation: FollowerScreenNavigationProp,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 5,
    padding: 5,
  },
  text: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
  },
});

const FollowerList = (props: {
  data: FollowData | null;
  navigation: FollowerScreenNavigationProp
}) => {
  const { data, navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Followers
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView>
        {data?.follow.map((follower) => (
          <View style={styles.card} key={follower.login}>
            <View style={styles.row}>
              <Avatar
                size="small"
                rounded
                containerStyle={{ margin: 5, marginTop: 10 }}
                title={follower?.name}
                source={{ uri: follower?.avatarUrl }}
                onPress={() => {
                  navigation.push('ProfileScreen', { userId: follower?.login });
                }}
              />
              {follower?.name ? (
                <Text style={styles.title}>
                  {
                    follower?.name
                  }
                </Text>
              )
                : <Text style={styles.title}>No Name</Text>}
            </View>
            <Text style={styles.text}>
              userId:
              {' '}
              {follower?.login}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

/**
 * The Reminding View Component display loading and error message
 * @param props children: display content
 * @returns reminding component
 */
const FollowerView = (props: Props) => {
  const { data, loading, navigation } = props;
  if (loading === true) {
    return (
      <View style={styles.container}>
        <RemindingView>
          Loading...
        </RemindingView>
      </View>
    );
  } if (loading === null) {
    return (
      <View style={styles.container}>
        <RemindingView>
          Having Error...
        </RemindingView>
      </View>
    );
  }
  return (
    <View>
      <FollowerList data={data} navigation={navigation} />
    </View>
  );
};

export default FollowerView;
