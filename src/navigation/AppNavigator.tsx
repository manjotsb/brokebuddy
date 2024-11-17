import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddTransactionScreen from "../screens/AddTransactionScreen";
import ViewDetailsScreen from "../screens/ViewDetailsScreen";

export type RootStackParamList = {
    Home: undefined;
    AddTransaction: {transactionId?: string};
    ViewDetails: {transactionId: string};
};

const stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName="Home">
                <stack.Screen name="Home" component={HomeScreen}/>
                <stack.Screen name="AddTransaction" component={AddTransactionScreen}/>
                <stack.Screen name="ViewDetails" component={ViewDetailsScreen}/>
            </stack.Navigator>
        </NavigationContainer>
    );
}