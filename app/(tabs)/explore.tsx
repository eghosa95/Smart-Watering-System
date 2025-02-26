import { StyleSheet, Image, Platform, View } from 'react-native';

import { Collapsible } from '../../components/Collapsible';
import { ExternalLink } from '../../components/ExternalLink';
import ParallaxScrollView from '../../components/ParallaxScrollView';

import CardTitle from '../../components/CardTitle';
import CustomText from '../../components/CustomText';
import { IconSymbol } from '../../components/ui/IconSymbol';

const Explore = () => (
    <View style={styles.container}>
        <CustomText size={24} color="#2196F3" style={styles.title}>
            Explore the Smart Watering System
        </CustomText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default Explore;
