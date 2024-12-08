import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../theme/mycolors';
import BigText from '../theme/BigText';
import AppTextField from '../theme/AppTextField';

const SignupScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    const signUpImages = [
        require('../../assets/images/t.png'),
        require('../../assets/images/f.png'),
        require('../../assets/images/g.png')
    ];

    const handleSignup = () => {
        if (!fullName) {
            Alert.alert("Error", "Name is required");
            return;
        }
        if (!phone) {
            Alert.alert("Error", "Phone is required");
            return;
        }
        if (!email) {
            Alert.alert("Error", "Email is required");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }
        Alert.alert("Success", "Registration Successful");
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo_part_1.png')}
                    style={styles.logo}
                />
            </View>
            <AppTextField
                hintText="Name"
                value={fullName}
                onChangeText={setFullName}
                icon="user"
            />
            <AppTextField
                hintText="Phone"
                value={phone}
                onChangeText={setPhone}
                icon="phone"
                keyboardType="phone-pad"
            />
            <AppTextField
                hintText="Email"
                value={email}
                onChangeText={setEmail}
                icon="envelope"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <AppTextField
                hintText="Password"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                secureTextEntry
            />
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <BigText text="Sign Up" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.socialText}>Sign up using one of the following options</Text>
            <View style={styles.socialIcons}>
                {signUpImages.map((image, index) => (
                    <Image key={index} source={image} style={styles.iconImage} />
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    signupButton: {
        width: '70%',
        height: 50,
        backgroundColor: Colors.mainColor,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    signInText: {
        fontSize: 16,
        color: Colors.black,
    },
    signInLink: {
        fontSize: 16,
        color: Colors.mainColor,
        fontWeight: 'bold',
    },
    socialText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: Colors.black,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    iconImage: {
        width: 50,
        height: 50,
        marginHorizontal: 12,
        borderRadius: 25,
    },
});

export default SignupScreen;
