import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity,StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const SpinnerInputCategory = ({selectedValue,setSelectedValue}) => {
  
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

  const options = ['New', 'Very Good', 'Good', 'Fair', 'Poor'];

  return (
    <View style={styles.fullcontainer}>
        <Text style={styles.label}>Book Condition</Text>
        <View style={styles.container}>
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={{ width: 300 }}
        >
            {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
            ))}
        </Picker>

        
        </View>
    </View>
  );
};

export default SpinnerInputCategory;