// components/ChartCard.js
import React from 'react';
import { Card } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet } from 'react-native';
import CustomText from './CustomText';

const ChartCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <CustomText size={22} style={styles.cardTitle}>
                Soil Moisture Trends
            </CustomText>
            <LineChart
                data={{
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                        { data: [20, 45, 28, 80, 99, 43] }
                    ]
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: '#2196F3',
                    backgroundGradientFrom: '#2196F3',
                    backgroundGradientTo: '#81D4FA',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: () => '#FFF',
                }}
                style={styles.chart}
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        borderRadius: 10,
    },
});

export default ChartCard;
