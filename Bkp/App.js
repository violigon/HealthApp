    
import React from 'react';
import { StyleSheet, View, Text, Animated, Image, Easing, ImageBackground} from 'react-native';

class SplashScreen extends React.Component {
  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }
  
  
  
  componentDidMount() {
    this.StartImageRotateFunction();
  }
  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }
  render() {

    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-360deg'],
    });
    return (
      <ImageBackground source={require('./Untitled-3.jpg')} style={styles.container}>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          transform: [{ rotate: RotateData }],
        }}
        source={require('./Logo1.png')}
      />
    </ImageBackground>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Reload the App to see a splash screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

