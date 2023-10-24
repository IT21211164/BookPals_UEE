import React , {useState , useEffect} from "react";
import { Text, View , ScrollView} from "react-native";
import UserInputs from "../components/Book/bookInputs";
import UserInputs1 from "../components/Book/bookAdressInput";
import SignUpBtn from "../components/Book/bookSubmitBtn";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import RequestMsg from '../components/Book/requestmassage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({navigation}) => {
    const [fullname , setFullName] = useState("");
    const [phone , setPhone] = useState("");
    const [address , setAddress] = useState("");
    const [title , setTitle] = useState("");
    const [authorname , setAuthorName] = useState("");
    const [condition , setCondition] = useState("");
    const [loading , setLoading] = useState(false);
    const [requestMessageVisible, setRequestMessageVisible] = useState(false);

    //console.log("NAVIGATION ->", navigation);

    const route = useRoute({ route });
    const { bookName} = route.params;
    const { bookAuthor } = route.params;

    const [userId, setUserId] = useState("null");
    
  
    const getUserPreferences = async () => {
      try {
        await AsyncStorage.getItem("user", async (err, savedUser) => {
          if (!err) {
            const currentUser = JSON.parse(savedUser);
            if (currentUser) {
              setUserId(currentUser.id);
              
            }
          } else {
            // Handle AsyncStorage error
            console.log(err);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getUserPreferences();
    }, []);


    const newRequest = async () => {
      try {
        const requestData = {
          userId : userId,
          fullname, 
          phone, 
          address, 
          title,
          authorname,
          condition,
          status : "Request Sent",
          selectedbookname : bookName,
          selectedbookauthor : bookAuthor
        };
  
        const response = await fetch('http://192.168.1.27:3500/bookrequest/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
          
        });

        const reqlistData = {
          userID : userId,
          BookName: bookName,
          authorName: bookAuthor,
          status: "Request Sent"
        };
  
        const reqlistResponse = await fetch('http://192.168.1.27:3500/bookreqlist/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqlistData),
        });
  
        if (response.status === 201) {
          setRequestMessageVisible(true);
          setTimeout(() => {
            setRequestMessageVisible(false);
            navigation.navigate("SuccessScreen"); // Replace "OtherPage" with the actual page name you want to navigate to
          }, 5000);

        } else {
          
          console.log('Error adding order:', response.status);
          
        }
      } catch (error) {
        console.error('Error adding order:', error);
       
      }
    };


    return (
        <KeyboardAwareScrollView contentContainerStyle ={{flex : 1 , justifyContent : "center" , backgroundColor:'#FFF'}}>
            
            <Text style={{fontSize:28 , fontWeight:'500' , alignSelf:'center'}}>
                Request Book
            </Text>
            <Text>{bookName}</Text>
            <Text>{bookAuthor}</Text>
            <Text>{userId}</Text>
            <Text style={{
            
            color: "#FA7A50",
            fontSize: 22,
            fontWeight: "bold",
            marginLeft : 23,
            marginTop:15,
            marginBottom:15
          }}>
                Details
            </Text>

        < UserInputs name = "Full Name*" value = {fullname} setValue = {setFullName} />
        < UserInputs name = "Phone Number*" value = {phone} setValue = {setPhone}  />
        < UserInputs1 name = "Address*" value = {address} setValue = {setAddress} style={{height : 8}}/>
        < UserInputs name = "Your exchange book title*" value = {title} setValue = {setTitle}  />
        < UserInputs name = "Author's name*" value = {authorname} setValue = {setAuthorName} />
        < UserInputs name = "Condition*" value = {condition} setValue = {setCondition} />

        
            <SignUpBtn onPress={newRequest}/>
            <RequestMsg
        visible={requestMessageVisible}
        message="Your request has been sent successfully."
        onClose={() => setRequestMessageVisible(false)}
      />
        
        </KeyboardAwareScrollView>
    );
};

export default SignIn;