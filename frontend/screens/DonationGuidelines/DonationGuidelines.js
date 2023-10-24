import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function DonationGuidelines() {
  const navigation = useNavigation();
  const goToHomeScreen = () => {
    navigation.navigate("HomeScreenUser");
  };

  const goToDonationForm = () => {
    navigation.navigate("DonationForm");
  };

  return (
    <View style={styles.guidelinesContainer}>
      {/* screen heading container */}
      <View style={styles.screenHeadingContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../../assets/icons/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenHeading}>Donate Books</Text>
      </View>

      {/* image */}
      <Image
        source={require("../../assets/donation-related/donate-placeholder.png")}
        style={{ width: 230, height: 200, marginRight: 40, marginTop: 10 }}
      />

      <Text style={styles.guidePhrase}>
        Thank you for considering a donation to support students in need. Your
        generosity is greatly appreciated. Before proceeding, please take a
        moment to review our donation guidelines
      </Text>

      <Text style={styles.guidePharasePrompt}>Item Quality:</Text>
      <Text style={styles.guidePhrase}>
        We kindly request that all donated items be in good, usable condition.
        High-quality items ensure the greatest impact on the students we aim to
        assist.
      </Text>

      <Text style={styles.guidePharasePrompt}>Accepted Items:</Text>
      <Text style={styles.guidePhrase}>
        We accept donations of stationary items and educational books only. Our
        commitment to providing valuable resources to students means we
        carefully curate the content of donated items.
      </Text>

      <Text style={styles.guidePharasePrompt}>Donation Submission:</Text>
      <Text style={styles.guidePhrase}>
        Once you've expressed your interest in donating, one of our dedicated
        agents will reach out to you within 2 working hours to assist you
        further. Your support means a lot to us, and we want to ensure a
        seamless donation process.
      </Text>

      <TouchableOpacity style={styles.nextBtn} onPress={goToDonationForm}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  guidelinesContainer: {
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

  screenHeadingContainer: {
    width: "100%",
    padding: "10",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  backBtn: {
    padding: 8
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

  nextBtn: {
    marginTop: 10,
    width: 160,
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
  }
});

export default DonationGuidelines;
