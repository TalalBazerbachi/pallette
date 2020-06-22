/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
// import volumes from '../../assets/volumes.jpg';
// import Sound from 'react-native-sound';
import Slider from 'react-native-slider';
// import background from '../../assets/image.png';
import closeBUtton from '../../assets/xButton.png';
// import sounds from '../../assets/soundsFile';

const VolumeList = ({sound, item}) => {
  return (
    <View
      style={{
        left: '5%',
        borderRadius: 15,
        backgroundColor: 'white',
        width: '90%',
        height: 70,
        marginBottom: 35,
      }}>
      <View style={{width: 60, height: 60, left: '3%', bottom: '20%'}}>
        <Image
          style={{
            borderColor: 'white',
            alignContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderRadius: 10,
            width: 'auto',
            height: 'auto',
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            shadowColor: 'blue',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 1,
            shadowRadius: 21,
          }}
          source={item.image}
        />
      </View>
      <Text style={{fontSize: 15, bottom: '70%', left: '25%'}}>
        {item.title}
      </Text>
      <Slider
        thumbStyle={{width: 10, height: 10}}
        thumbTintColor="#FF3C8F"
        value={sound._volume}
        style={{
          left: '25%',
          width: 100,
          bottom: '60%',
          height: 10,
        }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#ACAAB8"
        maximumTrackTintColor="rgba(172, 170, 184,0.32)"
        onValueChange={value => {
          sound.setVolume(value);
        }}
        onSlidingComplete={value => {
          sound.setVolume(value);
        }}
      />
      <TouchableOpacity
        style={{bottom: 72, left: '85%'}}
        onPress={() => {
          this.props.pauseSound(sound._key);
        }}>
        <Image source={closeBUtton} style={{height: 40, width: 40}} />
      </TouchableOpacity>
    </View>
  );
};

export default class Volumes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      activeSounds: [],
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: '40%',
        }}>
        <Modal
          propagateSwipe
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({isVisible: false})}
          onSwipeComplete={() => this.setState({isVisible: false})}
          swipeDirection={'down'}>
          <View
            style={{
              borderRadius: 15,
              top: '10%',
              height: '85%',
              alignSelf: 'center',
              backgroundColor: 'rgba(22, 5, 60,0.8)',
              width: Dimensions.get('window').width,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 18,
                paddingBottom: 12,
              }}>
              <View
                style={{
                  height: 7,
                  width: 52,
                  backgroundColor: '#D8D8D8',
                  borderRadius: 3.5,
                }}
              />
            </View>
            <View
              style={{
                height: '60%',
                top: '3%',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255,255,255,0.5)',
              }}>
              <ScrollView>
                <TouchableOpacity activeOpacity={1}>
                  <View style={{padding: 15}} />
                  {this.props.activeSounds &&
                    this.props.activeSounds.map(snd => {
                      const index = this.props.activeSounds.indexOf(snd);
                      const item = this.props.itemz[index];
                      return <VolumeList sound={snd} item={item} />;
                    })}
                </TouchableOpacity>
              </ScrollView>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'rgb(73, 133, 255)',
                  top: 25,
                  height: 50,
                  width: 130,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  Remove All
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
