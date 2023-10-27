import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import NoResults from "../../components/NoResults";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SearchResults() {
  const navigation = useNavigation();
  const route = useRoute();

  const results = route.params.results;
  const [userId, setUserId] = useState("null");
  const [userRole, setuserRole] = useState("null");
  const [userName, setuserName] = useState("null");
  const [preferedCategory, setpreferedCategory] = useState("null");

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

  useEffect(() => {
    getUserPreferences();
  }, []);

  const navigateToHome = () => {
    if (userRole === "content-curator") {
      navigation.navigate("HomeScreenAdmin");
    } else {
      navigation.navigate("HomeScreenUser");
    }
  };

  return (
    <View style={styles.searchResultContainer}>
      <View style={styles.screenHeadingContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigateToHome()}
        >
          <Image
            source={require("../../assets/icons/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenHeading}>Search Results</Text>
      </View>

      {/* search results */}
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", height: 600, padding: 10 }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          {results.map((book) => {
            const {
              _id,
              bookName,
              bookAuthor,
              bookRating,
              bookCategory,
              bookImage,
              bookSynopsis,
              bookDescription
            } = book;
            return (
              <View key={book._id} style={styles.searchResultBookContainer}>
                <Image source={{ uri: bookImage }} style={styles.bookImage} />
                <View style={styles.bookInfo}>
                  <Text style={styles.bookname}>{bookName}</Text>
                  <Text style={styles.bookauthor}>{bookAuthor}</Text>
                  <Image
                    style={styles.ratings}
                    source={
                      bookRating === 5
                        ? require("../../assets/ratings/five-star-rating.png")
                        : bookRating === 4
                        ? require("../../assets/ratings/four-star-rating.png")
                        : bookRating === 3
                        ? require("../../assets/ratings/three-star-rating.png")
                        : bookRating === 2
                        ? require("../../assets/ratings/two-star-rating.png")
                        : require("../../assets/ratings/one-star-rating.png")
                    }
                  />
                  <Text style={styles.bookSummary}>
                    {bookSynopsis.substr(0, 200)}...
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <NoResults />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchResultContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 4,
    backgroundColor: "white",
    paddingTop: 30
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
    marginLeft: 55,
    fontSize: 24,
    fontWeight: "600",
    color: "#192A56"
  },

  searchResultBookContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "rgba(0,0,0,.06)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },

  bookInfo: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "60%",
    paddingLeft: 10
  },

  bookImage: {
    width: 140,
    height: 210,
    borderRadius: 5
  },

  bookname: {
    fontSize: 20,
    color: "rgba(0,0,0,0.7)",
    fontWeight: "600"
  },

  bookauthor: {
    fontSize: 16,
    color: "rgba(0,0,0,0.4)"
  },

  ratings: {
    height: 15,
    width: 85,
    marginTop: 4
  },

  bookSummary: {
    marginTop: 10,
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
    width: "100%",
    textAlign: "justify"
  }
});

export default SearchResults;
