import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Switch, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from './CustomText';

const Settings = ({ autoWatering, setAutoWatering, startWatering }) => {
    const [wateringThreshold, setWateringThreshold] = useState(30);
    const [loading, setLoading] = useState(false);

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

    const handleManualWatering = () => {
        Alert.alert(
            'Manual Watering',
            'Are you sure you want to manually water the plants?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Water Now',
                    onPress: () => {
                        setLoading(true);
                        startWatering();
                        setTimeout(() => {
                            setLoading(false);
                            Alert.alert('Watering Completed!', 'Your plants have been watered.');
                        }, 2000);
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.card}>
            <CustomText size={22} style={styles.title}>Settings</CustomText>

            <CustomText size={18}>Watering Threshold (%)</CustomText>
            <Input
                value={String(wateringThreshold)}
                onChangeText={(text) => setWateringThreshold(Number(text))}
                keyboardType="numeric"
                placeholder="Enter watering threshold"
            />

            <View style={styles.switchContainer}>
                <CustomText size={18}>Automatic Watering</CustomText>
                <Switch
                    value={autoWatering}
                    onValueChange={(value) => setAutoWatering(value)}
                    thumbColor={autoWatering ? '#2196F3' : '#f4f3f4'}
                />
            </View>


                <Button
                title="Manual Watering"
                onPress={handleManualWatering}
                buttonStyle={styles.waterButton}
                disabled={loading}
                icon={
                    loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        { name: 'water', type: 'material-community', color: '#FFF' }
                    )
                }
            />


            <Button 
                title="Save Settings" 
                onPress={saveSettings} 
                buttonStyle={styles.saveButton} 
            />

            
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
    saveButton: {
        backgroundColor: '#2196F3',
        marginVertical: 10,
        borderRadius: 8,
    },
    waterButton: {
        backgroundColor: '#42A5F5',
        marginTop: 10,
        borderRadius: 8,
    },
});

export default Settings;
