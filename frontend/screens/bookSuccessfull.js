import React , {useState} from "react";
import {Text, View , ScrollView , TouchableOpacity} from "react-native";
import {KeyboardAwareScrollView , } from "react-native-keyboard-aware-scroll-view";
import BookLoverImage from "../components/Book/booksuccessImage";
import { useNavigation, useRoute } from "@react-navigation/native";


const SignIn = () => {
    const [loading , setLoading] = useState(false);

    const navigation = useNavigation();

    const navigateToRequestList = () => {
        navigation.navigate("RequestList");
      };
  
    return (
        <KeyboardAwareScrollView contentContainerStyle ={{flex : 1 , justifyContent : "center", backgroundColor:'#FFF'}}>
            <Text style={{fontSize:28 , fontWeight:'500' , alignSelf:'center'}}>
                Request Sent
            </Text>
            <BookLoverImage />

        <Text style={{
                marginTop: 10,
                fontSize: 22,
                marginHorizontal:15,
                color:"#898484"
              }}>Your request has been sent successfully. We will be in touch with you shortly. </Text>

        <Text style={{
                marginTop: 10,
                fontSize: 22,
                marginHorizontal:15,
                fontWeight:'500',
                color:"#898484"
              }}>Thank you for connecting with Book Pals.  </Text> 
        
        <View>
        <TouchableOpacity
                style={{
                  backgroundColor: "#FA7A50",
                  height: 50,
                  marginTop: 70,
                  justifyContent: "center",
                  alignSelf:'center',
                  borderRadius: 10,
                  marginHorizontal: 25,
                  marginBottom: 30,
                  width: 200,
                }}
                onPress={navigateToRequestList}
              >
                <Text style={{
                  alignSelf: "center",
                  color: "#F6F2EA",
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
                  Your Requests
                </Text>
              </TouchableOpacity >
        </View>

           
        

        
        </KeyboardAwareScrollView>
    );
};

export default SignIn;