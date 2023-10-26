import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity,StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const SpinnerInputCondition = ({selectedValue,setSelectedValue}) => {

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',    
        backgroundColor:"rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        borderColor:"rgba(0, 0, 0, 0.15)",
        marginTop:2,   
        height:50,
        borderRadius:10
    },
    fullcontainer:{
      width:315,
      alignSelf:"center",
      marginTop:15
    },
    label:{
      fontSize:16,
      fontWeight:"500",

    }
});

  const options = ['Romance', 'Adventure', 'Fiction', 'Educational', 'Humor', 'Fantacy', 'Historical Fiction', 'Short Stories'];

  return (
    <View style={styles.fullcontainer}>
      <Text style={styles.label}>Book Category</Text>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={{ width: 300,fontSize:8 }}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} style={{ fontSize:15, padding:0 }}/>
          ))}
        </Picker>

      
      </View>
    </View>
  );
};

export default SpinnerInputCondition;
