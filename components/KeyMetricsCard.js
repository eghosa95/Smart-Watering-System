import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import CustomText from './CustomText';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const API_KEY = '5860bb4ac9c007012b0cf2d4d559b079'; // OpenWeatherMap API key
const CITY = 'Vaughan'; // Set the city for weather data

const KeyMetrics = () => {
    const [metricsData, setMetricsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        fetchMetricsData();

        const interval = setInterval(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            fetchMetricsData();
        }, 30000); // Fetch data every 30 seconds

        const timeInterval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            setCurrentDate(now.toLocaleDateString());
        }, 1000); // Update time every second

        return () => {
            clearInterval(interval);
            clearInterval(timeInterval);
        };
    }, []);

    const fetchMetricsData = useCallback(async () => {
        try {
            console.log('Fetching key metrics data...');
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch key metrics data');
            }
            const data = await response.json();
            setMetricsData(data);
            setError(false);
            console.log('Key metrics data updated:', data);
        } catch (error) {
            console.error('Failed to fetch key metrics data', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading && !metricsData) {
        return <ActivityIndicator size="large" color="#2196F3" />;
    }

    if (error) {
        return (
            <CustomText size={18} style={styles.errorText}>
                Failed to load key metrics data. Please try again later.
            </CustomText>
        );
    }

    const { temp, humidity } = metricsData?.main ?? {};
    const temperature = temp ?? 'N/A';
    const waterUsage = ((100 - humidity) * 0.1).toFixed(1); // Simulated value

    return (
        <Card containerStyle={styles.card}>
            <CustomText size={22} style={styles.title}>
                Key Metrics
            </CustomText>
            <Card.Divider />
            <View style={styles.metricContainer}>
                <MaterialIcons name="water-drop" size={30} color="#42A5F5" />
                <CustomText size={18}>Soil Moisture: {humidity}%</CustomText>
            </View>
            <View style={styles.metricContainer}>
                <MaterialIcons name="thermostat" size={30} color="#EF5350" />
                <CustomText size={18}>Temperature: {temperature}°C</CustomText>
            </View>
            <View style={styles.metricContainer}>
                <MaterialIcons name="opacity" size={30} color="#26A69A" />
                <CustomText size={18}>Water Usage: {waterUsage}L/day</CustomText>
            </View>
            <View style={styles.timeContainer}>
                <MaterialIcons name="access-time" size={24} color="#666" />
                <CustomText size={16} style={styles.timeText}>
                    {currentDate}                           {currentTime}
                </CustomText>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginBottom: 20,
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
    },
    metricContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    timeText: {
        marginLeft: 5,
        color: '#666',
    },
    errorText: {
        color: '#EF5350',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default React.memo(KeyMetrics);
