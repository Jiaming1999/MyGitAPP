import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getFollow, FollowData } from '../parser/FollowParser';
import { View } from '../components/Themed';
import FollowingView from '../views/FollowingView';
import { FollowingScreenNavigationProp, ProfileScreenRouteProp } from '../../types';

type Props = {
  navigation: FollowingScreenNavigationProp,
  route: ProfileScreenRouteProp
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

/**
 * The screen display section for Followers
 * @returns
 */
const FollowingScreen = (props: Props) => {
  const [data, setData] = useState<FollowData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean | null>(true);
  const { route, navigation } = props;
  const { userId } = route.params;
  async function fetchProfile() {
    try {
      const repoData: FollowData | null = await (getFollow('following', userId));
      setData(repoData);
      setIsLoading(false);
      return repoData;
    } catch (error) {
      setIsLoading(null);
      return null;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchProfile();
  }, [userId]);

  return (
    <View style={styles.container}>
      <FollowingView data={data} loading={isLoading} navigation={navigation} />
    </View>
  );
};

export default FollowingScreen;
