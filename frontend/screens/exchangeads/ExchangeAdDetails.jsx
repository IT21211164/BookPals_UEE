import { Text, Image, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList,Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./createexchangead.style";
import { TextInput } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import EditRemoveConfirmationScreen from './EditRemoveConfirmationScreen';

import SpinnerInputCategory from "./formInputs/SpinnerInputCategory";
import SpinnerInputCondition from "./formInputs/SpinnerInputCondition";

const ExchangeAdDetails = () => {
    const navigation = useNavigation();

    const navigateToExchangeRequestDetails = () => {
        navigation.navigate("ExchangeRequestDetails");
    };

    const navigateToDisplayExchangeAds = () => {
        navigation.navigate("DisplayExchangeAds");
    };

    const goToDisplayExchangeAdsScreen = () => {
        navigation.navigate("DisplayExchangeAds");
    };


    const route = useRoute();

    const [id,setId]=useState(route.params.id);
    const [book_title,setTitle]=useState(route.params.title);
    const [category, setCategory] = useState(route.params.category);
    const [condition, setCondition] = useState(route.params.condition);
    const [image, setSelectedImage] = useState(route.params.image);
    const [description,setDes]=useState(route.params.des);
    const [terms_and_conditions, setTermsandconditions] = useState(route.params.termsandconditions);

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

    //update ad
    const updateFormHandler = async(e) => {

        axios.put(`http://192.168.8.100:3500/api/exchangead/updateAd/${id}`, {book_title, category, condition, image, description, terms_and_conditions})
        .then((res) => {
            if(res.data){
                alert('Book Exchange Ad updated')
              }
              else{
                alert('something went wrong') 
            }
        })
    
    }

    //delete ad
    const deleteHandler = async(e) => {

        axios.delete(`http://192.168.8.100:3500/api/exchangead/deleteAd/${id}`)
        .then((res) => {
            if(res.data){
                alert('Book Exchange Ad deleted');
                
              }
              else{
                alert('something went wrong') 
            }
        })
    
    }

    
    const [isModalVisible, setModalVisible] = useState(false);
    const [btn, setBtn] = useState("");


    const openModal = (btnname) => {
      setModalVisible(true);
      setBtn(btnname);
    
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const handleConfirm = async () => {

        if(btn == "edit"){
            updateFormHandler();
       
        }
        else if(btn == "remove"){       
            deleteHandler();
            navigateToDisplayExchangeAds();
        }
        closeModal();
  
    };




    return(
        <SafeAreaView style={styles.screenContainer}>

            <View style={styles.screenHeadingContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={goToDisplayExchangeAdsScreen}>
                <Image
                    source={require("../../assets/icons/back.png")}
                    style={styles.backIcon}
                />
                </TouchableOpacity>
                <Text style={styles.screenHeading}>Exchange Ad Details</Text>
                
            </View>

            <ScrollView keyboardShouldPersistTaps="always">

                    <View>

                        <View style = {{width:315, marginTop:20, alignSelf:"center"}}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Book Title</Text>
                            <TextInput style = {{width:315,borderWidth: 1, borderColor:"rgba(0, 0, 0, 0.15)", height : 50 , borderRadius: 10,padding:14, paddingLeft:21, backgroundColor:"rgba(0, 0, 0, 0.05)", marginTop:2 }} 
                            value={book_title}
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
                                <Image source={{ uri: image }} style = {styles.bookimage}></Image>
                            </View>
                        </View>
                        
                        <View style = {{width:315, marginTop:15, alignSelf:"center"}}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Book Description</Text>
                            <TextInput style = {{ borderWidth: 1, borderColor:"rgba(0, 0, 0, 0.15)", borderRadius: 10,padding:14, paddingLeft:21, backgroundColor:"rgba(0, 0, 0, 0.05)", marginTop:2 }} 
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical="top"
                            value={description}
                            onChangeText={(text) => setDes(text)}>       
                            </TextInput> 
                        </View>

                        <View style = {{width:315, marginTop:15, alignSelf:"center"}}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Terms and Conditions</Text>
                            <TextInput style = {{ borderWidth: 1, borderColor:"rgba(0, 0, 0, 0.15)", borderRadius: 10,padding:14, paddingLeft:21, backgroundColor:"rgba(0, 0, 0, 0.05)", marginTop:2 }} 
                            multiline={true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            value={terms_and_conditions}
                            onChangeText={(text) => setTermsandconditions(text)}>       
                            </TextInput> 
                        </View>

                
                        <View style = {styles.buttons}>
                            <TouchableOpacity  style = {styles.submitbtn} onPress={()=>openModal('edit')}>
                                <Text style = {styles.submitbtntext}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style = {styles.submitbtn} onPress={()=>openModal('remove')}>
                                <Text style = {styles.submitbtntext}>Remove</Text>
                            </TouchableOpacity>
                        </View>

                        <EditRemoveConfirmationScreen
                            isVisible={isModalVisible}
                            message={btn == "edit" ? "You are about to upload the exchange ad. Are you sure you want to proceed?" : "You are about to delete the exchange ad. Are you sure you want to proceed?"}
                            onCancel={closeModal}
                            onConfirm={handleConfirm}
                        />
                        
                    </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default ExchangeAdDetails;