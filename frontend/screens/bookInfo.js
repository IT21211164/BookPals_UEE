import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import BookImage from '../components/Book/BookImage';
import Wishlistpop from '../components/Book/wishlistpop';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles1 = StyleSheet.create({
  container: {
    backgroundColor: '#F6F2EA',
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "grey",
    marginHorizontal:5
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
    fontSize: 24,
    fontWeight: "600",
    color: "#192A56",
    alignSelf:'center'
  },

});

const BookPage = ( { route } ) => {
  
  const [showMessage, setShowMessage] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [bookData, setBookData] = useState(null);
  const { id } = route.params;

  console.log('Received id:', id);

  const [userId, setUserId] = useState("null");
    
  
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

  const handleSecondButtonPress = () => {
    // Toggle the visibility of the message when the second button is pressed
    setShowMessage(!showMessage);
    if (!showMessage) {
      setWishlistMessage('Book added to the wish list');
  
      // Make a POST request to add the book to the wishlist
      axios.post('http://192.168.1.27:3500/wishlist/create', {
        userID : userId,
        BookName: bookData.bookName,
        authorName: bookData.bookAuthor,
      })
      .then((response) => {
        console.log('Book added to wishlist:', response.data);
      })
      .catch((error) => {
        console.error('Error adding book to wishlist:', error);
      });
    }
  };

  useEffect(() => {
    getBookDetails(id);
  }, [id]);

  useEffect(() => {
    getUserPreferences();
  }, []);

  const getBookDetails = (bookid) => {
    axios
      .get(`http://192.168.1.27:3500/bookpals/books/display-book/${bookid}`)
      .then((res) => {
        setBookData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!bookData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const navigation = useNavigation();

    const navigateToRequestForm = (bookName , bookAuthor,bookCategory
      ) => {
        navigation.navigate("RequestForm" , {bookName , bookAuthor , bookCategory
        });
      };

      const goToHomeScreen = () => {
        navigation.navigate("HomeScreenUser");
      };

  return (
    <SafeAreaView style={{
      backgroundColor: '#FFF'
    }}>

<View style={styles1.screenHeadingContainer}>
        <TouchableOpacity style={styles1.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../assets/icons/back.png")}
            style={styles1.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles1.screenHeading}>Book Info</Text>
      </View>   

<View style = {{
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Image source={{ uri: bookData.bookImage }}
        style = {{width : 280 , height: 300, marginVertical: 20 , borderRadius:15}}
        resizeMode="contain"
        ></Image>
    </View>
      
        
          <View style={styles1.container}>
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold'
            }}>
              {bookData.bookName}
            </Text>
            <Text style={{
              fontSize: 18,
              fontStyle: 'italic',
              fontWeight: 'light'
            }}>{bookData.bookAuthor}</Text>
           
            <Text style={{
              marginTop: 15,
              fontSize: 23
            }}>Description </Text>
            <ScrollView style={{ marginBottom: 10, maxHeight: 190, marginTop: 10 }}>
              <Text style={{
                marginTop: 10,
                fontSize: 18,
              }}>{bookData.bookDescription}</Text>
            </ScrollView>

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
                onPress={() => navigateToRequestForm(bookData.bookName, bookData.bookAuthor , bookData.bookCategory)}

              >
                <Text style={{
                  alignSelf: "center",
                  color: "#F6F2EA",
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
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
                  source={require("../assets/wishlist.png")}
                  style={{ width: 50, marginVertical: 30, alignSelf: "center" }}
                  resizeMode="contain"
                ></Image>
              </TouchableOpacity>
            </View>

            <Wishlistpop
              visible={showMessage}
              message={wishlistMessage}
              onClose={() => setShowMessage(false)}
            />

          </View>

        
      
    </SafeAreaView>
  );
};

export default BookPage;
