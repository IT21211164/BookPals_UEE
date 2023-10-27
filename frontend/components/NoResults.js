import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function NoResults() {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.screenHeading}>No Results Found!</Text>

      <Image
        source={require("../assets/placeholders/no-results.png")}
        style={styles.placeholderImage}
      />

      <Text style={styles.phrase}>
        Looks like the book you are looking for is not in our libraries. We will
        add this book soon!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResultsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50
  },

  screenHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#192A56"
  },

  placeholderImage: {
    width: "80%",
    height: 400
  },

  phrase: {
    marginTop: 20,
    width: "90%",
    textAlign: "center",
    fontSize: 20,
    color: "rgba(0,0,0,.4)"
  }
});

export default NoResults;
