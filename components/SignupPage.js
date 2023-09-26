import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <View>
        <TextInput
          placeholder='Nom'
          style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder='Prénom'
          style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
      </View>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Identifiant"
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder='Date de naissance'
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder='Adresse mail'
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="S'inscrire" onPress={registerUser} />
    </View>
  );
};

export default RegisterScreen;
