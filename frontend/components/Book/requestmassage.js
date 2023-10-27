// RequestMessage.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity , Image} from 'react-native';

const RequestMessage = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Image source={require("../../assets/requestsend.gif")}
        style = {{width : 100 , height: 150, alignSelf: 'center'}}
        ></Image>
          <Text>{message}</Text>
          
        </View>
      </View>
    </Modal>
  );
};

export default RequestMessage;
