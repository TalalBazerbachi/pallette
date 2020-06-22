import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Sounds from '../sounds';
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Sounds />
      </View>
    );
  }
}
export default Home;
