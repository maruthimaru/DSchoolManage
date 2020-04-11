import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Actions} from 'react-native-router-flux';
import UserList from './UserList';
import {openDatabase} from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage';
var db = openDatabase({name: 'DSchool.db'});
var item;
export class CarUpdate extends Component {
  static navigationOptions = {
    title: 'Home',

    headerRight: <ActionBarImage />,

    headerStyle: {
      backgroundColor: '#4b964b',
    },

    headerTintColor: '#fff',
  };

  state = {
    list: [
      {name: 'raja'},
      {name: 'Sri'},
      {name: 'hari'},
      {name: 'Ram'},
      {name: 'Jp'},
    ],
    userName: '',
    number: '',
    id: 0,
    isLoading: true,
  };

  constructor(props) {
    super(props);
    // console.log('props');
    // console.log(props);

    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='car_reg'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS driver_reg', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS car_reg(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'user_name VARCHAR(225), number VARCHAR(225))',
              [],
            );
            console.log('table created');
          } else {
            console.log('already table created');
          }
        },
      );
    });
  }

  componentWillMount() {
    item = this.props.item;
    console.log('item');
    console.log(item);
    if (item != null) {
      console.log(item);
      this.setState({
        userName: item.user_name,
        number: item.number,
        id: item.id,
      });
    }
  }

  //insert
  insert = (user_name, number, id) => {
    console.log('username : ' + user_name + ' pass ' + number + ' id ' + id);
    db.transaction(function(tx) {
      tx.executeSql(
        "UPDATE car_reg set user_name = '" +
          user_name +
          "', number = '" +
          number +
          "' WHERE id=" +
          id,
        [],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Update Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => Actions.carList(),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  };

  render() {
    // console.log(this.state.data)

    return (
      <View style={styles.viewColor}>
        <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.viewColor}>
              <Text style={styles.textColor}> Car Registration </Text>

              <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Name"
                placeholderTextColor="#afafaf"
                value={this.state.userName}
                onChangeText={text => this.setState({userName: text})}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Register Number"
                placeholderTextColor="#afafaf"
                value={this.state.number}
                onChangeText={text => this.setState({number: text})}
              />

              {/* {
                this.state.data.map((item, index) => (
                  <TouchableOpacity
                     key = {item}
                     style = {styles.container}
                     onPress = {() =>  Alert.alert(item.message)}>
                     <Text style = {styles.text}>
                        {item.message}
                     </Text>
                  </TouchableOpacity>
               ))
               } */}

              <TouchableOpacity
                onPress={() =>
                  this.insert(
                    this.state.userName,
                    this.state.number,
                    this.state.id,
                  )
                }
                style={styles.button}>
                <Text style={styles.buttonStyle}>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewColor: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  textColor: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  textInputStyle: {
    margin: 20,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#439243',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  buttonStyle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5fc25f',
    height: 35,
    margin: 20,
    borderRadius: 10,
  },
  scrollView: {
    borderColor: '#FFFFFF',
  },
});

export default CarUpdate;
