import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export function Home() {
    const [extended, setExtended] = useState(false);

    const toggleExtension = () => {
        setExtended(!extended);
    };

    const onGestureEvent = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            // Le bouton est en cours de glissement, déterminez la direction ici
            if (nativeEvent.translationY < 0) {
                // Le bouton est glissé vers le haut
                setExtended(true);
            } else {
                // Le bouton est glissé vers le bas
                setExtended(false);
            }
        }
    };

    return (
        <View style={styles.root}>
            <View style={styles.content}>
                <View style={styles.navBtn}>
                    <TouchableOpacity onPress={() => {
                        // Ajoutez ici l'action que vous souhaitez exécuter lors du clic
                    }}>
                        <Image source={require('../assets/Ellipse.png')} style={styles.ellipse} />
                    </TouchableOpacity>
                    <View style={styles.overlay}>
                        <TouchableOpacity onPress={() => {
                            // Ajoutez ici l'action que vous souhaitez exécuter lors du clic
                        }}>
                            <Image source={require('../assets/ic_menu.png')} style={styles.menuIcon} />
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/ic_loc.png')} style={styles.loc} />
                </View>
                {/* Contenu principal de la page */}
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

            {/* Contenu supplémentaire lorsque la barre est étendue */}
            {extended && (
                <View style={styles.extensionContent}>
                    <Text>Contenu supplémentaire</Text>
                    {/* Ajoutez ici le contenu supplémentaire lorsque la barre est étendue */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 844,
        width: 390,
        backgroundColor: '#42B6A0',
    },
    content: {
        flex: 1,
    },
    image: {
        width: 36,
        height: 36,
        flexShrink: 0,
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
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 25,
        paddingHorizontal: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
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
        backgroundColor: 'white',
        paddingHorizontal: 'auto',
        paddingVertical: 100,
    },
    buttonAboveNavBar: {
        position: 'absolute',
        top: -40, // Ajustez la position verticale selon vos besoins
        left: 10, // Ajustez la position horizontale selon vos besoins
        zIndex: 1, // Assurez-vous que le bouton est affiché au-dessus de la barre de navigation
    },
});

export default Home;