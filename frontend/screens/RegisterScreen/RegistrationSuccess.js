import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function RegistrationSuccess() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Account Creation Success!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("LoginForm")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50
  }
});

export default RegistrationSuccess;
