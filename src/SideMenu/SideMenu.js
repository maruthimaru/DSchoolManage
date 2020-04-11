/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';

export default class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>Section 1</Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Page0')}>
                Home
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Page1')}>
                Driver
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>Section 2</Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Page2')}>
                Customer
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Page3')}>
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}
