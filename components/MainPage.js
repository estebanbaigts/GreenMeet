import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps'
import MapData from './jardins-partages.json'
import { UserContext } from './MainPage/UserContext';

export function Home() {
    const [extended, setExtended] = useState(false);
    const { currentUser } = useContext(UserContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnimation] = useState(new Animated.Value(-1 * Dimensions.get('window').width));

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

    const toggleMenu = () => {
        const toValue = menuVisible ? -1 * Dimensions.get('window').width : 0;
        Animated.timing(menuAnimation, {
            toValue: toValue,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setMenuVisible(!menuVisible);
        });
    };

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={() => {
                // Ajoutez ici l'action que vous souhaitez exécuter lors du clic
            }}>
                <Image source={require('../assets/Ellipse.png')} style={styles.ellipse} />
            </TouchableOpacity>
            <View style={styles.overlay}>
                <TouchableOpacity onPress={() => {
                    // Ajoutez ici l'action que vous souhaitez exécuter lors du clic
                    navigation.navigate('Settings');
                }}>
                    <Image source={require('../assets/Setting.png')} style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 48.8534,
                    longitude: 2.3488,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {MapData.map((jardin, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: jardin.geo_point_2d.lat,
                            longitude: jardin.geo_point_2d.lon
                        }}
                        title={jardin.nom_ev}
                        description={jardin.adresse}
                    />
                ))}
            </MapView>
            {menuVisible && (
                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '70%',
                        height: '100%',
                        backgroundColor: 'white',
                        transform: [{
                            translateX: menuAnimation
                        }]
                    },
                    styles.menuStyles
                    ]}
                >
                    <Text>Hello, {currentUser}</Text>
                    {/* Autres éléments de menu ici */}
                    <TouchableOpacity onPress={() => setMenuVisible(false)}>
                        <Text>Fermer le menu</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
            <View style={styles.content}>
                <View style={styles.navBtn}>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Image source={require('../assets/Ellipse.png')} style={styles.ellipse} />
                    </TouchableOpacity>
                    <View style={styles.overlay}>
                        <TouchableOpacity onPress={toggleMenu}>
                            <Image source={require('../assets/ic_menu.png')} style={styles.menuIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.bottomBar}>
                <TextInput
                    placeholder="Rechercher..."
                    style={styles.searchBar}
                />
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={toggleExtension}
                    >
                        <Image source={require('../assets/ic_gesture.png')} style={styles.addButtonIcon} />
                    </TouchableOpacity>
                </PanGestureHandler>
            </View>

            {extended && (
                <View style={styles.extensionContent}>

                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    ellipse: {
        width: 70,
        height: 70,
        top: 30,
        flexShrink: 0,
    },
    navBtn: {
        width: 37,
        height: 32,
        top: 20,
        left: 0,
        right: 20,
        flexShrink: 0,
        position: 'relative',
    },
    loc: {
        width: 70,
        height: 70,
        top: 600,
        left: 300,
        flexShrink: 0,
    },
    overlay: {
        position: 'absolute',
        top: 15,
        left: 17,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuIcon: {
        width: 40,
        height: 40,
        top: 30,
        flexShrink: 0,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        marginTop: 20,
        padding: 25,
        paddingHorizontal: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.8,
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 40, // Ajustez la valeur du rayon pour rendre la searchBar arrondie
        marginRight: -50,
        paddingHorizontal: 10,
    },
    addButtonIcon: {
        width: 50,
        height: 10,
        top: -30,
        left: -145,
        borderRadius: 20,
        justifyContent: 'center',
    },
    extensionContent: {
        backgroundColor: 'green',
        paddingHorizontal: 'auto',
        paddingVertical: 100,
        opacity: 0.8,
    },
    buttonAboveNavBar: {
        position: 'absolute',
        top: -40, // Ajustez la position verticale selon vos besoins
        left: 10, // Ajustez la position horizontale selon vos besoins
        zIndex: 1, // Assurez-vous que le bouton est affiché au-dessus de la barre de navigation
    },
    menuStyles: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    overlay: {
        position: 'absolute',
        top: 15,
        left: 17,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        width: 20,
        height: 20,
        top: 30,
        flexShrink: 0,
    },
    ellipse: {
        width: 70,
        height: 70,
        top: 30,
        flexShrink: 0,
    },
});

export default Home;
