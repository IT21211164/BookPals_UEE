import React from "react";
import {Text, TouchableOpacity} from "react-native";


const SignUpBtn =({ onPress }) => (

    

<TouchableOpacity 
        style = {{
            backgroundColor: "#FA7A50",
          height: 50,
          marginTop: 20,
          justifyContent: "center",
          alignSelf: 'center',
          borderRadius: 10,
          marginHorizontal: 25,
          marginBottom: 30,
          width: 200,
        }}
        onPress={onPress}
        >
            <Text style={{
            alignSelf: "center",
            color: "#F6F2EA",
            fontSize: 20,
            fontWeight: "bold",
          }}>
                Send Request
            </Text>
        </TouchableOpacity>

);
 export default SignUpBtn ;
