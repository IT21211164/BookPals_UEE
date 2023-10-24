import React from "react";
import {View , Image , Text} from "react-native";


const BookImage = () => (
    <View style = {{
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Image source={require("../../assets/bookImage1.jpg")}
        style = {{width : 280 , height: 300, marginVertical: 20 , borderRadius:15}}
        resizeMode="contain"
        ></Image>
    </View>
);

export default BookImage;