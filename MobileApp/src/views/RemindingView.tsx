import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

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
});

/**
 * The Reminding View Component display loading and error message
 * @param props children: display content
 * @returns reminding component
 */
const RemindingView = (props: { children: string }) => {
  const { children } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {children}
      </Text>
    </View>
  );
};

export default RemindingView;
