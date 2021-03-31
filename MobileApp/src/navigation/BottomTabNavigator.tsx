import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import RepoScreen from '../screens/RepoScreen';
import FollowingScreen from '../screens/FollowingScreen';
import FollowerScreen from '../screens/FollowerScreen';
import { API_USERNAME } from '../../envs/env';
import {
  BottomTabParamList, TabOneParamList, TabThreeParamList, TabTwoParamList, TabFourParamList,
} from '../../types';

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ userId: API_USERNAME }}
        options={{ headerTitle: 'Profile' }}
      />
      <TabOneStack.Screen
        name="RepoScreen"
        component={RepoScreen}
        options={{ headerTitle: 'Repo' }}
      />
      <TabOneStack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{ headerTitle: 'Followers' }}
      />
      <TabOneStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ headerTitle: 'Following' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

/**
 * TabNavigator for Repository Screen
 */
function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="RepoScreen"
        initialParams={{ userId: API_USERNAME }}
        component={RepoScreen}
        options={{ headerTitle: 'Repo' }}
      />
      <TabTwoStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <TabTwoStack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{ headerTitle: 'Followers' }}
      />
      <TabTwoStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ headerTitle: 'Following' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

/**
 * TabNavigator for Followers Screen
 */
function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="FollowerScreen"
        initialParams={{ userId: API_USERNAME }}
        component={FollowerScreen}
        options={{ headerTitle: 'Followers' }}
      />
      <TabThreeStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ headerTitle: 'Following' }}
      />
      <TabThreeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <TabThreeStack.Screen
        name="RepoScreen"
        component={RepoScreen}
        options={{ headerTitle: 'Repo' }}
      />

    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

/**
 * TabNavigator for Followers Screen
 */
function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="FollowingScreen"
        initialParams={{ userId: API_USERNAME }}
        component={FollowingScreen}
        options={{ headerTitle: 'Following' }}
      />
      <TabFourStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <TabFourStack.Screen
        name="RepoScreen"
        component={RepoScreen}
        options={{ headerTitle: 'Repo' }}
      />
      <TabFourStack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{ headerTitle: 'Followers' }}
      />
    </TabFourStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Profile"
        component={TabOneNavigator}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => <TabBarIcon name="face-profile" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Repo"
        component={TabTwoNavigator}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => <TabBarIcon name="source-repository-multiple" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Follower"
        component={TabThreeNavigator}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => <TabBarIcon name="account-star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Following"
        component={TabFourNavigator}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => <TabBarIcon name="account-heart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
