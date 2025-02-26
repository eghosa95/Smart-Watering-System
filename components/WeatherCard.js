import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Button } from 'react-native-elements';
import CustomText from './CustomText';

const API_KEY = '5860bb4ac9c007012b0cf2d4d559b079'; // OpenWeatherMap API key
const CITY = 'Vaughan'; // Set the city for weather data

const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  
    

    useEffect(() => {
        fetchWeatherData();

        // ⏲️ Throttling: Fetch every 60 seconds to reduce load
        const interval = setInterval(() => {
            fetchWeatherData();
        }, 60000); // 60000ms = 60 seconds

        return () => clearInterval(interval);
    }, []);

    // 🚦 Fetch Weather Data with Error Handling
    const fetchWeatherData = useCallback(async () => {
        try {
            setLoading(true);
            console.log('Fetching weather data...');
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            setError(false);
            console.log('Weather data updated:', data);
        } catch (error) {
            console.error('Failed to fetch weather data', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    const getWeatherIcon = (temperature, weatherDescription) => {
        if (weatherDescription.includes('rain')) {
            return { name: 'umbrella', color: '#42A5F5' };
        } else if (weatherDescription.includes('cloud')) {
            return { name: 'cloud', color: '#90A4AE' };
        } else if (weatherDescription.includes('snow')) {
            return { name: 'ac-unit', color: '#B3E5FC' };
        } else if (temperature > 30) {
            return { name: 'wb-sunny', color: '#FFA726' };
        } else if (temperature < 0) {
            return { name: 'ac-unit', color: '#00ACC1' };
        } else {
            return { name: 'wb-cloudy', color: '#81D4FA' };
        }
    };

    if (loading) {
        return (
            <Card containerStyle={styles.card}>
                <CustomText size={22} style={styles.title}>
                    Loading Weather...
                </CustomText>
                <ActivityIndicator size="large" color="#2196F3" />
            </Card>
        );
    }

    if (error) {
        return (
            <Card containerStyle={styles.card}>
                <CustomText size={22} style={styles.title}>
                    Current Weather
                </CustomText>
                <Card.Divider />
                <CustomText size={18} style={styles.errorText}>
                    Failed to load weather data. Please try again later.
                </CustomText>
            </Card>
        );
    }

    const temperature = weatherData?.main?.temp ?? 'N/A';
    const weatherDescription = weatherData?.weather?.[0]?.description ?? 'No data';
    const icon = getWeatherIcon(temperature, weatherDescription);

    const feelsLike = weatherData?.main?.feels_like ?? 'N/A';
    const humidity = weatherData?.main?.humidity ?? 'N/A';
    const pressure = weatherData?.main?.pressure ?? 'N/A';
    const visibility = weatherData?.visibility ?? 'N/A';
    const cloudiness = weatherData?.clouds?.all ?? 'N/A';
    const sunrise = new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString() ?? 'N/A';
    const sunset = new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString() ?? 'N/A';

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Card containerStyle={styles.card}>
                    <CustomText size={22} style={styles.title}>
                        Current Weather
                    </CustomText>
                    <Card.Divider />
                    <View style={styles.weatherContainer}>
                        <MaterialIcons name={icon.name} size={50} color={icon.color} />
                        <View style={styles.weatherInfo}>
                            <CustomText size={20} style={styles.weatherText}>
                                {temperature}°C
                            </CustomText>
                            <CustomText size={16} style={styles.weatherDescription}>
                                {weatherDescription}
                            </CustomText>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <CustomText size={24} style={styles.modalTitle}>
                                Detailed Weather Information
                            </CustomText>
                            <CustomText size={18}>Temperature: {temperature}°C</CustomText>
                            <CustomText size={18}>Feels Like: {feelsLike}°C</CustomText>
                            <CustomText size={18}>Humidity: {humidity}%</CustomText>
                            <CustomText size={18}>Pressure: {pressure} hPa</CustomText>
                            <CustomText size={18}>Visibility: {visibility} m</CustomText>
                            <CustomText size={18}>Cloudiness: {cloudiness}%</CustomText>
                            <CustomText size={18}>Sunrise: {sunrise}</CustomText>
                            <CustomText size={18}>Sunset: {sunset}</CustomText>
                        </ScrollView>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(false)}
                            buttonStyle={styles.closeButton}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    card: { borderRadius: 10, marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    weatherContainer: { flexDirection: 'row', alignItems: 'center' },
    weatherInfo: { marginLeft: 10 },
    weatherText: { fontWeight: 'bold' },
    errorText: { color: '#EF5350', fontWeight: 'bold', textAlign: 'center' },
    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
    modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginHorizontal: 20 },
    modalTitle: { fontWeight: 'bold', marginBottom: 10 },
    closeButton: { backgroundColor: '#2196F3', marginTop: 20 },
});

export default WeatherCard;
