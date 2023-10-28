import { Text, Image, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { useFocusEffect } from '@react-navigation/native';
import styles1 from "./exchangerequests.style";

const ExchangeRequests = () => {
    const navigation = useNavigation();

    const navigateToExchangeRequestDetails = (id,status) => {
        navigation.navigate("ExchangeRequestDetails",{id,status});
    };

    const goToHomeScreen = () => {
        navigation.navigate("HomeScreenAdmin");
    };


    const [requestsList, setRequestsList] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState(null);

    //filter out orders by status
    const filteredOrders = filterCriteria
    ? requestsList.filter(order => order.status === filterCriteria)
    : requestsList;



    const fetchAllRequests = async () => {
        try {
          const response = await axiosInstance.get(
            "/exchangerequests/fetchAllRequests"
          );
          if (response.data) {
            setRequestsList(response.data);

          }
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        fetchAllRequests();
    }, []);

    //reload the page again
    useFocusEffect(
        React.useCallback(() => {
          fetchAllRequests();
        }, [])
    );



    return(
        <SafeAreaView style={styles1.screenContainer}>
            <View style={styles1.screenHeadingContainer}>
                <TouchableOpacity style={styles1.backBtn} onPress={goToHomeScreen}>
                <Image
                    source={require("../../assets/icons/back.png")}
                    style={styles1.backIcon}
                />
                </TouchableOpacity>
                <Text style={styles1.screenHeading}>Exchange Requests</Text>
                
            </View>

            <View style={{flexDirection: 'row', marginHorizontal:15}}>
                <TouchableOpacity style={styles1.column} onPress={()=>setFilterCriteria(null)}>
                    <Text style={styles1.columntext}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles1.column} onPress={()=>setFilterCriteria('Request Sent')}>
                    <Text style={styles1.columntext}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles1.column} onPress={()=>setFilterCriteria('Accepted')}>
                    <Text style={styles1.columntext}>Accepted</Text>   
                </TouchableOpacity>
                <TouchableOpacity style={styles1.column} onPress={()=>setFilterCriteria('Rejected')}> 
                    <Text style={styles1.columntext}>Rejected</Text>
                </TouchableOpacity>
            </View>
                <View style = {{marginBottom:110}}>
                    <FlatList 
                            data={filteredOrders}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (

                    <TouchableOpacity style = {styles1.requestbox} onPress={()=>navigateToExchangeRequestDetails(item._id, item.status)}>
                        <Image source={require("../../assets/user.png")}
                        style = {styles1.requestImage}
                        ></Image>

                        <View>
                            <Text style = {styles1.requestname}>{item.fullname}</Text>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{marginRight:15}}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                                <Text>{new Date(item.createdAt).toLocaleTimeString()}</Text>
                            </View>
                            <Text style = {item.status == "Accepted" ? styles1.statusacceptreq : item.status == "Rejected" ? styles1.statusrejectreq : styles1.statusnewreq}>
                                {item.status == "Request Sent" ? "New Request" : item.status}
                            </Text>

                        </View>
                    </TouchableOpacity>

                    )}
                    />  
                </View>
        

        </SafeAreaView>
    )
}

export default ExchangeRequests;