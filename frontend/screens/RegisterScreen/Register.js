import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const RegistrationForm = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  picker: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10
  },
  linkText: {
    marginTop: 10,
    color: "blue"
  }
});

export default RegistrationForm;
