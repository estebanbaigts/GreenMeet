import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const navigation = useNavigation();

    const [extended, setExtended] = useState(false);
    const [accountExpanded, setAccountExpanded] = useState(false);

    const toggleExtension = () => {
        setExtended(!extended);
    };

    const onGestureEvent = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            if (nativeEvent.translationY < 0) {
                setExtended(true);
            } else {
                setExtended(false);
            }
        }
    };

    const onAccountArrowClick = () => {
        setAccountExpanded(!accountExpanded);
    };

    const arrowRotation = accountExpanded ? '90deg' : '0deg';
    const arrowIconStyle = {
        ...styles.arrowIcon,
        transform: [{ rotate: arrowRotation }],
    };

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Main');
                }}>
                    <Image source={require('../assets/back_arrow.png')} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.header}>REGLAGES</Text>
            </View>
            <View style={styles.bottomBar}>
                <TextInput
                    placeholder="Rechercher les paramètres..."
                    style={styles.searchBar}
                />
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={toggleExtension}
                    >
                    </TouchableOpacity>
                </PanGestureHandler>
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.accountContent}>
                    <Image source={require('../assets/account.png')} style={styles.accountIcon} />
                    <Text style={styles.accountText}>Compte</Text>
                </View>
                <TouchableOpacity onPress={onAccountArrowClick}>
                    <Image source={require('../assets/arrow.png')} style={arrowIconStyle} />
                </TouchableOpacity>
            </View>
            {accountExpanded && (
                <View style={styles.logoutContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Login');
                    }}>
                        <Text style={styles.logoutText}>Déconnexion</Text>
                    </TouchableOpacity>
                    <Text style={styles.profileText}>Mon Profil</Text>
                </View>
            )}
            <View style={styles.accountContainer}>
                <View style={styles.accountContent}>
                    <Image source={require('../assets/notif.png')} style={styles.accountIcon} />
                    <Text style={styles.accountText}>Notification</Text>
                </View>
                <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.accountContent}>
                    <Image source={require('../assets/security.png')} style={styles.accountIcon} />
                    <Text style={styles.accountText}>Sécurité</Text>
                </View>
                <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.accountContent}>
                    <Image source={require('../assets/confidentiality.png')} style={styles.accountIcon} />
                    <Text style={styles.accountText}>Confidentialité</Text>
                </View>
                <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.accountContent}>
                    <Image source={require('../assets/help.png')} style={styles.accountIcon} />
                    <Text style={styles.accountText}>Aide</Text>
                </View>
                <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.accountContent}>
                    <Image source={require('../assets/Disability.png')} style={styles.accountIcon} />
                    <Text style={styles.accountText}>Accessibilité</Text>
                </View>
                <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 844,
        width: 390,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        top: '20%',
    },
    header: {
        fontSize: 30,
        marginLeft: '17%',
    },
    back: {
        width: 25,
        height: 20,
        marginLeft: '5%',
    },
    bottomBar: {
        alignItems: 'center',
        top: '10%',
        paddingTop: 20,
    },
    searchBar: {
        width: '80%',
        height: 40,
        borderColor: '#9590AD',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: '2%',
        width: '90%',
        top: '30%',
        borderBottomWidth: "2%",
        left: 10,
        marginBottom: '5%',
        justifyContent: 'space-between'
    },
    accountContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountIcon: {
        height: 30,
        width: 30,
    },
    accountText: {
        marginLeft: 10,
        fontSize: 18,
    },
    arrowIcon: {
        marginLeft: 'auto',
        height: 20,
        width: 20,
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: '30%'
    },
    profileText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'white',
        backgroundColor: '#7CC62E',
        padding: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'white', // Couleur du texte de déconnexion
        backgroundColor: 'red', // Fond rouge
        padding: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
});
