import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ThankYouScreen() {
  const navigation = useNavigation();
  const goToHomeScreenUser = () => {
    navigation.navigate("HomeScreenUser");
  };

  return (
    <View style={styles.thankYouScreenContainer}>
      <Text style={styles.screenHeadline}>Thank You!</Text>
      <Text style={styles.screenHeadline}>For Your Donation Interest!</Text>
      <Image
        source={require("../../assets/donation-related/ThankYouScreen.png")}
        style={styles.screenPlaceHolderImager}
      />
      <Text style={styles.phrase}>
        We appreciate your generosity! Your donation interest has been received.
        One of our dedicated agents will contact you within the next 2 working
        hours to discuss the details and arrange the collection of your donated
        books.
      </Text>

      <Text style={styles.phrasev2}>
        Thank you for making a positive impact on education and the community
        through your contribution.
      </Text>

      <TouchableOpacity style={styles.homeBtn} onPress={goToHomeScreenUser}>
        <Text style={styles.btnText}>Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  thankYouScreenContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  screenHeadline: {
    fontSize: 24,
    fontWeight: "500",
    color: "#192A56"
  },

  screenPlaceHolderImager: {
    width: 300,
    height: 300,
    marginTop: 20
  },

  homeBtn: {
    marginTop: 20,
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

  phrase: {
    marginTop: 20,
    width: "90%",
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
    textAlign: "justify"
  },

  phrasev2: {
    marginTop: 15,
    width: "90%",
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
    textAlign: "justify"
  }
});

export default ThankYouScreen;
