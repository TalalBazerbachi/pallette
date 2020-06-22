import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SectionGrid} from 'react-native-super-grid';
import soundfile from '../../assets/soundsFile';
import Sound from 'react-native-sound';
const Button = ({title, image, onPress}) => {
  <TouchableOpacity onPress={onPress}>
    <View>
      <Image source={image} />
      <Text style={styles.button}>{title}</Text>
    </View>
  </TouchableOpacity>;
};
const Header = ({children, style}) => (
  <Text style={[styles.header, style]}>{children}</Text>
);

const Feature = ({title, onPress, image, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Header style={{flex: 1}}>{title}</Header>
    {/* {status ? <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text> : null} */}
    <Button title={buttonLabel} onPress={onPress} image={image} />
  </View>
);

var sounds = [];
var activeSounds = [];
const itemz = [];
const fillitems = () => {
  const tempArr = [];
  soundfile.map(snd => {
    const file = {
      id: snd.i,
      title: snd.name,
      section: snd.section,
      image: snd.image,
      isRequire: true,
      url: snd.sound,
      basePath: Sound.MAIN_BUNDLE,
      onPrepared: (sound, component) => {
        sound.setNumberOfLoops(-1);
        //component.setState({loopingSound: sound});
      },
    };
    const callback = (error, sound) => {
      if (error) {
        Alert.alert('error', error.message);
        return;
      }
      // Run optional pre-play callback
      file.onPrepared && file.onPrepared(sound);
    };
    const sound = new Sound(file.url, error => callback(error, sound));
    sounds.push(sound);
    tempArr.push(file);
  });
  return tempArr;
};
const items = fillitems();

// const sections = {[
//   {title: 'section 1', data: items},
//   {title: 'section 2', data: items},
// ]};

function setTestState(testInfo, component, status) {
  component.setState({
    tests: {...component.state.tests, [testInfo.title]: status},
  });
}

function playSound(testInfo, component, playing) {
  setTestState(testInfo, component, 'pending');

  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(testInfo, component, 'fail');
      return;
    }
    setTestState(testInfo, component, 'playing');
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound));
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error =>
      callback(error, sound),
    );
  }
}

export default class Sounds extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback'); // true = mixWithOthers
    this.state = {
      playing: false,
      loopingSound: undefined,
      tests: {},
      soundstatus: [],
    };
  }
  componentDidMount() {
    const tempArr = this.state.soundstatus;
    sounds.map(() => {
      tempArr.push(false);
      this.setState({soundstatus: tempArr});
    });
    // if(this.state.props.key){

    // }
  }
  // Special case for stopping
  stopSoundLooped() {
    if (!this.state.loopingSound) {
      return;
    }
    this.state.loopingSound.stop().release();
    this.setState({
      loopingSound: null,
      tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'},
    });
  }

  render() {
    const sections = [
      {
        title: 'Title1',
        data: items,
      },
      {
        title: 'Title2',
        data: items,
      },
      {
        title: 'Title3',
        data: items,
      },
    ];

    return (
      <SectionGrid
        itemDimension={50}
        // staticDimension={400}
        fixed
        spacing={50}
        sections={sections}
        style={styles.gridView}
        renderItem={({item, section, index}) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => {
                const tempArr = this.state.soundstatus;
                const plyng = !this.state.soundstatus[item.id];
                tempArr[item.id] = plyng;
                this.setState({soundstatus: tempArr});
                this.state.soundstatus[item.id]
                  ? sounds[item.id].play()
                  : sounds[item.id].pause();
                if (this.state.soundstatus[item.id]) {
                  if (!activeSounds.includes(sounds[item.id])) {
                    activeSounds.push(sounds[item.id]);
                    itemz.push(item);
                  }
                } else if (!this.state.soundstatus[item.id]) {
                  if (activeSounds.includes(sounds[item.id])) {
                    const index = activeSounds.indexOf(sounds[item.id]);
                    delete activeSounds[index];
                  }
                }
                sounds[item.id].setVolume(0.5);
                activeSounds && this.props.getSound(itemz, item, activeSounds);
              }}>
              <View style={{width: 70, height: 70}}>
                <Image source={item.image} style={styles.image} />
              </View>
            </TouchableOpacity>
            <View style={{width: 90}}>
              <Text numberOfLines={1} style={styles.itemName}>
                {item.title}
              </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    //borderWidth: 2,
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
  },
  gridView: {
    top: '-2.3%',
    left: '9%',
    width: '94%',
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    alignContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'flex-end',
    borderRadius: 10,
    padding: 10,
    width: 90,
    height: 90,
  },
  itemName: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //width:90,
    //borderWidth:1,
    borderColor: 'yellow',
    bottom: -10,
    fontSize: 13,
    //fontWeight: 'bold',
    color: '#fff',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    backgroundColor: 'rgba(22, 5, 60,0.5)',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    color: 'white',
    padding: 10,
  },
});
