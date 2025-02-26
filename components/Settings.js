import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Switch } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ autoWatering, setAutoWatering }) => {
    const [wateringThreshold, setWateringThreshold] = useState(30);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedThreshold = await AsyncStorage.getItem('wateringThreshold');
            if (savedThreshold !== null) {
                setWateringThreshold(parseInt(savedThreshold, 10));
            }
        } catch (error) {
            console.error('Failed to load settings', error);
        }
    };

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('wateringThreshold', wateringThreshold.toString());
            await AsyncStorage.setItem('autoWatering', autoWatering.toString());
            Alert.alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings', error);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Settings</Text>
            <Text>Watering Threshold (%):</Text>
            <Input
                value={String(wateringThreshold)}
                onChangeText={(text) => setWateringThreshold(Number(text))}
                keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
                <Text>Enable Automatic Watering</Text>
                <Switch
                    value={autoWatering}
                    onValueChange={(value) => setAutoWatering(value)}
                />
            </View>
            <Button title="Save Settings" onPress={saveSettings} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});

export default Settings;
