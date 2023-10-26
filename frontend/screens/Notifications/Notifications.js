import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../api/axios";
import { format } from "date-fns";

function Notifications() {
  const [userId, setUserId] = useState("null");
  const [userRole, setuserRole] = useState("null");
  const [userName, setuserName] = useState("null");
  const [preferedCategory, setpreferedCategory] = useState("null");
  const [notificationsList, setNotificationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserPreferences = async () => {
    try {
      await AsyncStorage.getItem("user", async (err, savedUser) => {
        if (!err) {
          const currentUser = JSON.parse(savedUser);
          if (currentUser) {
            setUserId(currentUser.id);
            setuserRole(currentUser.role);
            setuserName(currentUser.username);
            setpreferedCategory(currentUser.category);
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

  const getAllNotifications = async () => {
    try {
      const notificationsResponse = await axiosInstance.get(
        `/notifications/display-notifications-by-id/${userId}`
      );
      if (notificationsResponse) {
        setNotificationsList(notificationsResponse.data);
        setIsLoading(false);
      }
    } catch (error) {
      setError("Notifications could not be fetched. Please try again.");
      console.log("Notifications can not be fetched");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPreferences();
  }, []);

  useEffect(() => {
    getAllNotifications();
  }, [userId]);

  return (
    <View style={styles.notificationContainer}>
      <Text style={{ fontSize: 23, color: "#192A56", fontWeight: "600" }}>
        Notifications
      </Text>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#FA7A50"
          style={{ marginTop: 20 }}
        />
      ) : error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <ScrollView
          contentContainerStyle={styles.notificationsScrollContainer}
          style={{ width: "100%", height: 700, paddingTop: 10 }}
        >
          {notificationsList.map((notification) => {
            const { _id, message, createdAt } = notification;
            return (
              <View key={_id} style={styles.notificationDetailsContainer}>
                <Image
                  source={require("../../assets/donation-related/notification.png")}
                  style={styles.messagePic}
                />
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationContent}>{message}</Text>
                  <Text style={styles.receivedDate}>
                    {format(new Date(createdAt), "MMMM dd, yyyy")}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },

  notificationsScrollContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: "100%"
  },

  notificationTextContainer: {
    flex: 1
  },

  notificationDetailsContainer: {
    marginBottom: 15,
    paddingRight: 10,
    height: 120,
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

  receivedDate: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 1,
    color: "rgba(0,0,0,.6)"
  },

  messagePic: {
    width: 82,
    height: 80,
    marginRight: 20
  },

  notificationContent: {
    fontSize: 14,
    textAlign: "justify"
  }
});

export default Notifications;
