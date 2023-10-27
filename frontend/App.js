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
import RegisterForm from "./screens/RegisterScreen/Register";
import RegistrationSuccess from "./screens/RegisterScreen/RegistrationSuccess";
import HomeScreenAdmin from "./screens/HomeScreenAdmin/HomeScreenAdmin";
import HomeScreenUser from "./screens/HomeScreenUser/HomeScreenUser";
import DonationGuidelines from "./screens/DonationGuidelines/DonationGuidelines";
import DonationForm from "./screens/DonationScreen/DonationForm";
import DonorsList from "./screens/DonorsList/DonorsList";
import DonationDetails from "./screens/DonationDetails/DonationDetails";
import ThankYouScreen from "./screens/ThankYouSceen/ThankYouScreen";
import SearchResults from "./screens/SearchResults/SearchResults";
import UpdateSuccess from "./screens/UpdateSuccessScreen/UpdateSuccess";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BookInfo from "./screens/bookInfo";
import RequestForm from "./screens/requestBookForm";
import SuccessScreen from "./screens/bookSuccessfull";
import RequestList from "./screens/bookreqlist";
import BookWishlist from "./screens/bookWishlist";
import Toast from "react-native-toast-message";import SugesstScreen from "./screens/suggestBooks";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginFormr"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="RegisterForm" component={RegisterForm} />
          <Stack.Screen
            name="RegistrationSuccess"
            component={RegistrationSuccess}
          />
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
          <Stack.Screen name="UpdateSuccess" component={UpdateSuccess} />
          <Stack.Screen name="SearchResults" component={SearchResults} />

          <Stack.Screen name="BookInfo" component={BookInfo} />
          <Stack.Screen name="RequestForm" component={RequestForm} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="RequestList" component={RequestList} />
          <Stack.Screen name="BookWishlist" component={BookWishlist} />
          <Stack.Screen name = "SugesstScreen" component = {SugesstScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}
