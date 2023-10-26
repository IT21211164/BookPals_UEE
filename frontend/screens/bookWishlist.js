import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState("null");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    getUserPreferences();
  }, []);

  const styles2 = StyleSheet.create({
    container: {
      backgroundColor: "#F6F1F1",
      marginTop: 10,
      borderRadius: 20,
      marginHorizontal: 30,
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
      marginBottom: 10,
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
      marginLeft: 75,
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
  });

  useEffect(() => {
    getWishlist();
  }, [userId]);


  const getWishlist = () => {
    axios.get(`http://192.168.1.27:3500/wishlist/read/${userId}`)
      .then((response) => {
        setWishlist(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  };

  const goToHomeScreen = () => {
    navigation.navigate("HomeScreenUser");
  };

  const handleDelete = (id) => {
    // Show a confirmation dialog
    Alert.alert(
      'Remove Item',
      'Are you sure you want to Remove this item from your wishlist?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            // Delete the item
            axios
              .delete(`http://192.168.1.27:3500/wishlist/delete/${id}`)
              .then(() => {
                // Remove the item from the local state
                setWishlist((prevWishlist) =>
                  prevWishlist.filter((item) => item._id !== id)
                );
              })
              .catch((error) => {
                console.error(error);
              });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{marginTop:-60}}>
      <View style={styles1.screenHeadingContainer}>
        <TouchableOpacity style={styles1.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../assets/icons/back.png")}
            style={styles1.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles1.screenHeading}>My Whishlist</Text>
      </View>
        
        {isLoading ? ( // Render loading indicator while isLoading is true
          <ActivityIndicator size="large" color="#FA7A50" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView style={{
            padding: 10
          }}>
            {wishlist.map((item) => (
              <TouchableOpacity key={item._id} onPress={() => handleDelete(item._id)}>
                <View style={styles2.notificationDetailsContainer}>
                  
                  <Image source={require("../assets/delete.png")}
                    style={{ width: 30, height: 20, position: 'absolute', top: 15, right: 15 }}
                  />
                  <Image source={require("../assets/bookWishlist.jpg")}
                    style={{ width: 80, height: 80 , borderRadius:5}}
                  />
                  <View style={{padding:15}}>
                  <Text style={styles1.container}>{item.BookName}</Text>
                  <Text style={styles.container}>{item.authorName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;
