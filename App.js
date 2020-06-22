/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground,
  Button,
} from 'react-native';
import Home from './Components/home';
import Sounds from './Components/sounds';
import Volumes from './Components/volumes';
import background from './assets/image.png';
import volumes from './assets/volumes.jpg';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  getVisibility = visibility => {
    this.setState({isVisible: visibility});
  };

  getSound = (itemz, item, activeSounds) => {
    this.setState({item, itemz, activeSounds});
  };
  pauseSound = key => {
    this.setState(key);
  };
  render() {
    return (
      <ImageBackground
        source={background}
        style={{
          opacity: 1,
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundImage: {background},
            height: Dimensions.get('window').height,
          }}>
          <View
            style={{
              top: '0%',
              height: '30%',
              width: Dimensions.get('window').width,
            }}>
            <View
              style={{
                flexDirection: 'row-reverse',
                height: Dimensions.get('window').height,
                top: '31%',
              }}>
              <View
                style={{
                  bottom: '0.2%',
                  height: '70%',
                  width: '100%',
                  borderBottomColor: 'rgba(255,255,255,0.5)',
                }}>
                <Sounds key={this.state.key} getSound={this.getSound} />
              </View>
              <View
                style={{
                  opacity: 0.5,
                  borderRightWidth: 3,
                  borderColor: 'rgba(255,255,255,0.5)',
                  height: '70%',
                  top: '0%',
                  right: '4.7%',
                  width: '10%',
                }}>
                <Text>here</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgb(73, 133, 255)',
              top: '56%',
              left: '10%',
              width: '80%',
              height: '10%',
              borderRadius: 10,
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                top: '0%',
                left: '90%',
                width: '10%',
                height: '40%',
              }}>
              <Button
                title=""
                onPress={() => {
                  this.setState({isVisible: !this.state.isVisible});
                }}
              />
            </View>
            {this.state.isVisible && (
              <Volumes
                activeSounds={this.state.activeSounds}
                item={this.state.item}
                itemz={this.state.itemz}
                getVisibility={this.getVisibility}
                isVisible={this.state.isVisible}
                pauseSound={this.pauseSound}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
