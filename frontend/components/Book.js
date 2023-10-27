import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function Book({ item }) {
  const { bookName, bookImage, bookAuthor, bookRating, _id } = item;

  const navigation = useNavigation();
  const navigateToBookInfoForm = () => {
    navigation.navigate("BookInfo", { id: _id });
  };

  return (
    <TouchableOpacity onPress={() => navigateToBookInfoForm({ _id })}>
      <View style={styles.bookInfoContainer}>
        <Image style={styles.bookImage} source={{ uri: bookImage }}></Image>
        <Text style={styles.bookname}>
          {bookName.toString().substr(0, 15)}...
        </Text>
        <Text>{bookAuthor}</Text>
        <Image
          style={styles.ratings}
          source={
            bookRating === 5
              ? require("../assets/ratings/five-star-rating.png")
              : bookRating === 4
              ? require("../assets/ratings/four-star-rating.png")
              : bookRating === 3
              ? require("../assets/ratings/three-star-rating.png")
              : bookRating === 2
              ? require("../assets/ratings/two-star-rating.png")
              : require("../assets/ratings/one-star-rating.png")
          }
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 10
  },

  bookImage: {
    width: 160,
    height: 240,
    borderRadius: 9
  },

  bookname: {
    fontSize: 18,
    fontWeight: "600"
  },

  ratings: {
    height: 15,
    width: 85
  }
});

export default Book;
