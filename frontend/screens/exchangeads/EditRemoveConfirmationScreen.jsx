import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles2 from "./createexchangead.style";


const EditRemoveConfirmationScreen = (props) => {
  const { isVisible, message, onCancel, onConfirm } = props;

  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
       }}>

        <View style={styles2.confirmationBox}>
          <Text style = {styles2.confirmtext}>{message}</Text>
          <View style = {styles2.confirmbuttons}>

            <TouchableOpacity onPress={onConfirm} style = {styles2.confirmbtn}>
              <Text style = {styles2.confirmbtntext}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style = {styles2.confirmbtn}>
              <Text style = {styles2.confirmbtntext}>No</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </Modal>
  );
};

export default EditRemoveConfirmationScreen;