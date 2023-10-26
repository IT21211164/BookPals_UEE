import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import axiosInstance from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Book from "../../components/Book";
import { useNavigation } from "@react-navigation/native";

function HomeContent() {
  const [bookData, setBookData] = useState([]);
  const [booksContentLoading, setBooksContentLoading] = useState(true);
  const [userId, setUserId] = useState("null");
  const [userRole, setuserRole] = useState("null");
  const [userName, setuserName] = useState("null");
  const [preferedCategory, setpreferedCategory] = useState("null");

  const [actionBooks, setActionBooks] = useState([]);
  const [awardWinning, setAwardWinning] = useState([]);
  const [scienceFiction, setScienceFiction] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState("");

  const navigation = useNavigation();

  const getUserPreferences = async () => {
    try {
      await AsyncStorage.getItem("user", async (err, savedUser) => {
        if (!err) {
          const currentUser = JSON.parse(savedUser);
          if (currentUser) {
            setUserId(currentUser.id);
            setuserRole(currentUser.role);
            setuserName(currentUser.username);
            setpreferedCategory(currentUser.category);
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

  const fetchBookData = async () => {
    try {
      const bookListResponse = await axiosInstance.get("/books/display-books");
      if (bookListResponse.data) {
        setBookData(bookListResponse.data);
        setBooksContentLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      console.log(error);
      setBooksContentLoading(false); // Make sure to set loading to false in case of an error
    }
  };

  useEffect(() => {
    getUserPreferences();
    fetchBookData();
  }, [userId, preferedCategory]);

  useEffect(() => {
    const recommended = bookData.filter(
      (book) => book.bookCategory === preferedCategory
    );
    const action = bookData.filter((book) => book.bookCategory === "Action");
    const fiction = bookData.filter(
      (book) => book.bookCategory === "Science Fiction"
    );
    const awarded = bookData.filter(
      (book) => book.bookCategory === "Award Winning"
    );

    setRecommendedBooks(recommended);
    setActionBooks(action);
    setAwardWinning(awarded);
    setScienceFiction(fiction);
  }, [bookData]);

  const searchBook = () => {
    console.log(searchPrompt);

    const searchResults = bookData.filter((book) => {
      return book.bookName
        .toString()
        .toLowerCase()
        .includes(searchPrompt.toString().toLowerCase());
    });

    navigation.navigate("SearchResults", { results: searchResults });
    setSearchPrompt("");
  };

  return (
    <View style={styles.homeContainer}>
      {/* search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter book name"
          style={styles.searchInputField}
          value={searchPrompt}
          onChangeText={(text) => setSearchPrompt(text)}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={() => searchBook()}>
          <Image
            style={styles.searchIcon}
            source={require("../../assets/icons/search-handle.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeadline}>Recommended For You</Text>
      <View style={styles.bookShelfContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ width: "100%", height: "100%" }}
        >
          {!booksContentLoading ? (
            recommendedBooks.map((item, index) => {
              const { _id } = item;
              return <Book key={_id} item={item} />;
            })
          ) : (
            <ActivityIndicator
              size="large"
              color="#FA7A50"
              style={{ marginLeft: 180 }}
            />
          )}
        </ScrollView>
      </View>

      <Text style={styles.subHeadline}>Award Winning</Text>
      <View style={styles.bookShelfContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ width: "100%", height: "100%" }}
        >
          {!booksContentLoading ? (
            awardWinning.map((item, index) => {
              const { _id } = item;
              return <Book key={_id} item={item} />;
            })
          ) : (
            <ActivityIndicator
              size="large"
              color="#FA7A50"
              style={{ marginLeft: 180 }}
            />
          )}
        </ScrollView>
      </View>

      <Text style={styles.subHeadline}>Action & Adventure</Text>
      <View style={styles.bookShelfContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ width: "100%", height: "100%" }}
        >
          {!booksContentLoading ? (
            actionBooks.map((item, index) => {
              const { _id } = item;
              return <Book key={_id} item={item} />;
            })
          ) : (
            <ActivityIndicator
              size="large"
              color="#FA7A50"
              style={{ marginLeft: 180 }}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 4
  },

  tempTextStyle: {
    fontSize: 23,
    padding: 20,
    width: "100%",
    marginTop: 20
  },

  bookShelfContainer: {
    padding: 10,
    width: "100%",
    height: 340
  },

  subHeadline: {
    fontSize: 20,
    margin: 5,
    fontWeight: "600",
    color: "#192A56"
  },

  searchContainer: {
    width: "100%",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  searchInputField: {
    width: "84%",
    padding: 6,
    paddingLeft: 14,
    fontSize: 18,
    color: "grey",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 6
  },

  searchBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 53,
    height: 53,
    borderRadius: 10,
    backgroundColor: "#FA7A50"
  },

  searchIcon: {
    width: 30,
    height: 30
  }
});

export default HomeContent;
