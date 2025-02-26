import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Alert,  RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../components/CustomText';
import WeatherCard from '../../components/WeatherCard';
import KeyMetricsCard from '../../components/KeyMetricsCard';
/*import WateringControlCard from '../../components/WateringControlCard';*/
import Settings from '../../components/Settings';
import Toast from 'react-native-toast-message';
import { Card, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import TimeDisplay from '../../components/TimeDisplay';
import ChartCard from '../../components/ChartCard';


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


const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => {
    setRefreshing(true);
    loadSettings(); // Add any other data fetching methods here
    setTimeout(() => setRefreshing(false), 1000);
};


    return (
        <ScrollView contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.header}>
                <CustomText size={28} color="#2196F3" style={styles.welcomeText}>
                    Smart Watering System
                </CustomText>
                
            </View>

            <WeatherCard />
            <KeyMetricsCard />
          

            <Settings 
              autoWatering={autoWatering} 
              setAutoWatering={setAutoWatering}
              startWatering={handleStartWatering}
             />


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
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    welcomeText: { fontWeight: 'bold' },
    card: {
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    cardTitle: { fontWeight: 'bold' },
    historyItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    historyText: { marginLeft: 10 },
    clearButton: { backgroundColor: '#EF5350', marginTop: 10 },
});
