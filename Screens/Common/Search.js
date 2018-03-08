import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 20,
    padding:5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
});

const Header = (props) => (
    
  <View style={styles.container}>
 
    <TextInput
      style={styles.input}
      placeholder="Search..."
      onChangeText={(text) => console.log('searching for ', props)}
    />
  </View>
);

export default Header;