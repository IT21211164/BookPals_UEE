import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  });

  const styles1 = StyleSheet.create({
    container: {
      fontSize: 20,
      fontWeight: '400',
      marginBottom: 10,
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

  const handleDelete = (id) => {
    // Show a confirmation dialog
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item from your wishlist?',
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
      <View>
        <Text style={{
          fontSize: 28,
          alignSelf: 'center',
          fontWeight: '500',
          marginBottom: 20,
        }}>Your Wishlist</Text>
        {isLoading ? ( // Render loading indicator while isLoading is true
          <ActivityIndicator size="large" color="#FA7A50" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView style={{
            padding: 10
          }}>
            {wishlist.map((item) => (
              <TouchableOpacity key={item._id} onPress={() => handleDelete(item._id)}>
                <View style={styles2.container}>
                  <Image source={require("../assets/delete.png")}
                    style={{ width: 30, height: 20, position: 'absolute', top: 15, right: 15 }}
                  />
                  <Text style={styles1.container}>{item.BookName}</Text>
                  <Text style={styles.container}>{item.authorName}</Text>
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
