import React, { useState } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView, Dimensions } from 'react-native';
import CustomText from '../../components/CustomText';
import ScheduleWateringCard from '../../components/ScheduleWateringCard';
import ChartCard from '../../components/ChartCard';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Explore() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate data refresh
        setTimeout(() => setRefreshing(false), 1000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer} 
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.header}>
                    <MaterialIcons name="explore" size={32} color="#2196F3" />
                    <CustomText size={24} color="#2196F3" style={styles.title}>
                        Explore the Smart Watering System
                    </CustomText>
                </View>

                {/* Watering Schedule Section */}
                <Card containerStyle={styles.card}>
                    <CustomText size={20} style={styles.sectionTitle}>
                        Watering Schedule
                    </CustomText>
                    <Card.Divider />
                    <ScheduleWateringCard />
                </Card>

                {/* Analytics & Performance Section */}
                <Card containerStyle={styles.card}>
                    <CustomText size={20} style={styles.sectionTitle}>
                        <Card.Divider />
                    </CustomText>
                   
                    <View style={styles.chartContainer}>
                        <ChartCard />
                    </View>
                </Card>
                
                {/* System Insights Section */}
                <Card containerStyle={styles.card}>
                    <CustomText size={20} style={styles.sectionTitle}>
                        System Insights
                    </CustomText>
                    <Card.Divider />
                    <View style={styles.insightContainer}>
                        <MaterialIcons name="insights" size={28} color="#42A5F5" />
                        <CustomText size={16} style={styles.insightText}>
                            Your system is running optimally. Keep up the good work!
                        </CustomText>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    card: {
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartContainer: {
        height: 220, // Ensures the chart has a fixed, manageable height
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    insightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
    },
    insightText: {
        marginLeft: 0,
        color: '#333',
        fontSize: 17,
        textAlign: 'center',
        paddingHorizontal: 18,
    },
});
