import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ProfileUser() {
  return (
    <View style={styles.wishlistContainer}>
      <Text style={{ fontSize: 23, color: "black" }}>
        This is the user profile screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wishlistContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProfileUser;
