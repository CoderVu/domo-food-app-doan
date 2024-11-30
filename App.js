import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPayment from "./src/screens/AddPayment";
import Home from "./src/screens/Home";
import LoginScreen from "./src/screens/login";
import Details from "./src/screens/Details";
import MyCart from "./src/screens/MyCart";
import MyOrder from "./src/screens/MyOrder";
import AppFooter from "./src/components/common/AppFooter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from './src/components/Redux/store/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="AddPayment" component={AddPayment} />
              <Stack.Screen name="MyCart" component={MyCart} />
              <Stack.Screen name="MyOrder" component={MyOrder} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;