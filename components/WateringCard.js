

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Button } from 'react-native-elements';
import CustomText from './CustomText';



const WateringCard = ({ soilMoisture, startWatering, watering, autoWatering }) => {
    const [currentSoilMoisture, setCurrentSoilMoisture] = useState(soilMoisture);

    useEffect(() => {
        // Simulate real-time sensor data fetch every 5 seconds
        const interval = setInterval(() => {
            fetchSensorData();
        }, 5000); // 5000ms = 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const fetchSensorData = async () => {
        try {
            // Simulated API call to fetch real-time sensor data
            const simulatedMoisture = Math.floor(Math.random() * 100); // Simulating random sensor data
            setCurrentSoilMoisture(simulatedMoisture);
            console.log('Real-time soil moisture:', simulatedMoisture);
        } catch (error) {
            console.error('Failed to fetch real-time sensor data', error);
        }
    };

    return (
        <Card containerStyle={styles.card}>
            <CustomText size={22} style={styles.title}>
                Watering Control
            </CustomText>
            <CustomText size={18}>Soil Moisture: {currentSoilMoisture}%</CustomText>
            
            <Button
                title={watering ? 'Stop Watering' : 'Start Watering'}
                onPress={startWatering}
                color="#2196F3"
            />
            
            <CustomText size={16}>
                Auto-Watering: {autoWatering ? 'Enabled' : 'Disabled'}
            </CustomText>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default WateringCard;
