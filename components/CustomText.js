import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Avoid defaultProps by using default parameters
const CustomText = ({ children, size = 18, color = '#333', style = {}, ...props }) => {
    return (
        <Text style={[styles.text, { fontSize: size, color }, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'System',
        color: '#333',
    },
});

export default CustomText;
