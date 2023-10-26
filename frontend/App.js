// import { StyleSheet, Text, View } from "react-native";
// import HomeScreenUser from "./screens/HomeScreenUser/HomeScreenUser";
// export default function App() {
//   return <HomeScreenUser />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./screens/LoginScreen/Login";
import HomeScreenAdmin from "./screens/HomeScreenAdmin/HomeScreenAdmin";
import HomeScreenUser from "./screens/HomeScreenUser/HomeScreenUser";
import DonationGuidelines from "./screens/DonationGuidelines/DonationGuidelines";
import DonationForm from "./screens/DonationScreen/DonationForm";
import DonorsList from "./screens/DonorsList/DonorsList";
import DonationDetails from "./screens/DonationDetails/DonationDetails";
import ThankYouScreen from "./screens/ThankYouSceen/ThankYouScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BookInfo from "./screens/bookInfo"; 
import RequestForm from './screens/requestBookForm'; 
import SuccessScreen from './screens/bookSuccessfull';
import RequestList from './screens/bookreqlist';
import BookWishlist from './screens/bookWishlist';

import ExchangeRequests from "./screens/exchangerequests/ExchangeRequests";
import ExchangeRequestDetails from "./screens/exchangerequestdetails/ExchangeRequestDetails";
import CreateExchangeAd from "./screens/exchangeads/CreateExchangeAd";
import DisplayExchangeAds from "./screens/exchangeads/DisplayExchangeAds";
import ExchangeAdDetails from "./screens/exchangeads/ExchangeAdDetails";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreenAdmin"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="HomeScreenAdmin" component={HomeScreenAdmin} />
          <Stack.Screen name="HomeScreenUser" component={HomeScreenUser} />
          <Stack.Screen
            name="DonationGuidelines"
            component={DonationGuidelines}
          />
          <Stack.Screen name="DonationForm" component={DonationForm} />
          <Stack.Screen name="DonorsList" component={DonorsList} />
          <Stack.Screen name="DonationDetails" component={DonationDetails} />
          <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />

          <Stack.Screen name="BookInfo" component={BookInfo} />
          <Stack.Screen name = "RequestForm" component = {RequestForm} />
          <Stack.Screen name = "SuccessScreen" component = {SuccessScreen} />
          <Stack.Screen name = "RequestList" component = {RequestList} />
          <Stack.Screen name = "BookWishlist" component = {RequestList} />
          
          <Stack.Screen name = "ExchangeRequests" component = {ExchangeRequests} />
          <Stack.Screen name = "ExchangeRequestDetails" component = {ExchangeRequestDetails} />
          <Stack.Screen name = "CreateExchangeAd" component = {CreateExchangeAd} />
          <Stack.Screen name = "DisplayExchangeAds" component = {DisplayExchangeAds} />
          <Stack.Screen name = "ExchangeAdDetails" component = {ExchangeAdDetails} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
