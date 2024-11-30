import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { MyColors } from '../theme/mycolors';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const nav = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            nav.navigate("Home");
        }, 1000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            {/* Thêm StatusBar để thay đổi màu của thanh trạng thái  */}
            <StatusBar style="light" />
            <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Image source={require('../../assets/images/logo_part_1.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
                <Image source={require('../../assets/images/logo_part_2.png')} style={{ width: 390, height: 80 }} />
            </View>
            <Text style={{ fontSize: 24, color: MyColors.secondary }}>Splash Screen</Text>
        </View>
    );
}

export default SplashScreen;