import React, { useState } from 'react'
import image from "../images/Home.jpeg"
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput, Image, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import user from "../images/user.png"

export default function WelcomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [value, setValue] = useState()
    const [filePath, setFilePath] = useState({})
    const [imageFile, setImageFile] = useState({})
    const [player1, setPlayer1] = useState("Player 1")
    const [player2, setPlayer2] = useState("Player 2")

    // let user = require('../images/user.png')
    // let image1 =  !filePath?.uri ?  user : filePath?.uri
    // let image2 =  !imageFile?.uri ?  user : imageFile?.uri

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
            mediaType: 'photo',
            quality: 1
        },
    };

    const handleModal = (value) => {
        setModalVisible(true)
        setValue(value)
    }

    const cameraLaunch = async () => {
        const result = await launchCamera(options);
        if (value === "Player 1") {
            setFilePath(result?.assets[0])
        }
        else if (value === "Player 2") {
            setImageFile(result?.assets[0])
        }
        setModalVisible(false)
    }

    const imageGalleryLaunch = async () => {
        const result = await launchImageLibrary(options);
        if (value === "Player 1") {
            setFilePath(result?.assets[0])
        }
        else if (value === "Player 2") {
            setImageFile(result?.assets[0])
        }
        setModalVisible(false)
    }
   

    const startGame = () => {
        let item1 = { name: player1, image: filePath?.uri }
        let item2 = { name: player2, image: imageFile?.uri }
        if (filePath?.uri && imageFile?.uri) {
            navigation.navigate("GameScreen", { player1Det: item1, player2Det: item2 })
        }
        else {
            Alert.alert("Alert", "please select image", [
                {
                    text: "cancel",
                    onPress: () => navigation.navigate("Welcome")
                }
            ])
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                {!modalVisible &&
                    <>
                        <View style={styles.player}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <TextInput value={player1} onChangeText={(value) => setPlayer1(value)} style={{ fontSize: 20, backgroundColor: "#1aed07", width: 200, alignSelf: 'center', marginRight: 10 }} placeholder="Player 1" />
                                <TouchableOpacity onPress={() => handleModal("Player 1")} style={styles.imageContainer}>
                                    <Image source={!filePath?.uri ? user : { uri: filePath?.uri }} style={{ width: 50, height: 50, borderRadius: 30, }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TextInput value={player2} onChangeText={(value) => setPlayer2(value)} style={{ fontSize: 20, backgroundColor: "#1aed07", width: 200, alignSelf: 'center', marginRight: 10 }} placeholder="Player 2" />
                                <TouchableOpacity onPress={() => handleModal("Player 2")} style={styles.imageContainer}>
                                    <Image source={!imageFile?.uri ? user : { uri: imageFile?.uri }} style={{ width: 50, height: 50, borderRadius: 30 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={startGame} style={styles.buttonContainer}>
                            <AntDesign name="right" size={30} />
                            <Text style={{ fontSize: 20 }}>Start Game</Text>
                        </TouchableOpacity>
                    </>
                }
                {
                    modalVisible &&
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{ fontWeight: 700, marginBottom: 10 }}>Choose File....</Text>
                                    <Pressable
                                        style={{ marginBottom: 5 }}
                                        onPress={cameraLaunch}>
                                        <Text style={styles.textStyle}>Take Photo</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={imageGalleryLaunch}>
                                        <Text style={{ marginBottom: 10 }}>Open Gallery</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Close</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        opacity: 0.85
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: 15,
        width: 55,
        height: 55,
        backgroundColor: '#1aed07'
    },
    buttonContainer: {
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: "#1aed07",
        borderRadius: 5,
        width: 160,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignSelf: 'center',
        marginBottom: 30,
        marginRight: 5
    },
    player: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginRight: 5
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
});
