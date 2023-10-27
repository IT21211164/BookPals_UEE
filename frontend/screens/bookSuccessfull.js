import React , {useState} from "react";
import {Text, View , ScrollView , TouchableOpacity , StyleSheet , Image} from "react-native";
import {KeyboardAwareScrollView , } from "react-native-keyboard-aware-scroll-view";
import BookLoverImage from "../components/Book/booksuccessImage";
import { useNavigation, useRoute } from "@react-navigation/native";


const SignIn = () => {
    const [loading , setLoading] = useState(false);

    const route = useRoute();
    const { bookCategory } = route.params;
  

    const navigation = useNavigation();

    const navigateToRequestList = () => {
        navigation.navigate("RequestList");
      };

      const navigateToSuggestList = (bookCategory) => {
        navigation.navigate("SugesstScreen" , {bookCategory});
      };

      const goToHomeScreen = () => {
        navigation.navigate("HomeScreenUser");
      };

      const styles1 = StyleSheet.create({
        container: {
          backgroundColor: '#F6F2EA',
          marginTop: 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 15,
          padding: 15,
          borderWidth: 1,
          borderColor: "grey",
          marginHorizontal:5
        },
      
        screenHeadingContainer: {
          width: "100%",
          padding: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start"
        },
      
        backBtn: {
          width: 50,
          height: 50,
          marginLeft: 10,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
      
        backIcon: {
          width: 32,
          height: 32
        },
      
        screenHeading: {
          marginLeft: 65,
          fontSize: 24,
          fontWeight: "600",
          color: "#192A56",
          alignSelf:'center'
        },
      
      });
  
    return (
        <KeyboardAwareScrollView contentContainerStyle ={{flex : 1 , justifyContent : "center", backgroundColor:'#FFF'}}>
            <View style={styles1.screenHeadingContainer}>
        <TouchableOpacity style={styles1.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../assets/icons/back.png")}
            style={styles1.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles1.screenHeading}>Request Sent</Text>
      </View>
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
                  marginTop: 30,
                  justifyContent: "center",
                  alignSelf:'center',
                  borderRadius: 10,
                  marginHorizontal: 25,
                  marginBottom: 10,
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

              <TouchableOpacity
                style={{
                  backgroundColor: "#FA7A50",
                  height: 50,
                  marginTop: 10,
                  justifyContent: "center",
                  alignSelf:'center',
                  borderRadius: 10,
                  marginHorizontal: 25,
                  marginBottom: 30,
                  width: 200,
                }}
                onPress={() => navigateToSuggestList(bookCategory)}
              >
                <Text style={{
                  alignSelf: "center",
                  color: "#F6F2EA",
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
                  Suggestions
                </Text>
              </TouchableOpacity >

        </View>

           
        

        
        </KeyboardAwareScrollView>
    );
};

export default SignIn;