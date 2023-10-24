import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

const RequestBtn = ({ onPress }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSecondButtonPress = () => {
    // Toggle the visibility of the message when the second button is pressed
    setShowMessage(!showMessage);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#FA7A50",
          height: 50,
          marginTop: 10,
          justifyContent: "center",
          borderRadius: 10,
          marginHorizontal: 25,
          marginBottom: 30,
          width: 200,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#F6F2EA",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          REQUEST
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#FA7A50",
          height: 50,
          marginTop: 10,
          justifyContent: "center",
          borderRadius: 10,
          marginHorizontal: 25,
          marginBottom: 30,
          width: 100,
        }}
        onPress={handleSecondButtonPress}
      >
        <Image
          source={require("../../assets/wishlist.png")}
          style={{ width: 50, marginVertical: 30, alignSelf: "center" }}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>

      {showMessage && (
        <Text style={{ fontSize: 18, marginVertical: 10, color: "green" }}>
          Message displayed when the second button is clicked.
        </Text>
      )}
    </View>
  );
};

export default RequestBtn;
