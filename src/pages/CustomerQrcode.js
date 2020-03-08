import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-qr-code';

export default class CustomerQrcode extends Component {

    constructor(props) {
        super(props)
    console.log("qrvalue : " +props.customerId);
    
        this.state = {
             qrvalue:props.customerId
        }
    }
    

    render() {
        return (
             <View style={styles.container}>
                {/* <Text> textInComponent </Text> */}
                 <QRCode
          value={this.state.qrvalue}
          size={200}
          bgColor='black'
          fgColor='white'/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
  
});
