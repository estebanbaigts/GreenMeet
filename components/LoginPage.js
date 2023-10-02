import React, { useState, useEffect, useContext } from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import loginData from './users.json'
import { UserContext } from './MainPage/UserContext';

export default function Accueil() {
  const [username, onUserNameChangeText] = React.useState(loginData.username);
  const [password, onPasswordChangeText] = React.useState(loginData.password);
  const navigation = useNavigation();
  const { setCurrentUser } = useContext(UserContext);

  const handleConnexion = () => {

    const user = loginData.users.find(user => user.username === username && user.password === password);
    if (user) {
      console.log('Connexion réussie!');
      setCurrentUser(user.username);
      navigation.navigate('Main');
    } else {
      console.log('Identifiant ou mot de passe incorrect');
      Alert.alert('Erreur', 'Identifiant ou mot de passe incorrect');

    }
  };


  return (
    <View style={styles.accueil}>
      <ImageBackground
        style={styles.back_acceuil}
        source={require('../assets/background.png')}
      />
      <ImageBackground
        style={styles.logo}
        source={require('../assets/image34.png')}
      />
      <View style={styles.container}>
        <Text style={[styles.customFontText]}>
          {`Bienvenue sur GreenMeet`}
        </Text>
      </View>
      <View style={styles.group5}>
        <View style={styles.rectangle68} />
        <TextInput
          style={styles.textInput}
          placeholder="Saisissez votre identifiant"
          onChangeText={text => onUserNameChangeText(text)}
          value={username}
        />
      </View>
      <View style={styles.group6}>
        <View style={styles.rectangle67} />
        <TextInput
          style={styles.textInput}
          placeholder="Saisissez votre mot de passe"
          secureTextEntry={true} // Pour masquer le texte du mot de passe
          onChangeText={text => onPasswordChangeText(text)}
          value={password}
        />
      </View>
      {/* Bouton Connexion */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleConnexion}
      >
        <View style={styles.border} />
        <Text style={styles.buttonText}>
          {`Connexion`}
        </Text>
      </TouchableOpacity>
      {/* Bouton Créer un compte */}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate('Signup');
        }}
      >
        <View style={styles.border2} />
        <Text style={styles.buttonText2}>
          {`Me créer un compte`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  accueil: {
    flexShrink: 0,
    height: 844,
    width: 390,
    backgroundColor: "rgba(198, 195, 195, 1)",
    alignItems: "flex-start",
    rowGap: 0
  },
  customFontText: { // Utilisez le nom que vous avez spécifié lors du chargement de la police
    fontSize: 25, // Ajoutez d'autres styles selon vos besoins
    color: 'white',
  },
  container: {
    position: "absolute",
    flexShrink: 0,
    top: 100,
    right: 70,
    fontSize: 600,
  },
  back_acceuil: {
    position: "absolute",
    flexShrink: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: 850,
  },
  logo: {
    position: "absolute",
    flexShrink: 0,
    top: 722,
    right: 129,
    bottom: 12,
    left: 138
  },
  title: {
    position: "absolute",
    flexShrink: 0,
    top: 82,
    right: 0,
    left: 0,
    height: 40,
    textAlign: "center",
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.10867942869663239
  },
  group5: {
    position: "absolute",
    flexShrink: 0,
    top: 280,
    height: 44,
    left: 33,
    width: 332,
  },
  group6: {
    position: "absolute",
    flexShrink: 0,
    top: 387,
    height: 44,
    left: 32,
    width: 334
  },
  subtitle: {
    position: "absolute",
    flexShrink: 0,
    top: 14,
    left: 120,
    width: 87,
    height: 17,
    textAlign: "center",
    color: "rgba(123, 123, 123, 1)",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.10867942869663239
  },
  textInput: {
    flexShrink: 0,
    width: 330,
    height: 50,
    marginVertical: -10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
  },
  identifiantLabel: {
    // Styles du label Identifiant
  },
  // Styles pour le bouton Connexion
  button: {
    height: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(87, 128, 250, 1)",
    borderRadius: 10,
    top: 500,
    left: 135,
    width: 100,
    height: 17,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.10867942869663239,
  },
  // Styles pour le bouton Créer un compte
  buttonText2: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.10867942869663239,
    top: 530,
    left: 85,
    width: 200,
    height: 17,
  },
  border: {
    position: "absolute",
    flexShrink: 0,
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: "rgba(87, 128, 250, 1)",
    borderRadius: 10
  },
  _title: {
    position: "absolute",
    flexShrink: 0,
    top: 17,
    right: 16,
    left: 15,
    height: 16,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.10867942869663239
  },
  __title: {
    position: "absolute",
    flexShrink: 0,
    top: 600,
    right: 115,
    left: 115,
    height: 16,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.10867942869663239
  }
})
