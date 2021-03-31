import * as React from 'react';
import { useEffect, useState } from 'react';
import { getRepository, AllRepoData } from '../parser/RepositoryParser';
import RepoView from '../views/RepoView';
import { ProfileScreenRouteProp, RepoScreenNavigationProp } from '../../types';

type Props = {
  route: ProfileScreenRouteProp,
  navigation: RepoScreenNavigationProp
};

/**
 * Display Screen for repository information list
 * @returns
 */
const RepoScreen = (props: Props) => {
  const [data, setData] = useState<AllRepoData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean | null>(true);
  const { route, navigation } = props;
  const { userId } = route.params;
  async function fetchProfile() {
    try {
      const repoData: AllRepoData | null = await getRepository(userId);
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
    <RepoView data={data} loading={isLoading} navigation={navigation} />
  );
};

export default RepoScreen;
