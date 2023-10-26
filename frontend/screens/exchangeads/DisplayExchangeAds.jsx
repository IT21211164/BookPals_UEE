import { Text, Image, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList,Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./createexchangead.style";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';


const DisplayExchangeAds = () => {
    const navigation = useNavigation();

    const navigateToExchangeAdDetails = (id, title ,category, condition ,image, des, termsandconditions) => {
        navigation.navigate("ExchangeAdDetails",{id, title ,category, condition ,image, des, termsandconditions});
    };

    const goToHomeScreen = () => {
        navigation.navigate("HomeScreenAdmin");
    };

    const [details,setDetails]=useState([]);

    function getExchangeAds(){
        axios.get("http://192.168.8.100:3500/api/exchangead/displayAds").then((res)=>{
        setDetails(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getExchangeAds();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
          getExchangeAds();
        }, [])
    );




    return(
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.screenHeadingContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={goToHomeScreen}>
                <Image
                    source={require("../../assets/icons/back.png")}
                    style={styles.backIcon}
                />
                </TouchableOpacity>
                <Text style={styles.screenHeading}>Exchange Ad Details</Text>
                
            </View>

            <View style={styles.adsList}>
                <View style={{ marginBottom:200 }}>
                <FlatList 
                        data={details}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (

                    <View style = {styles.adbox}>

                        <Image source={{ uri: item.image }} style = {styles.adimage}></Image>
                        <View style = {styles.addetailsbox}>
                            <View style = {{height:95}}> 
                                <Text style = {styles.adbooktitle}>{item.book_title}</Text>
                                <Text style = {styles.adbookcategory}>({item.category})</Text>
                            </View>
                            <TouchableOpacity style = {styles.viewbtn} onPress={()=>navigateToExchangeAdDetails(item._id,item.book_title, item.category, item.condition, item.image, item.description, item.terms_and_conditions)}>
                                <Text style = {{fontWeight:"500", fontSize:16}}>View</Text>
                            </TouchableOpacity>
                        </View>
        
                    </View>
                )}
                />  
                </View>
                 
            </View>

        </SafeAreaView>
    )
}

export default DisplayExchangeAds;