import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accueil } from './Acceuil.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Accueil />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
