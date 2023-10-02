import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, Image } from 'react-native';
import data from './users.json';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = () => {
    const userExists = data.users.some(user => user.username === username);
    if (userExists) {
      Alert.alert('Erreur', 'Ce nom d\'utilisateur existe déjà.');
      return;
    }

    data.users.push({ username, password });

    Alert.alert('Succès', 'Inscription réussie!');
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>GreenMeet</Text>
      <Text style={styles.inscriptionText}>Inscription</Text>
      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <TextInput
            placeholder='Nom'
            style={[styles.input, { flex: 1, margin: 2}]}
          />
          <TextInput
            placeholder='Prénom'
            style={[styles.input, { flex: 1, margin: 2}]}
          />
        </View>
        <View style={styles.textInputs}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Identifiant"
            style={styles.input}
          />
          <TextInput
            placeholder='Date de naissance'
            style={styles.input}
          />
          <TextInput
            placeholder='Adresse mail'
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.inscription}>
          <Button title="S'inscrire" onPress={registerUser} color="#5780FA" />
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/image34.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'Mulish',
    marginTop: '15%',
    bottom: "-3%",
  },
  inscriptionText: {
    fontSize: 20,
    fontWeight: 'Mulish',
    marginTop: '15%',
  },
  inscription: {
    top: "5%",
    fontWeight: 'Mulish',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textInputs: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  logo: {
    width: 200,
    height: 200,
    top: 50,
  },
});

export default RegisterScreen;
