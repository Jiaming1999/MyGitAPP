import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { AllRepoData, RepoData } from '../parser/RepositoryParser';
import RemindingView from './RemindingView';
import { RepoScreenNavigationProp } from '../../types';

type Props = {
  data: AllRepoData | null;
  loading: Boolean | null;
  navigation: RepoScreenNavigationProp;
};

type HelperProps = {
  data: AllRepoData | null;
  navigation: RepoScreenNavigationProp;
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
    padding: 5,
    margin: 5,
  },
  text: {
    fontSize: 12,
  },
  description: {
    padding: 5,
    fontWeight: 'bold',
    paddingLeft: 0,
  },
  row: {
    flexDirection: 'row',
  },
});

const RepoInfo = (props: HelperProps) => {
  const { data, navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Repository:
        {data?.RepoCount}
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView>
        {data?.Repositories ? data?.Repositories.map((repo: RepoData) => (
          <View style={styles.card} key={repo.id}>
            <View style={styles.row}>
              <Avatar
                size="small"
                rounded
                containerStyle={{ margin: 5, marginTop: 10 }}
                title={repo?.ownerId}
                source={{ uri: repo?.ownerUrl }}
                onPress={() => { navigation.push('ProfileScreen', { userId: repo?.login }); }}
              />
              {repo?.name ? (
                <Text style={styles.title}>
                  {
                    repo?.name
                  }
                </Text>
              )
                : <Text style={styles.title}>Repo Without Name</Text>}
            </View>
            <Text style={styles.text}>
              From
              {' '}
              {repo?.nameWithOwner}
            </Text>
            <Text style={styles.description}>Discription</Text>
            {repo?.description ? <Text>{repo?.description}</Text> : <Text> No description</Text>}
          </View>
        )) : <Text>No Repository</Text>}
      </ScrollView>
    </View>
  );
};

/**
 * Repo inforamtion display component
 * @param props data and navigator
 * @returns repo view screen
 */
const RepoView = (props: Props) => {
  const {
    data, loading, navigation,
  } = props;

  if (loading === true) {
    return (
      <RemindingView>
        Loading...
      </RemindingView>
    );
  } if (loading === null) {
    return (
      <RemindingView>
        Error
      </RemindingView>
    );
  }
  return (
    <RepoInfo data={data} navigation={navigation} />
  );
};

export default RepoView;
