import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const CardTitle = ({ title = "Default Title" }) => (
    <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    cardHeader: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CardTitle;
