import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../theme/mycolors';
import BigText from '../theme/BigText';
import AppTextField from '../theme/AppTextField';
import { Login } from "../components/Redux/Services/AuthService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const [numberPhone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!numberPhone) {
            Alert.alert('Phone', 'Please enter your phone number');
            return;
        }
        if (!password) {
            Alert.alert('Password', 'Please enter your password');
            return;
        }
    
        try {
            const loginData = { numberPhone, password };
            const response = await Login(loginData);
    
            if (response && response.data && response.data.token) {

                await AsyncStorage.setItem('user', JSON.stringify(response.data)); 
                await AsyncStorage.setItem('token', response.data.token); 
                console.log(response.data);
                
                Alert.alert('Success', 'Login successful');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                Alert.alert('Error', 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during login. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ height: height * 0.05 }} />
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo part 1.png')} 
                    style={styles.logo}
                />
            </View>
            <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>Welcome back!</Text>
            </View>
            <AppTextField
                hintText="Phone"
                value={numberPhone}
                onChangeText={setPhone}
                icon="phone"
            />
            <AppTextField
                hintText="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon="lock"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <BigText text="Sign In" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 16,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    welcomeTextContainer: {
        marginLeft: 16,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    loginButton: {
        width: '50%',
        height: 50,
        backgroundColor: Colors.mainColor,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    signUpText: {
        fontSize: 16,
        color: Colors.black,
    },
    signUpLink: {
        fontSize: 16,
        color: Colors.mainColor,
        fontWeight: 'bold',
    },
});

export default LoginScreen;