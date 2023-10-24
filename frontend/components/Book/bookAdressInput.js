import React from "react";
import { Text , View , TextInput  } from "react-native";


const UserInputs = ({name , value , setValue , secureTextEntry = false }) => {

    return (

        <View style = {{marginHorizontal:24}}>
            <Text style={{ fontSize: 18, fontWeight: "500" , color: "#898484" }} >{name}</Text>
            <TextInput
            secureTextEntry = {secureTextEntry}
            style = {{borderWidth: 0.5 , height : 100 , borderRadius: 10 , marginBottom: 15 , backgroundColor:'#F7F7F7' , borderColor: '#ADC4CE' , textAlignVertical: "top"}} 

            value={value}
            onChangeText={(text) => setValue(text)}> 
            
            </TextInput>
            
        </View>
        
    );
};

export default UserInputs;