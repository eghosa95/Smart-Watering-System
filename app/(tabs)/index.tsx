import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../components/CustomText';
import WeatherCard from '../../components/WeatherCard';


import KeyMetricsCard from '../../components/KeyMetricsCard';


import WateringCard from '../../components/WateringCard';
import Settings from '../../components/Settings';
import Toast from 'react-native-toast-message';
import { Card, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';


export default function Index() {
    const [autoWatering, setAutoWatering] = useState(false);
    const [soilMoisture, setSoilMoisture] = useState(45);
    const [wateringHistory, setWateringHistory] = useState([
        { id: 1, date: '2025-02-24', action: 'Watered manually' },
        { id: 2, date: '2025-02-22', action: 'Auto-watering active' },
    ]);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const autoWater = await AsyncStorage.getItem('autoWatering');
            setAutoWatering(autoWater === 'true');
        } catch (error) {
            console.error('Failed to load settings', error);
        }
    };

    const handleStartWatering = () => {
        alert('Watering started!');
        setWateringHistory([
            { id: Date.now(), date: new Date().toLocaleDateString(), action: 'Watered manually' },
            ...wateringHistory,
        ]);
        setTimeout(() => {
            Toast.show({
                type: 'success',
                text1: 'Watering Completed!',
                position: 'bottom',
            });
        }, 2000);
    };

    const handleAlert = () => {
        if (soilMoisture < 30) {
            Alert.alert('Alert', 'Soil moisture is too low! Consider watering the plants.');
        }
    };

    useEffect(() => {
        handleAlert();
    }, [soilMoisture]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CustomText size={28} color="#2196F3" style={styles.welcomeText}>
                Smart Watering System
            </CustomText>

           {/* Real-Time Weather Card */}
           
              <WeatherCard />
           
           {/* Real-Time Key Metrics */}
           

              <KeyMetricsCard />

 
            
                <WateringCard 
               


                soilMoisture={soilMoisture} 
                startWatering={() => alert('Watering started!')} 
                watering={false} 
                autoWatering={autoWatering} 
           
                />



<Card.Divider />

            <Settings autoWatering={autoWatering} setAutoWatering={setAutoWatering} />
            


            {/* Watering History */}

            <Card containerStyle={styles.card}>
    <View style={styles.cardHeader}>
        <CustomText size={22} style={styles.cardTitle}>
            Watering History
        </CustomText>
    </View>

  
<Card.Divider />

    {wateringHistory.map((item) => (
        <View key={item.id} style={styles.historyItem}>
            <MaterialIcons name="history" size={30} color="#90A4AE" />
            <CustomText size={16} style={styles.historyText}>
                {item.date}: {item.action}
            </CustomText>
        </View>
    ))}
    <Button 
        title="Clear History" 
        onPress={() => setWateringHistory([])} 
        buttonStyle={styles.clearButton} 
    />
</Card>


            <Toast />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#F5F5F5' },
    welcomeText: { fontWeight: 'bold', marginBottom: 20 },
    card: {
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    weatherContainer: { flexDirection: 'row', alignItems: 'center' },
    weatherText: { marginLeft: 10, fontWeight: 'bold' },
    metricContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    historyItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    historyText: { marginLeft: 10 },
    clearButton: { backgroundColor: '#EF5350', marginTop: 10 },
});
