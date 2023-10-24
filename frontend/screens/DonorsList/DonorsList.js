import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { format } from "date-fns";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function DonorsList() {
  const [donorsList, setDonorsList] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const fetchInterestedDonors = async () => {
    try {
      const donorListResponse = await axiosInstance.get(
        "/donations/display-donations"
      );
      if (donorListResponse.data) {
        setDonorsList(donorListResponse.data);
        setDataIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();
  const goToHomeScreen = () => {
    navigation.navigate("HomeScreenAdmin");
  };

  useEffect(() => {
    fetchInterestedDonors();
  }, []);

  const passDonorDetails = (data) => {
    navigation.navigate("DonationDetails", { passedData: data });
  };

  return (
    <View style={styles.donorsListContainer}>
      {/* screen heading container */}
      <View style={styles.screenHeadingContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../../assets/icons/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenHeading}>Interested Donors List</Text>
      </View>

      {/* scroll container for intersted donors */}
      <ScrollView
        style={styles.donorListContainer}
        contentContainerStyle={styles.donorListScrollContainer}
      >
        {dataIsLoading ? (
          <ActivityIndicator
            size="large"
            color="#FA7A50"
            style={{ marginTop: 300 }}
          />
        ) : (
          donorsList.map((donor) => {
            const { _id, createdAt, donorName, donationItemCategory } = donor;
            return (
              <View key={_id} style={styles.donationDetailsContainer}>
                <Image
                  source={require("../../assets/profiles/dummy-profile.png")}
                  style={styles.donorProfilePic}
                />
                <View style={styles.donorInfoContainer}>
                  <Text style={styles.donorName}>{donorName}</Text>
                  <Text style={styles.donationItemCategory}>
                    Category: {donationItemCategory}
                  </Text>
                  <Text style={styles.receivedDate}>
                    {format(new Date(createdAt), "MMMM dd, yyyy")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.viewDetailsBtn}
                  onPress={() => passDonorDetails(donor)}
                >
                  <Image
                    source={require("../../assets/icons/view-details.png")}
                    style={styles.viewMoreIcon}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  donorsListContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: 40,
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
    marginLeft: 25,
    fontSize: 24,
    fontWeight: "600",
    color: "#192A56"
  },

  donorListContainer: {
    width: "100%",
    height: 700,
    padding: 10
  },

  donorListScrollContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  donationDetailsContainer: {
    marginBottom: 15,
    height: 100,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  donorInfoContainer: {
    width: "64%"
  },

  donationItemCategory: {
    fontSize: 16,
    marginTop: 1
  },

  receivedDate: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 1,
    color: "rgba(0,0,0,.6)"
  },

  donorProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FA7A50",
    marginRight: 20,
    marginLeft: 6
  },

  viewMoreIcon: {
    width: 25,
    height: 25
  },

  viewDetailsBtn: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },

  donorName: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize"
  }
});

export default DonorsList;
