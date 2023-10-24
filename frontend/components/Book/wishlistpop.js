// WishlistMessage.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet , Image} from 'react-native';

const WishlistMessage = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={{fontSize:20}}>{message}</Text>
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#FA7A50',
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal:30
  },
  closeButtonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});

export default WishlistMessage;
