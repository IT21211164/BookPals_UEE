import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import axiosInstance from "../../api/axios";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userPreferedCategory, setUserPreferedCategory] = useState("Action");
  const [isUser, setIsUser] = useState(true);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (userName === "" || userName === " ") {
      return Toast.show({
        type: "error",
        text1: "Username Required!",
        text2: "You can not leave username empty!"
      });
    }

    if (email === "" || email === " ") {
      return Toast.show({
        type: "error",
        text1: "Email Required!",
        text2: "Valid email address required!"
      });
    }

    if (password.length < 8) {
      return Toast.show({
        type: "error",
        text1: "Password Strength Not Enough!",
        text2: "Password must contain minimum 8 charaters or letters!"
      });
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Password Mismatch!",
        text2: "Your password does not match with confirm password!"
      });
    }

    try {
      const registrationResponse = await axiosInstance.post("/register", {
        name: userName,
        email,
        password,
        category: userPreferedCategory
      });

      if (registrationResponse.data) {
        Toast.show({
          type: "success",
          text1: "Registration Success!",
          text2: "Your account created successfully!"
        });
        navigation.navigate("RegistrationSuccess");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Account could not be created! Try Again!"
      });
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/donation-related/registration.png")}
        style={styles.regPlaceholderImg}
      />

      <Text style={styles.loginLabel}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      <Text style={styles.loginLabel}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.loginLabel}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Text style={styles.loginLabel}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />

      <Text style={styles.loginLabel}>Prefered Book Category</Text>
      <View style={styles.textInputPicker}>
        <Picker
          style={{ width: "100%", color: "grey", fontSize: 18 }}
          selectedValue={userPreferedCategory}
          onValueChange={(itemValue) => setUserPreferedCategory(itemValue)}
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
        style={styles.loginButton}
        onPress={() => handleRegister()}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginForm")}>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            marginTop: 10,
            textDecorationLine: "underline"
          }}
        >
          Already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "white"
  },

  appLogo: {
    fontSize: 44,
    letterSpacing: 5,
    marginBottom: 30,
    fontWeight: "600",
    color: "#FA7A50"
  },

  input: {
    width: "80%",
    height: 50,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },

  regPlaceholderImg: {
    width: "80%",
    height: 200,
    marginTop: 10,
    marginBottom: 10
  },

  textInputPicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },

  loginLabel: {
    width: "80%",
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left"
  },

  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA7A50",
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500"
  }
});

export default RegisterForm;
