import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../api/axios";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(true);
  const navigation = useNavigation();

  const navScreen = (nav) => {
    console.log(`this is ${nav}`);
    if (nav === true) {
      navigation.navigate("HomeScreenUser");
    } else {
      navigation.navigate("HomeScreenAdmin");
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      try {
        const loginResponse = await axiosInstance.post("/login", {
          email,
          password
        });

        if (loginResponse.data) {
          const user = loginResponse.data;
          await AsyncStorage.setItem("user", JSON.stringify(user));

          // Wait for the AsyncStorage operation to complete
          await AsyncStorage.getItem("user", async (err, savedUser) => {
            if (!err) {
              const currentUser = JSON.parse(savedUser);

              if (currentUser.role === "user") {
                setIsUser(true);
                console.log(currentUser);
                navigation.navigate("HomeScreenUser");
              } else {
                setIsUser(false);
                console.log(currentUser);
                navigation.navigate("HomeScreenAdmin");
              }
            } else {
              // Handle AsyncStorage error
              console.log(err);
            }
          });
        }
      } catch (error) {
        Alert.alert(
          "User not found",
          "Please check the email and the password"
        );
        console.log("Error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appLogo}>"Book Pals"</Text>

      <Image
        source={require("../../assets/placeholders/login.png")}
        style={styles.placeholderImage}
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
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLogin()}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterForm")}>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            marginTop: 10,
            textDecorationLine: "underline"
          }}
        >
          Don't have an account?
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },

  appLogo: {
    fontSize: 44,
    letterSpacing: 5,
    marginBottom: 10,
    fontWeight: "600",
    color: "#FA7A50"
  },

  input: {
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
    fontSize: 16,
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
  },

  placeholderImage: {
    width: "80%",
    height: 300
  }
});

export default LoginForm;
