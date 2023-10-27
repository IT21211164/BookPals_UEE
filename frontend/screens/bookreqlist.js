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
    getUserPreferences();
  }, []);

  useEffect(() => {
    getWishlist();
  }, [userId]);

  const getWishlist = () => {
    axios.get(`http://192.168.8.117:3500/bookreqlist/read/${userId}`)
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
      <View>
        <Text style={{
          fontSize: 28,
          alignSelf: 'center',
          fontWeight: '500',
          marginBottom: 20
        }}>Requests</Text>
        {isLoading ? ( // Render loading indicator while isLoading is true
          <ActivityIndicator size="large" color="#FA7A50" style={{ marginTop: 20 }} />
        ) : (
          <FlatList style={{ padding: 10 }}
            data={wishlist}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles2.container} onPress={() => navigateToBookInfoForm(item._id)}>
                <Text style={styles1.container}>{item.BookName}</Text>
                <Text style={styles.container}>{item.authorName}</Text>
                <Text style={styles.container}>{item.status}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;
