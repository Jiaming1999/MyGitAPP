import * as React from 'react';
import { useEffect, useState } from 'react';
import { getProfileData, ProfileData } from '../parser/ProfileParser';
import ProfileView from '../views/ProfileView';
import { TabOneNavigationProp, ProfileScreenRouteProp } from '../../types';

type Props = {
  navigation: TabOneNavigationProp;
  route: ProfileScreenRouteProp;
};

/**
 * Screen 1 for Profile information
 * @param props navigator
 * @returns
 */
const ProfileScreen = (
  props: Props,
) => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean | null>(null);
  const { navigation, route } = props;
  const { userId } = route.params;
  async function fetchProfile() {
    try {
      const profileData: ProfileData | null = await getProfileData(userId);
      setIsLoading(false);
      setData(profileData);
      return profileData;
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
    <ProfileView navigation={navigation} data={data} loading={isLoading} userId={userId} />
  );
};

export default ProfileScreen;
