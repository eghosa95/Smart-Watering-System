// TimeDisplay.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>
                {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    timeText: { fontSize: 18, color: '#333' },
});

export default TimeDisplay;
