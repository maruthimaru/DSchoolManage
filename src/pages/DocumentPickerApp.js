import React, { Component } from 'react'
import { StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,Image, } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
export class DocumentPickerApp extends Component { 

    state = {
      singleFile: '',
      multipleFile: [],
    };


//single file upload
    async selectOneFile() {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      var singleJson=JSON.stringify(res)
      console.log('singleJson : ' + singleJson);
      //Setting the state to show single file attributes
      this.setState({ singleFile: res,
      singleFileJson:singleJson, });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

   async selectMultipleFile() {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      this.setState({ multipleFile: results });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  uploadFile(singleFileJson){
    
       var url="https://developer.scoto.in/react/api/Login/upload"
      console.log(" url "+url)
      console.log("Single file " + singleFileJson + " url "+url)
      return fetch(url,{
        method:'POST',
        headers:{
          Authorization:'YWRtaW46MTIzNDU='
        },
        body: singleFileJson
      })
    .then((response) => response.json())
    .then((responseJson) => {
         Alert.alert(responseJson.message)
        
        console.log( "response "+responseJson +" status "+responseJson.status+" message " +responseJson.message) 
        // console.log(responseJson.data)
        // this.props.navigation.navigate('UserList')

    })
    .catch((error) => {
      console.error(error);
    });
  }

    render() {
        return (
            <View>
                 <TouchableOpacity
          activeOpacity = {0.5}
          style         = {styles.buttonStyle}
          onPress       = {this.selectOneFile.bind(this)}>
          {/*Single file selection button*/}
          <Text style = {{ marginRight: 10, fontSize: 19 }}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style = {styles.imageIconStyle}
          />
        </TouchableOpacity>

         {/*Showing the data of selected Single file*/}
        <Text style = {styles.textStyle}>
          File Name: {' '}
          {this.state.singleFile.name ? this.state.singleFile.name : ''}
          {'\n'}
          Type: {this.state.singleFile.type ? this.state.singleFile.type : ''}
          {'\n'}
          File Size: {' '}
          {this.state.singleFile.size ? this.state.singleFile.size : ''}
          {'\n'}
          URI: {this.state.singleFile.uri ? this.state.singleFile.uri : ''}
          {'\n'}
        </Text>
        <View style = {{ backgroundColor: 'grey', height: 2, margin: 10 }} />

         {/*To multiple single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={this.selectMultipleFile.bind(this)}>
          {/*Multiple files selection button*/}
          <Text style={{ marginRight: 10, fontSize: 19 }}>
            Click here to pick multiple files
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        <ScrollView>
          {/*Showing the data of selected Multiple files*/}
          {this.state.multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
            </View>
          ))}
        </ScrollView>

           <TouchableOpacity style={styles.buttonStyle} 
           onPress={()=> this.uploadFile(this.state.singleFileJson)}>
          
          <Text>
            Upload Single File
          </Text>

           </TouchableOpacity>
          </View>
        
        )
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex           : 1,
    backgroundColor: '#fff',
    padding        : 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize       : 15,
    marginTop      : 16,
    color          : 'black',
  },
  buttonStyle: {
    alignItems     : 'center',
    flexDirection  : 'row',
    backgroundColor: '#DDDDDD',
    padding        : 5,
  },
  imageIconStyle: {
    height    : 20,
    width     : 20,
    resizeMode: 'stretch',
  },
});

export default DocumentPickerApp
