import React, {Component} from 'react';
import sounds from '../../assets/soundsFile';
import './styles.js';
import Sound from 'react-native-sound';
import Video from 'react-native-video';
import {Button, Image, View, TouchableOpacity, Text} from 'react-native';
// import ReactHowler from 'react-howler';
// const Sound = require('react-native-sound').NativeModules.RNSound;
// Sound.setCategory('Playback');

class Sounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      stat: false,
      status: [],
      position: 0,
    };
    this.renderSound = this.renderSound.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleFinishedPlaying = this.handleFinishedPlaying.bind(this);
  }

  componentDidMount() {
    sounds.map(sound => {
      const tempArr = this.state.status;
      tempArr.push(false);
      this.setState({status: tempArr});
    });
  }

  handlePlaying(ev) {
    this.setState({position: ev.position});
  }

  handleFinishedPlaying() {
    this.setState({position: 0});
  }
  renderSound(id) {
    const wasPlaying = this.state.status[id];
    const tempArr = this.state.status;
    tempArr[id] = !wasPlaying;
    this.setState({status: tempArr});
  }

  render() {
    const soundRender = sounds.map(sound => {
      //   var soundfile = require(sound.sound);

      return (
        <View id={sound.i}>
          <Video
            playWhenInactive="true"
            playInBackground="true"
            id={sound.i}
            source={sound.sound}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            audioOnly
            paused={!this.state.status[sound.i]}
            repeat="true"
            reportBandwidth="true"
          />
          {/* <ReactHowler
            src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
            playing={this.state.status[sound.i]}
          /> */}
          {/* <Sound
            playing={this.state.status[sound.i]}
            src={soundfile}
            loop
          /> */}
          <TouchableOpacity
            onPress={() => {
              this.renderSound(sound.i);
            }}
            class="button">
            <Image
              style={{width: 50, height: 50, borderRadius: 10}}
              class="image"
              source={sound.image}
            />
          </TouchableOpacity>
        </View>
      );
    });
    return <View class="divStyle">{soundRender}</View>;
  }
}
export default Sounds;
