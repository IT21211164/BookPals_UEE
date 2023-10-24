import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Wishlist() {
  return (
    <View style={styles.wishlistContainer}>
      <Text style={{ fontSize: 23, color: "black" }}>This is the wishlist</Text>
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

export default Wishlist;
