import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import MapData from './jardins-partages.json'
import BottomSheet from '@gorhom/bottom-sheet';
import { UserContext } from './MainPage/UserContext';
import { ScrollView } from 'react-native';


export default function MainPageTwo() {
    const [selectedJardin, setSelectedJardin] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [filteredJardins, setFilteredJardins] = useState(MapData);
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [jardinsData, setJardinsData] = useState(MapData);
    const { currentUser } = useContext(UserContext);
    const mapViewRef = useRef(null);
    const bottomSheetRef = useRef(null);

    const handleMarkerPress = (jardin) => {
        setSelectedJardin(jardin);
        const selectedJardinEvents = jardinsData.find(j => j.nom_ev === jardin.nom_ev)?.evenements || [];
        setEvents(selectedJardinEvents);
        setShowDetails(true);
        bottomSheetRef.current?.snapToIndex(1);

        mapViewRef.current.animateToRegion({
            latitude: jardin.geo_point_2d.lat,
            longitude: jardin.geo_point_2d.lon,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
        }, 1000);
    };



    const addEvent = () => {
        const newEvent = {
            titre: eventTitle,
            date: eventDate,
            heure: eventTime,
            description: eventDescription,
        };

        const updatedJardins = jardinsData.map(jardin => {
            if (jardin.nom_ev === selectedJardin.nom_ev) {
                return {
                    ...jardin,
                    evenements: [...(jardin.evenements || []), newEvent]
                };
            }
            return jardin;
        });
        setJardinsData(updatedJardins);
        setEvents(prevEvents => [...prevEvents, newEvent]);

        setEventTitle("");
        setEventDate("");
        setEventTime("");
        setEventDescription("");
        Alert.alert("Succès", "L'événement a été ajouté avec succès!");
    };


    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredJardins(MapData);
        } else {
            const filtered = MapData.filter(jardin =>
                jardin.nom_ev && jardin.nom_ev.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredJardins(filtered);
        }
    };


    return (
        <View style={styles.root}>
            <View style={styles.overlay}>
                <TouchableOpacity onPress={() => {
                    // Ajoutez ici l'action que vous souhaitez exécuter lors du clic
                    navigation.navigate('Settings');
                }}>
                    <Image source={require('../assets/Setting.png')} style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
            <MapView
                ref={mapViewRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 48.8534,
                    longitude: 2.3488,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {jardinsData.map((jardin, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: jardin.geo_point_2d.lat,
                            longitude: jardin.geo_point_2d.lon
                        }}
                        title={jardin.nom_ev}
                        description={jardin.adresse}
                        onPress={() => handleMarkerPress(jardin)}
                    />
                ))}
            </MapView>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={['25%', '50%', '96%']}
                enablePanDownToClose={false}
                onChange={(index) => {
                    if (index === -1) {
                        bottomSheetRef.current?.snapToIndex(0);
                        setShowDetails(false);
                    }
                }}
                style={styles.bottomSheet}
            >
                <ScrollView style={{ flex: 1, backgroundColor: '#86b36a' }}>
                    <View style={styles.contentContainer}>
                        {showDetails ? (
                            <>
                                <View style={styles.leftside} >
                                    <Text style={styles.nom} >{selectedJardin.nom_ev}</Text>
                                    <Text style={styles.adresse} >{selectedJardin.adresse}</Text>
                                    <Text style={styles.evenement} >Évènements</Text>
                                </View>

                                {events.map((event, idx) => (
                                    <View style={styles.createevent} key={idx}>
                                        <View style={styles.eventHeader}>
                                            <Text style={styles.eventtitre}>{event.titre}</Text>
                                            <Text style={styles.userevent}>Ajouté par: {currentUser}</Text>
                                        </View>
                                        <Text style={styles.eventdate}>{event.date} à {event.heure}</Text>
                                        <Text style={styles.textdescription}>Description</Text>
                                        <Text style={styles.eventdescription}>{event.description}</Text>
                                    </View>
                                ))}
                                <TextInput
                                    placeholder="Titre de l'événement"
                                    value={eventTitle}
                                    onChangeText={setEventTitle}
                                    style={styles.eventInput}
                                />
                                <TextInput
                                    placeholder="Date (ex: 2023-10-01)"
                                    value={eventDate}
                                    onChangeText={setEventDate}
                                    style={styles.eventInput}
                                />
                                <TextInput
                                    placeholder="Heure (ex: 15:00)"
                                    value={eventTime}
                                    onChangeText={setEventTime}
                                    style={styles.eventInput}
                                />
                                <TextInput
                                    placeholder="Description"
                                    value={eventDescription}
                                    onChangeText={setEventDescription}
                                    style={styles.eventInput}
                                />

                                <TouchableOpacity onPress={addEvent} style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Ajouter l'événement</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowDetails(false)}>
                                    <Text>Retour à la recherche</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TextInput
                                    placeholder="Rechercher un jardin..."
                                    style={styles.searchBar}
                                    value={searchQuery}
                                    onChangeText={text => handleSearch(text)}
                                    onFocus={() => bottomSheetRef.current?.snapToIndex(1)}
                                />
                                <ScrollView style={styles.searchResultsContainer}>
                                    {searchQuery.trim() !== "" && filteredJardins.map((jardin, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleMarkerPress(jardin)} style={styles.gardenItem}>
                                            <Text style={styles.gardenTitle}>{jardin.nom_ev}</Text>
                                            <Text style={styles.subText}>{jardin.adresse}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </>
                        )}
                    </View>
                </ScrollView>


            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },

    leftside: {
        width: '100%',
    },

    subText: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5
    },
    searchBar: {
        width: '100%',
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#e9e9e9',
        marginBottom: 15
    },
    eventInput: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 10
    },
    addButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        marginBottom: 10
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    gardenItem: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        alignItems: 'center'
    },
    gardenTitle: {
        fontWeight: 'bold',
        marginBottom: 5
    },

    nom: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    adresse: {
        fontSize: 18,
        color: '#CACACA',
        marginBottom: 10
    },
    evenement: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    createevent: {
        width: 342, // Set to your desired width
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
        marginBottom: 30,
    },
    eventtitre: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: 'black'
    },
    eventdate: {
        fontSize: 15,
        color: '#979797',
        marginBottom: 10
    },

    textdescription: {
        fontSize: 17,
        color: 'black'
    },

    eventdescription: {
        fontSize: 18,

        color: '#979797'
    },

    userevent: {
        fontSize: 16,
        marginBottom: 10,
        color: '#979797'
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
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
