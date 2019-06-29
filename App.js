    
import React from 'react';
import { StyleSheet, View, Text, Animated, Image, Easing, ImageBackground} from 'react-native';
import CircleButton from 'react-native-circle-button';
//import { WebView } from 'react-native-webview';
import ViewShot from "react-native-view-shot";
import { VLCPlayer, VlCPlayerView } from 'react-native-vlcplayer';

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
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }


  botaoCima = () => {
    this.refs.viewShot.capture().then(uri => {
      console.log("do something with ", uri);
    });
  }

  botaoBaixo = () => {
    console.log('Click Baixo');
  }

  botaoEsq = () => {
    console.log('Click Esquerda');
  }

  botaoDir = () => {
    console.log('Click Direita');
  }
  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
  


<ViewShot ref="viewShot" style={{ flex: 1}}>
        <VLCPlayer
           ref={ref => (this.vlcPlayer = ref)}
           style={{marginTop:0,height:"100%",width:"100%"}}
           source={{ uri:'rtsp://192.168.2.200:7070/webcam'}}
               
       />
        <View style={{position:'absolute',right:0,marginTop:155,marginRight:60,zIndex:1,height:50,width:50,opacity: 0.8}}>
        <CircleButton size={45}  primaryColor='#4cb0e4' secondaryColor='#66c87d' onPressButtonTop={this.botaoCima} onPressButtonBottom={this.botaoBaixo} onPressButtonRight={this.botaoDir} onPressButtonLeft={this.botaoEsq}/>
        </View>
</ViewShot>
   
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
  myButton:{
  marginTop: 510,
    padding: 5,
    height: 50,
    width: 50,  //The Width must be the same as the height
    borderRadius:100, //Then Make the Border Radius twice the size of width or Height   
    

  },
});

