import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Platform, Alert, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Calendar from 'expo-calendar';
import CustomText from './CustomText';
import { Card, Icon } from 'react-native-elements';

const ScheduleWateringCard = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        loadScheduledDates();
        requestCalendarPermissions();
    }, []);

    const loadScheduledDates = async () => {
        try {
            const savedDates = await AsyncStorage.getItem('scheduledWateringDates');
            if (savedDates) {
                setSelectedDates(JSON.parse(savedDates).map(date => new Date(date)));
            }
        } catch (error) {
            console.error('Failed to load scheduled dates', error);
        }
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            const updatedDates = [...selectedDates, date];
            setSelectedDates(updatedDates);
            storeScheduledDates(updatedDates);
            addEventToCalendar(date);
        }
    };

    const storeScheduledDates = async (dates) => {
        try {
            await AsyncStorage.setItem('scheduledWateringDates', JSON.stringify(dates));
            Alert.alert('Success', 'Watering dates scheduled successfully!');
        } catch (error) {
            console.error('Failed to save scheduled dates', error);
        }
    };

    const requestCalendarPermissions = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Calendar access is needed to save events.');
        }
    };

    const createCalendar = async () => {
        const defaultCalendarSource = 
            Platform.OS === 'ios' 
            ? await Calendar.getDefaultCalendarAsync() 
            : { isLocalAccount: true, name: 'Smart Watering System' };

        const calendarId = await Calendar.createCalendarAsync({
            title: 'Smart Watering Schedule',
            color: '#2196F3',
            entityType: Calendar.EntityTypes.EVENT,
            source: defaultCalendarSource,
            name: 'Smart Watering Calendar',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        return calendarId;
    };

    const addEventToCalendar = async (date) => {
        try {
            const calendarId = await createCalendar();
            await Calendar.createEventAsync(calendarId, {
                title: 'Watering Plants',
                startDate: date,
                endDate: new Date(date.getTime() + 60 * 60 * 1000), // 1-hour event
                timeZone: 'GMT',
                location: 'Garden',
                notes: 'Ensure the soil is moist and not overwatered.',
                alarms: [{ relativeOffset: -30, method: Calendar.AlarmMethod.ALERT }], // Reminder 30 minutes before
            });
            console.log('Event added to calendar:', date);
        } catch (error) {
            console.error('Failed to add event to calendar', error);
            Alert.alert('Error', 'Could not add event to the calendar.');
        }
    };

    const clearScheduledDates = async () => {
        try {
            await AsyncStorage.removeItem('scheduledWateringDates');
            setSelectedDates([]);
            Alert.alert('Success', 'All scheduled dates cleared!');
        } catch (error) {
            console.error('Failed to clear scheduled dates', error);
        }
    };

    // Dynamic icon based on date and status
    const getDynamicIcon = (date) => {
        const today = new Date();
        const dayOfWeek = date.getDay();
        const isUpcoming = date >= today;

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return { name: 'umbrella', color: '#42A5F5' }; // Rainy on weekends
        } else if (isUpcoming) {
            return { name: 'event', color: '#4CAF50' }; // Upcoming watering
        } else {
            return { name: 'cancel', color: '#F44336' }; // Past watering
        }
    };

    return (
        <Card containerStyle={styles.card}>
            <CustomText size={20} style={styles.title}>
                Watering Schedule
            </CustomText>
            <Card.Divider />
            <View style={styles.scheduleContainer}>
                <CustomText size={18} style={styles.dateText}>
                    {selectedDates.length > 0 ? 'Scheduled Dates:' : 'No dates selected'}
                </CustomText>
                <FlatList
                    data={selectedDates}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.dateItem}>
                            <Icon
                                name={getDynamicIcon(item).name}
                                color={getDynamicIcon(item).color}
                                size={30}
                            />
                            <CustomText size={16} style={styles.dateText}>
                                {item.toDateString()}
                            </CustomText>
                        </View>
                    )}
                />
                <Button
                    title="Select Watering Date"
                    onPress={() => setShowDatePicker(true)}
                    color="#2196F3"
                />
                <Button
                    title="Clear All Dates"
                    onPress={clearScheduledDates}
                    color="#EF5350"
                />
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                />
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
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
    scheduleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default ScheduleWateringCard;
