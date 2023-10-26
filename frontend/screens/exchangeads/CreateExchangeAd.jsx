import { Text, Image, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList,Button, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./createexchangead.style";
import { TextInput } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from "axios";

import SpinnerInputCategory from "./formInputs/SpinnerInputCategory";
import SpinnerInputCondition from "./formInputs/SpinnerInputCondition";

const CreateExchangeAd = () => {
    const navigation = useNavigation();

    const navigateToDisplayExchangeAds = () => {
        navigation.navigate("DisplayExchangeAds");
    };

    const goToHomeScreen = () => {
        navigation.navigate("HomeScreenAdmin");
    };

    const [title,setTitle]=useState("");
    const [des,setDes]=useState("");
    const [termsandconditions, setTermsandconditions] = useState("");
    const [category, setCategory] = useState("Romance");
    const [condition, setCondition] = useState("new");
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,

        });
        
    
        if (!result.canceled) {
            const imageUri = result.uri;
      
            // Read the image file and encode it as a base64 string
            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
      
            // Create a data URI with the appropriate MIME type
            const mimeType = `image/${imageUri.split('.').pop()}`;
            const dataURI = `data:${mimeType};base64,${base64Image}`;
      
            setSelectedImage(dataURI);
          }
    };

    const adFormHandler = async(e) => {
        e.preventDefault()
    
        console.log({title, category, condition, selectedImage, des, termsandconditions});
        axios.post("http://192.168.8.100:3500/api/exchangead/createAd", {title, category, condition, selectedImage, des, termsandconditions})
        .then((res) => {
            if(res.data){
                alert('Book Exchange Ad created')
              }
              else{
                alert('something went wrong') 
            }
        })
    
    }
    


    return(
        <SafeAreaView style={styles.screenContainer}>

            <View style={styles.screenHeadingContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={goToHomeScreen}>
                <Image
                    source={require("../../assets/icons/back.png")}
                    style={styles.backIcon}
                />
                </TouchableOpacity>
                <Text style={styles.screenHeading}>Publish Exchange Ad</Text>
                
            </View>
            <Text style={styles.subHeading}>Fill Exchange Ad Form</Text>

            <ScrollView keyboardShouldPersistTaps="always">
                <View>

                    <View style = {{width:315, marginTop:20, alignSelf:"center"}}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Book Title</Text>
                        <TextInput style = {{width:315,borderWidth: 1, borderColor:"rgba(0, 0, 0, 0.15)", height : 50 , borderRadius: 10,padding:14, paddingLeft:21, backgroundColor:"rgba(0, 0, 0, 0.05)", marginTop:2 }} 
                        value={title}
                        onChangeText={(text) => setTitle(text)}>       
                        </TextInput> 
                    </View>

                    <SpinnerInputCategory selectedValue={category} setSelectedValue={setCategory} style = {{height:60}}/>
                    <SpinnerInputCondition selectedValue={condition} setSelectedValue={setCondition}/>

                    <View style = {{width:315, marginTop:15, alignSelf:"center", flew:1}}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Book Cover Image</Text>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style = {styles.selectbtn} onPress={pickImage} >
                                <Text style = {styles.selectbtntext}>Select</Text>
                            </TouchableOpacity>
                            <Image source={{ uri: selectedImage }} style = {styles.bookimage}></Image>
                        </View>
                    </View>
                    
                    <View style = {{width:315, marginTop:15, alignSelf:"center"}}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Book Description</Text>
                        <TextInput style = {{ borderWidth: 1, borderColor:"rgba(0, 0, 0, 0.15)", borderRadius: 10,padding:14, paddingLeft:21, backgroundColor:"rgba(0, 0, 0, 0.05)", marginTop:2 }} 
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"
                        value={des}
                        onChangeText={(text) => setDes(text)}>       
                        </TextInput> 
                    </View>

                    <View style = {{width:315, marginTop:15, alignSelf:"center"}}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Terms and Conditions</Text>
                        <TextInput style = {{ borderWidth: 1, borderColor:"rgba(0, 0, 0, 0.15)", borderRadius: 10,padding:14, paddingLeft:21, backgroundColor:"rgba(0, 0, 0, 0.05)", marginTop:2 }} 
                        multiline={true}
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={termsandconditions}
                        onChangeText={(text) => setTermsandconditions(text)}>       
                        </TextInput> 
                    </View>

             
                    <TouchableOpacity  style = {styles.submitbtn} onPress={adFormHandler}>
                        <Text style = {styles.submitbtntext}>Submit</Text>
                    </TouchableOpacity>
                    
                 </View>
                 
            </ScrollView>

        </SafeAreaView>
    )
}

export default CreateExchangeAd;