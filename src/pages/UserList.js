import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,TouchableOpacity,ActivityIndicator,
FlatList,SafeAreaView, ScrollView,BackHandler} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux'

export class UserList extends Component {
  state ={   
      list:[
           {name:"raja"},
           {name:"Sri"},
           {name:"hari"},
           {name:"Ram"},
           {name:"Jp"}, 
       ],
       userName: '',
       password: '',
       backHandler:'',
       isLoading: true
       }

      //  handleBackPress(backHandler){
      //    console.log("backHandler :" +backHandler);
      //    Actions.userList(onBack=()=>

      //    )
    // return true; 
      //  }

  componentDidMount(){
//     var back=BackHandler.addEventListener('hardwareBackPress', this.handleBackPress(this.state.backHandler));
//     this.setState({
// backHandler:back
//     })
      
       var url="https://developer.scoto.in/react/api/Login/list"
      console.log("url "+url)
      return fetch(url)

    .then((response) => response.json())
    .then((responseJson) => {
         Alert.alert(responseJson.message)
         
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          // dataSource: responseJson.data,
          },function() {
            
          });
        
        // console.log(responseJson.data)
        // this.props.navigation.navigate('UserList')

    })
    .catch((error) => {
      console.error(error);
    });
   }

   fileUpload(){
Actions.documentUpload()
   }

    render() {

      if (this.state.isLoading) {
  return(
  <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>

  )
}
        return (
              <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View>
    
    <TouchableOpacity 
    style={styles.button}
    onPress={()=>this.fileUpload() }>
      <Text>Move to file Upload</Text>
    </TouchableOpacity>

        {this.state.dataSource.map((item, index) => (
              <TouchableOpacity
              style = {styles.listStyle}
                key = {item}
                onPress = {() =>  Alert.alert(item.message)}>
                <View style = {styles.container}>
                <Text style = {styles.text}>
                    {item.message}
                </Text>
                <Text style = {styles.textDate}>
                    {item.datetime}
                </Text>
                </View>
              </TouchableOpacity>
          ))
        }

  {/* <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => 
                <Text>{item.message}</Text>
                }
                keyExtractor={({id}, index) => id}
              /> */}

            </View>
                     </ScrollView>  
          </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
viewColor:{
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#500077",
    flex:1
},
textColor:{
    fontSize:25,
    textAlign:"center",
    color:"#FFFFFF"
},
textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#FFFFFF",
    borderColor:"#dbdbdb",
    borderWidth:0.5,
    
},
buttonStyle:{

    fontSize:25,
    textAlign:"center",
    color:"#000",
    borderWidth:0,
    borderColor:"#FFFFFF"
},
 button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    margin:20,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container:{
    backgroundColor: Colors.lighter,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
paddingLeft:5,
paddingRight:5,
  },
  textDate:{
     textAlign:"right",
  },

listStyle:{
    backgroundColor: Colors.lighter,
    shadowColor: "#d0d0d0",
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 2,
margin:3,
  },
});

export default UserList
