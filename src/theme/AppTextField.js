import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyColors from '../theme/mycolors';
import Dimensions from '../theme/Dimensions';

const AppTextField = ({ hintText, icon, value, onChangeText, secureTextEntry }) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(secureTextEntry);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Icon name={icon} size={20} color={MyColors.yellowColor} style={styles.icon} />
            <TextInput
                placeholder={hintText}
                value={value}
                style={styles.input}
                onChangeText={onChangeText}
                secureTextEntry={isPasswordVisible}
            />
            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Icon
                        name={isPasswordVisible ? 'eye-slash' : 'eye'}
                        size={20}
                        color={MyColors.grayColor}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Dimensions.width20,
        marginTop: Dimensions.height20,
        backgroundColor: '#FFFFFF',
        borderRadius: Dimensions.radius30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    icon: {
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: Dimensions.radius30,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
});

export default AppTextField;
