import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

function DonationDetails() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [acceptanceStatus, setAcceptanceStatus] = useState("Rejected");

  const acceptedMessage =
    "Your donation request has been accepted! our agent will reach you to collect the items. Thank you for your patience.";
  const rejectedMessage =
    "Your donation request has not been approved at this time. Our team has carefully considered the suitability of the items for our students.";

  const openConfirmation = () => {
    setPopupOpen(true);
  };

  const navigation = useNavigation();
  const route = useRoute();

  const donorDetails = route.params.passedData;
  const {
    _id,
    donorId,
    donorName,
    donorPhone,
    donorAddress,
    donationItemCategory,
    donatingItem,
    donationStatus
  } = donorDetails;

  const updateDonationStatus = async () => {
    try {
      donationStatusResponse = await axiosInstance.put(
        `/donations/update-donation-status/${_id}`,
        { donationStatus: acceptanceStatus }
      );
      if (donationStatusResponse) {
        setPopupOpen(false);
        dispatchNotification();
        navigation.navigate("DonorsList");
      }
    } catch (error) {
      console.log(error);
      console.log("error while updating donation status");
      setPopupOpen(false);
    }
  };

  const dispatchNotification = async () => {
    try {
      notificationResponse = await axiosInstance.post(
        `/notifications/create-notification`,
        {
          senderName: "Admin Department",
          senderRole: "Content-Curator",
          message:
            acceptanceStatus === "Accepted" ? acceptedMessage : rejectedMessage,
          receiverId: donorId,
          receiverRole: "user"
        }
      );
      Toast.show({
        type: "success",
        text1: "Notification Dispatched!",
        text2: "A notification sent to the donor!"
      });
      console.log({
        senderName: "Admin Department",
        senderRole: "Content-Curator",
        message:
          acceptanceStatus === "Accepted" ? acceptedMessage : rejectedMessage,
        receiverId: donorId,
        receiverRole: "user"
      });
    } catch (error) {
      console.log(error);
      console.log("error while sending notification");
      setPopupOpen(false);
    }
  };

  const goback = () => {
    navigation.navigate("DonorsList");
  };

  const rejectDonation = () => {
    setAcceptanceStatus("Rejected");
    openConfirmation();
  };

  const acceptDonation = () => {
    setAcceptanceStatus("Accepted");
    openConfirmation();
  };

  return (
    <View style={styles.donationDetailsContainer}>
      {/* screen heading container */}
      <View style={styles.screenHeadingContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={goback}>
          <Image
            source={require("../../assets/icons/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenHeading}>Donation Info</Text>
      </View>

      {/* form headline */}
      <Text
        style={{
          width: "100%",
          color: "#FA7A50",
          textAlign: "left",
          fontSize: 22,
          fontWeight: "500",
          paddingLeft: 10,
          margin: 10
        }}
      >
        Donation Interest Detailed View
      </Text>

      {/* displaying donors name */}
      <Text style={styles.donationFormLabel}>Donor's Name</Text>
      <Text style={styles.textInput}>{donorName}</Text>

      {/* displaying donors phone number */}
      <Text style={styles.donationFormLabel}>Donor's Phone</Text>
      <Text style={styles.textInput}>{donorPhone}</Text>

      {/* displaying donors address */}
      <Text style={styles.donationFormLabel}>Donor's Address</Text>
      <Text style={styles.textArea}>{donorAddress}</Text>

      {/* displaying donating item category */}
      <Text style={styles.donationFormLabel}>Donating Item Category</Text>
      <Text style={styles.textInput}>{donationItemCategory}</Text>

      {/* displaying donating items */}
      <Text style={styles.donationFormLabel}>Donating Item List</Text>
      <Text style={styles.textArea}>{donatingItem}</Text>

      {/* displaying the status */}
      <Text style={styles.donationFormLabel}>Donation Request Status</Text>
      <Text
        style={
          donationStatus === "Rejected"
            ? {
                backgroundColor: "crimson",
                width: "100%",
                textAlign: "center",
                padding: 10,
                color: "white",
                fontSize: 19,
                marginTop: 10
              }
            : donationStatus === "Accepted"
            ? {
                backgroundColor: "green",
                width: "100%",
                textAlign: "center",
                padding: 10,
                color: "white",
                fontSize: 19,
                marginTop: 10
              }
            : {
                backgroundColor: "grey",
                width: "100%",
                display: "flex",
                textAlign: "center",
                padding: 10,
                color: "white",
                fontSize: 19,
                marginTop: 10
              }
        }
      >
        {donationStatus}
      </Text>
      <View style={styles.acceptanceBtnContainer}>
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={() => acceptDonation()}
        >
          <Text style={styles.btnText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => rejectDonation()}
        >
          <Text style={styles.btnText}>Reject</Text>
        </TouchableOpacity>
      </View>

      {/* popup container and other related things */}
      {popupOpen && (
        <View style={styles.popupContainer}>
          <View style={styles.popupMessageContainer}>
            <Text style={styles.popupTitle}>Confirmation</Text>
            <Text style={styles.popupMessage}>
              You are about to submit the donation interest form. Please review
              your details one last time to ensure accuracy. Are you sure you
              want to proceed?
            </Text>
            <View style={styles.popupBtnContainer}>
              {/* close popup */}
              <TouchableOpacity
                onPress={() => setPopupOpen(false)}
                style={styles.popupCancel}
              >
                <Text style={styles.btnTextv2}>Cancel</Text>
              </TouchableOpacity>
              {/* submit the form */}
              <TouchableOpacity
                onPress={() => updateDonationStatus()}
                style={styles.popupSubmit}
              >
                <Text style={styles.btnTextv2}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  acceptanceBtnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 25
  },

  popupContainer: {
    position: "absolute",
    width: "100%",
    height: 900,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  popupMessageContainer: {
    width: 360,
    height: 190,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "white"
  },

  popupBtnContainer: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },

  popupTitle: {
    color: "#192A56",
    fontSize: 20,
    fontWeight: "600"
  },

  popupMessage: {
    marginTop: 6,
    width: "97%",
    fontSize: 15,
    textAlign: "justify",
    color: "rgba(0,0,0,0.6)"
  },

  popupCancel: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingBottom: 4,
    backgroundColor: "#192A56",
    borderRadius: 5,
    marginRight: 10
  },

  popupSubmit: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingBottom: 4,
    backgroundColor: "#FA7A50",
    borderRadius: 5,
    marginLeft: 10
  },

  donationDetailsContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  screenHeadingContainer: {
    width: "100%",
    padding: "10",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  donationFormLabel: {
    width: "100%",
    textAlign: "left",
    fontSize: 15,
    marginBottom: 7,
    paddingLeft: 10,
    fontSize: 16,
    color: "#192A56"
  },

  textInput: {
    width: "95%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 8
  },

  textInputPicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 8
  },

  dropDownStyle: {
    width: "95%",
    height: 50,
    borderColor: "gray",
    borderWidth: 4,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 8
  },

  textArea: {
    width: "95%",
    height: 90,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 8
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
    marginLeft: 63,
    fontSize: 24,
    fontWeight: "600",
    color: "#192A56"
  },

  guidePharasePrompt: {
    marginTop: 8,
    fontSize: 19,
    fontWeight: "500",
    width: "100%",
    color: "#192A56"
  },

  guidePhrase: {
    marginTop: 2,
    fontSize: 16,
    width: "100%",
    textAlign: "justify",
    color: "rgba(0,0,0,0.7)"
  },

  submitBtn: {
    marginTop: 10,
    width: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingBottom: 4,
    backgroundColor: "#FA7A50",
    borderRadius: 5
  },

  btnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500"
  },

  btnTextv2: {
    fontSize: 18,
    color: "white"
  },

  acceptBtn: {
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA7A50",
    padding: 10,
    borderRadius: 8
  },

  rejectBtn: {
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#192A56",
    padding: 10,
    borderRadius: 8
  }
});

export default DonationDetails;
