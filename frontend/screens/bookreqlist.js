import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState("null");
  const [isLoading, setIsLoading] = useState(true);

  console.log(userId)

  const getUserPreferences = async () => {
    try {
      await AsyncStorage.getItem("user", async (err, savedUser) => {
        if (!err) {
          const currentUser = JSON.parse(savedUser);
          if (currentUser) {
            setUserId(currentUser.id);
          }
        } else {
          // Handle AsyncStorage error
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToBookInfoForm = (id) => {
    navigation.navigate("BookInfo", { id });
  };

  const styles2 = StyleSheet.create({
    container: {
      backgroundColor: "#F6F1F1",
      marginTop: 10,
      borderRadius: 20,
      marginHorizontal: 30,
      height: 100,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },

    notificationDetailsContainer: {
      marginBottom: 15,
      paddingRight: 10,
      height: 100,
      marginHorizontal:15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "grey",
      backgroundColor: "#F6F2EA",
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  });

  const styles1 = StyleSheet.create({
    container: {
      fontSize: 20,
      fontWeight: '400',
      
    },

    screenHeadingContainer: {
      width: "100%",
      padding: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start"
    },
  
    backBtn: {
      width: 50,
      height: 50,
      marginLeft: 10,
      padding: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
  
    backIcon: {
      width: 32,
      height: 32
    },
  
    screenHeading: {
      marginLeft: 95,
      fontSize: 28,
      fontWeight: "600",
      color: "#192A56",
      alignSelf:'center'
    },
  });

  const styles = StyleSheet.create({
    container: {
      fontSize: 18,
      fontWeight: '200',
      marginBottom: 10,
      fontStyle: 'italic',
    },

    status: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      color:'rgba(0,0,0,.6)'
    },



  });

  useEffect(() => {
    getUserPreferences();
  }, []);

  useEffect(() => {
    getWishlist();
  }, [userId]);

  const goToHomeScreen = () => {
    navigation.navigate("HomeScreenUser");
  };

  const getWishlist = () => {
    axios.get(`http://192.168.1.27:3500/bookreqlist/read/${userId}`)
      .then((response) => {
        setWishlist(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles1.screenHeadingContainer}>
        <TouchableOpacity style={styles1.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../assets/icons/back.png")}
            style={styles1.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles1.screenHeading}>Requests</Text>
      </View>
      <View>
        
        {isLoading ? ( // Render loading indicator while isLoading is true
          <ActivityIndicator size="large" color="#FA7A50" style={{ marginTop: 20 }} />
        ) : (
          <FlatList style={{ padding: 10 }}
            data={wishlist}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles2.notificationDetailsContainer} onPress={() => navigateToBookInfoForm(item._id)}>
                <Image source={require("../assets/bookList.png")}
                    style={{ width: 100, height: 130 , borderRadius:5}}
                  />
                <View style={{padding:5}}>
                <Text style={styles1.container}>{item.BookName}</Text>
                <Text style={styles.container}>{item.authorName}</Text>
                <Text style={styles.status}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;
