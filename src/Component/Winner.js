import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Winner({ route }) {
    let winnerPlayer = route.params.item
    return (
        <View style={styles.body}>
            <View style={styles.winner}>
                <Image source={{ uri: winnerPlayer.image }} style={{ alignSelf:'center', width: 100, height: 100, borderRadius: 15, marginBottom:30}} />
                <Text style={{alignSelf:'center', fontSize: 24, color:'#fff', fontWeight:'bold'}}>WINNER  {winnerPlayer.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#eb8634',
    },
    winner:{
        flexDirection: 'column',
        alignSelf:'center',
        marginTop:150
    }
});