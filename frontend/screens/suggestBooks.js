import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button, SafeAreaView, StyleSheet ,Image ,TouchableOpacity } from "react-native";
import Book from "../components/Book"; // Import your Book component
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const BooksByCategory = ({ route }) => {
  const { bookCategory } = route.params;
  const [books, setBooks] = useState([]);
  const [key, setKey] = useState(1); // Add a key state

  const navigation = useNavigation();

  useEffect(() => {
    // Make an API request to fetch books by category
    axios
      .get(`http://192.168.8.159:3500/bookpals/books/display-books/${bookCategory}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [bookCategory]);

  // Function to toggle the key
  const toggleKey = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const goToHomeScreen = () => {
    navigation.navigate("HomeScreenUser");
  };

  return (
    <SafeAreaView style={styles.container}>

<View style={styles1.screenHeadingContainer}>
        <TouchableOpacity style={styles1.backBtn} onPress={goToHomeScreen}>
          <Image
            source={require("../assets/icons/back.png")}
            style={styles1.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles1.screenHeading}>You May Like</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Book item={item} />
          </View>
        )}
        numColumns={2}
        key={key} // Change the key to force a fresh render
      />
      <Button title="Toggle Key" onPress={toggleKey} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  listContainer: {
    alignItems: "center", // Center the content horizontally
    marginHorizontal: 30,
    marginTop: 25,
    marginLeft: 45,
  },
  itemContainer: {
    marginBottom: 20, // Add margin at the bottom of each item
    margin:10
  },
});

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
    marginLeft: 65,
    fontSize: 24,
    fontWeight: "600",
    color: "#192A56",
    alignSelf:'center'
  },

});

export default BooksByCategory;
