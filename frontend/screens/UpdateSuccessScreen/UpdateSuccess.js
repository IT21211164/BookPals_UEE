import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function UpdateSuccess() {
  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate("HomeScreenUser");
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.screenHeading}>Preference Changed!</Text>

      <Image
        source={require("../../assets/placeholders/preference-changed.png")}
        style={styles.placeholderImage}
      />

      <Text style={styles.phrase}>
        Thank you for updating your preferred book category. Your changes have
        been noted, and the new category selections will be applied the next
        time you log into the system. Enjoy a more personalized reading
        experience!
      </Text>
      <TouchableOpacity style={styles.navigateBtn} onPress={navigateToHome}>
        <Text style={styles.navBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingTop: 40,
    backgroundColor: "white"
  },

  navigateBtn: {
    width: 140,
    height: 45,
    backgroundColor: "#FA7A50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },

  navBtnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500"
  },

  screenHeading: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
    color: "#192A56"
  },

  placeholderImage: {
    width: "80%",
    height: 400,
    marginTop: 20
  },

  phrase: {
    width: "90%",
    fontSize: 16,
    color: "rgba(0,0,0,.4)",
    textAlign: "justify"
  }
});

export default UpdateSuccess;
