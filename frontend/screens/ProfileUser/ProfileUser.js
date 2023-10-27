import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axiosInstance from "../../api/axios";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

function ProfileUser() {
  const [userId, setUserId] = useState("null");
  const [userRole, setuserRole] = useState("null");
  const [userName, setuserName] = useState("null");
  const [preferedCategory, setpreferedCategory] = useState("null");
  const [bookCategory, setBookCategory] = useState("Action");

  const navigation = useNavigation();

  const navigateUpdateSuccess = () => {
    navigation.navigate("UpdateSuccess");
  };

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

  useEffect(() => {
    getUserPreferences();
  }, []);

  const updatePreferedCategory = async () => {
    try {
      operationResponse = await axiosInstance.put(
        `/change-pref-book-category/${userId}`,
        { bookCategory }
      );
      if (operationResponse) {
        Toast.show({
          type: "error",
          text1: "Prefered Category Changed!",
          text2: `Prefered category changed to ${bookCategory}!`
        });
        navigateUpdateSuccess();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Change unsuccessfull!",
        text2: `Changes can not be made!`
      });
      console.log(error);
      console.log("error while updating donation status");
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.userInfoContainer}>
        <Image
          source={require("../../assets/profiles/dummy-profile.png")}
          style={styles.userProfilePhoto}
        />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userRole}>Registered {userRole}</Text>
        <Text style={styles.userRole}>"{preferedCategory}" Enthusiast 🔥</Text>

        <Text style={styles.subheading}>Update Prefered Book Category</Text>
        <Text style={styles.categoryInfo}>
          If you are looking to explore a new book category, now you can set it
          as your prefered book category! You can simply select your prefered
          book category from dropdon below then click the "change" button.
        </Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
          }}
        >
          <View style={styles.textInputPicker}>
            <Picker
              style={{ width: "100%", color: "grey", fontSize: 18 }}
              selectedValue={bookCategory}
              onValueChange={(itemValue) => setBookCategory(itemValue)}
            >
              <Picker.Item label="Action" value="Action" />
              <Picker.Item label="Romance" value="Romance" />
              <Picker.Item label="Horror" value="Horror" />
              <Picker.Item label="Motivation" value="Motivation" />
              <Picker.Item label="Historical" value="Historical" />
              <Picker.Item label="Science Fiction" value="Science Fiction" />
              <Picker.Item label="Non Fiction" value="Non Fiction" />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => updatePreferedCategory()}
          >
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white"
  },

  userInfoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  userName: {
    width: 220,
    fontSize: 25,
    color: "#192A56",
    fontWeight: "600",
    textAlign: "center"
  },

  userRole: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(0,0,0,0.6)",
    textTransform: "capitalize",
    textAlign: "center"
  },

  userProfilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#192A56",
    borderWidth: 4
  },

  textInputPicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    height: 45,
    fontSize: 19,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10
  },

  loginLabel: {
    width: "80%",
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left"
  },

  subheading: {
    width: "100%",
    textAlign: "left",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#192A56"
  },

  categoryInfo: {
    color: "rgba(0,0,0,.6)",
    textAlign: "justify"
  },

  changeBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    width: 100,
    height: 45,
    backgroundColor: "#FA7A50",
    borderRadius: 4
  },

  changeBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500"
  }
});

export default ProfileUser;
