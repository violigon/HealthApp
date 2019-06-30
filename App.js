import React from 'react';
import {Animated, Easing, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import iconAdd from './icons/add.png';
import iconAttach from './icons/attach.png';
import iconEmail from './icons/email.png';
import iconPerson from './icons/person.png';
import iconSetting from './icons/setting.png';
import ViewShot from "react-native-view-shot";
import {VLCPlayer} from 'react-native-vlcplayer';

const size = 45;

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
            easing: Easing.linear
        }).start(() => this.StartImageRotateFunction());
    }

    render() {
        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-360deg']
        });

        return (
            <ImageBackground source={require('./Untitled-3.jpg')} style={styles.container}>
                <Animated.Image
                    style={{
                        width: 200,
                        height: 200,
                        transform: [{rotate: RotateData}]
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
        this.state = {isLoading: true}
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                2000
            )
        );
    };

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.setState({isLoading: false});
        }
    }

    onPressButtonTop = () => {
        console.log('Click Top');
        // this.refs.viewShot.capture().then(uri => {
        //     console.log("do something with ", uri);
        // });
    };

    onPressButtonBottom = () => {
        console.log('Click Baixo');
    };

    onPressButtonLeft = () => {
        console.log('Click Esquerda');
    };

    onPressButtonRight = () => {
        console.log('Click Direita');
    };

    scaleAnimated = new Animated.Value(0);
    rotateAnimated = new Animated.Value(0);
    fadeAnimated = new Animated.Value(0);
    bringToLeftAnimated = new Animated.Value(0);
    bringToRightAnimated = new Animated.Value(0);
    bringToTopAnimated = new Animated.Value(0);
    bringToBottomAnimated = new Animated.Value(0);

    isClicked = false;

    _buttonCenter = () => {
        this.isClicked = !this.isClicked;

        if (this.isClicked) {
            this.startAnimation();
        } else {
            this.endAnimation();
        }
    };

    _itemLeft = () => {
        this.isClicked = false;

        this.endAnimation();

        this.onPressButtonLeft();
    };

    _itemRight = () => {
        this.isClicked = false;

        this.endAnimation();

        this.onPressButtonRight();
    };

    _itemTop = () => {
        this.isClicked = false;

        this.endAnimation();

        this.onPressButtonTop();
    };

    _itemBottom = () => {
        this.isClicked = false;

        this.endAnimation();

        this.onPressButtonBottom();
    };

    startAnimation = () => {
        this.createAnimation(this.rotateAnimated, 1, 200);
        this.createAnimation(this.scaleAnimated, 1, 200);
        this.createAnimation(this.fadeAnimated, 1, 100);
        this.createAnimation(this.bringToLeftAnimated, 1, 200);
        this.createAnimation(this.bringToRightAnimated, 1, 200);
        this.createAnimation(this.bringToTopAnimated, 1, 200);
        this.createAnimation(this.bringToBottomAnimated, 1, 200);
    };

    endAnimation = () => {
        this.createAnimation(this.rotateAnimated, 2, 200);
        this.createAnimation(this.scaleAnimated, 0, 200);
        this.createAnimation(this.fadeAnimated, 0, 100);
        this.createAnimation(this.bringToLeftAnimated, 0, 200);
        this.createAnimation(this.bringToRightAnimated, 0, 200);
        this.createAnimation(this.bringToTopAnimated, 0, 200);
        this.createAnimation(this.bringToBottomAnimated, 0, 200);
    };

    createAnimation(obj, toValue, duration, easing) {
        return Animated.timing(obj, {
            toValue,
            duration,
            easing: Easing.linear
        }).start();
    }

    render() {
        const scaleMe = this.scaleAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [size, size * 2.8]
        });

        const rotateMe = this.rotateAnimated.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['0deg', '45deg', '0deg']
        });

        const fadeInOut = this.fadeAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const bringMeToLeft = this.bringToLeftAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [size - 5, 2]
        });

        const bringMeToRight = this.bringToRightAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [size - 5, 2]
        });

        const bringMeToTop = this.bringToRightAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [size - 5, 2]
        });

        const bringMeToBottom = this.bringToRightAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [size - 5, 2]
        });

        if (this.state.isLoading) {
            return <SplashScreen/>;
        }

        return (
            <View style={styles.appContainer}>
                <ViewShot ref={component => this._viewShot = component} style={styles.viewShot}>
                    <VLCPlayer
                        ref={ref => (this.vlcPlayer = ref)}
                        style={styles.vlcPlayer}
                        source={{uri: 'rtsp://192.168.15.166/videodevice'}}/>
                </ViewShot>

                <View style={styles.circleContainer}>
                    <View style={styles.centerContainer}>
                        <Animated.View style={[
                            styles.baseCircle,
                            {
                                width: scaleMe,
                                height: scaleMe
                            }
                        ]}>
                        </Animated.View>
                    </View>
                    <View style={styles.viewCenter}>

                        <Animated.View style={[styles.subItem, {left: bringMeToLeft}]}>
                            <TouchableOpacity style={styles.subItem}
                                              activeOpacity={1}
                                              onPress={this._itemLeft}>
                                <Animated.Image
                                    source={iconAttach}
                                    style={[styles.centerImage, {opacity: fadeInOut}]}
                                />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.subItem, {right: bringMeToRight}]}>
                            <TouchableOpacity style={styles.subItem}
                                              activeOpacity={1}
                                              onPress={this._itemRight}>
                                <Animated.Image
                                    source={iconEmail}
                                    style={[styles.centerImage, {opacity: fadeInOut}]}
                                />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.subItem, {top: bringMeToTop}]}>
                            <TouchableOpacity style={styles.subItem}
                                              activeOpacity={1}
                                              onPress={this._itemTop}>
                                <Animated.Image
                                    source={iconPerson}
                                    style={[styles.centerImage, {opacity: fadeInOut}]}
                                />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.subItem, {bottom: bringMeToBottom}]}>
                            <TouchableOpacity style={styles.subItem}
                                              activeOpacity={1}
                                              onPress={this._itemBottom}>
                                <Animated.Image
                                    source={iconSetting}
                                    style={[styles.centerImage, {opacity: fadeInOut}]}
                                />
                            </TouchableOpacity>
                        </Animated.View>

                        <TouchableOpacity style={styles.itemOpen}
                                          activeOpacity={1}
                                          onPress={this._buttonCenter}>
                            <Animated.Image
                                source={iconAdd}
                                style={{transform: [{rotate: rotateMe}]}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    appContainer: {
        flex: 1
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: size * 2.8,
        height: size * 2.8
    },
    circleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    viewCenter: {
        flex: 1,
        position: 'absolute',
        width: size * 2.8,
        height: size * 2.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemOpen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: '#4CB0E4',
        borderRadius: 360
    },
    baseCircle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: '#66C87D',
        borderRadius: 360
    },
    centerImage: {
        width: size - 10,
        height: size - 10
    },
    subItem: {
        flex: 1,
        position: 'absolute',
        width: size - 10,
        height: size - 10
    },
    viewShot: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    vlcPlayer: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});

