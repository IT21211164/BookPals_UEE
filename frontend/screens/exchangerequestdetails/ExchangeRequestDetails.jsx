import React, { useState, useEffect } from 'react';
import { Text, Image, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles2 from "./exchangerequestdetails.style";
import axiosInstance from "../../api/axios";
import AcceptRejectConfirmationScreen from './AcceptRejectConfirmationScreen';

const ExchangeRequestDetails = () => {
    const navigation = useNavigation();

    const navigateToExchangeRequests = () => {
        navigation.navigate("ExchangeRequests");
    };
    
    const route = useRoute();

    const requestId = route.params.id;
    const [request, setRequest] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [btn, setBtn] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const [reqStatus, setReqStatus] = useState(route.params.status);


    //fetch request details
    const fetchRequestDetails = async () => {
        try {
          const response = await axiosInstance.get( `/exchangerequests/fetchRequestDetails/${requestId}`);
          if (response.data) {
            setRequest(response.data);
          }
          else{
            alert("error");
          }
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
        fetchRequestDetails();
    }, [requestId]);

    //update request details
    const updateStatus = async () => {
        try {
          const response = await axiosInstance.put( `/exchangerequests/updateStatus/${requestId}`,{reqStatus});
          if (response.data) {
            alert(reqStatus == "Accepted" ? "Exchange Request Accepted" : "Exchange Request Rejected");
          }
          else{
            alert("error");
          }
        } catch (error) {
          console.log(error);
        }
    };


    //handle confirmation screen
    const openModal = (btnname) => {
        setModalVisible(true);
        setBtn(btnname);
    
    };
  
    const closeModal = () => {
        setModalVisible(false);
    };
  
    const handleConfirm = () => {
        setReqStatus(btn);
        setUpdateForm(true);
        closeModal();
    };
    useEffect(() => {
        if (updateForm) {
            updateStatus();
            setUpdateForm(false); // Reset the flag
        }
    }, [updateForm]);


    return(
        <SafeAreaView style={styles2.screenContainer}>
            <View style={styles2.screenHeadingContainer}>
                <TouchableOpacity style={styles2.backBtn} onPress={navigateToExchangeRequests}>
                <Image
                    source={require("../../assets/icons/back.png")}
                    style={styles2.backIcon}
                />
                </TouchableOpacity>
                <Text style={styles2.screenHeading}>Request Content</Text>
                
            </View>
            <View style={styles2.statusBar} >
                <Text style={reqStatus == "Accepted" ? styles2.orderStatusAccept : reqStatus == "Rejected" ? styles2.orderStatusReject : ""}>
                            {reqStatus == "Request Sent" ? "": `Request  ${reqStatus}`}
                </Text>
            </View>

                <ScrollView>
                    {/*<Text style = {styles2.requestsheader}>Exchange Request for</Text>
                    <Text style = {styles2.requestedbook}>{request.selectedbookname}</Text>
                      <Image source={} style = {styles2.requestedbookimage}></Image>*/} 

                    <View style = {styles2.requestedbookcontainer}>
                        <Text style = {styles2.headerexchangebook}>Requested Book : </Text>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Book Title</Text>
                            <Text style = {styles2.requesterdetail}>{request.selectedbookname}</Text>
                        </View>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Author</Text>
                            <Text style = {styles2.requesterdetail}>{request.selectedbookauthor}</Text>
                        </View>
                    </View>

                    <View style = {styles2.requestercontainer}>
                        <Text style = {styles2.headerexchangebook}>Requester Details : </Text>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Full Name</Text>
                            <Text style = {styles2.requesterdetail}>{request.fullname}</Text>
                        </View>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Phone Number</Text>
                            <Text style = {styles2.requesterdetail}>{request.phone}</Text>
                        </View>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Address</Text>
                            <Text style = {styles2.requesterdetail}>{request.address}</Text>
                        </View>
                    </View>

                    <View style = {styles2.exchangebookcontainer}>
                        <Text style = {styles2.headerexchangebook}>Exchange Book : </Text>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Book Title</Text>
                            <Text style = {styles2.requesterdetail}>{request.title}</Text>
                        </View>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Author</Text>
                            <Text style = {styles2.requesterdetail}>{request.authorname}</Text>
                        </View>
                        <View style = {styles2.detailrow}>
                            <Text style = {styles2.label}>Condition</Text>
                            <Text style = {styles2.requesterdetail}>{request.condition}</Text>
                        </View>
                    </View>

                    {reqStatus == "Request Sent" ? 
                    <View style = {styles2.buttons}>
                        <TouchableOpacity  style = {styles2.btn} onPress={()=>openModal('Accepted')}>
                            <Text style = {styles2.btntext}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style = {styles2.btn} onPress={()=>openModal('Rejected')}>
                            <Text style = {styles2.btntext}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    ""
                    }
                    <AcceptRejectConfirmationScreen
                        isVisible={isModalVisible}
                        message={btn == "Accepted" ? "Are you sure you want to accept the request?" : "Are you sure you want to reject the request?"}
                        onCancel={closeModal}
                        onConfirm={handleConfirm}
                    />
    
                </ScrollView>
    
        </SafeAreaView>
    )
}

export default ExchangeRequestDetails;