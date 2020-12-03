import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import Svg, {
  SvgProps,
  Rect,
  Mask,
  Text,
  Defs,
  Stop,
  Use,
  LinearGradient,
} from 'react-native-svg';

import Animated, {
  Clock,
  Easing,
  block,
  cond,
  not,
  set,
  eq,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { timing, useCode, startClock } = Animated;

const runProgress = (clock: Clock) => {
  const state = {
    finished: new Animated.Value(0),
    position: new Animated.Value(0),
    frameTime: new Animated.Value(0),
    time: new Animated.Value(0),
  };

  const config = {
    toValue: new Animated.Value(1),
    duration: 4000,
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, not(state.position)),
    ]),
    state.position,
  ]);
};

console.log(Dimensions.get('window').width);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

function SvgComponent(props: SvgProps) {
  const clock = useRef(new Clock()).current;
  const progress = useRef(new Animated.Value(5)).current;

  useCode(() => [startClock(clock), set(progress, runProgress(clock))], []);

  return (
    <Svg {...props}>
      <Defs>
        <LinearGradient
          id="Gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          y2="0"
        >
          <Stop offset="0%" stopColor="#59C173" stopOpacity="1" />
          <Stop offset="50%" stopColor="#a17fe0" stopOpacity="1" />
          <Stop offset="100%" stopColor="#5D26C1" stopOpacity="1" />
        </LinearGradient>
        <Mask
          id="Mask"
          x={Dimensions.get('window').width / 2 - 373 / 2}
          y={Dimensions.get('window').height / 2 - 97}
          height="118"
        >
          <AnimatedRect
            x={Dimensions.get('window').width / 2 - 373 / 2}
            y={Dimensions.get('window').height / 2 - 97}
            width={interpolate(progress, {
              inputRange: [0, 1],
              outputRange: [0, 373],
              extrapolate: Extrapolate.CLAMP,
            })}
            height="118"
            fill="url(#Gradient)"
          />
        </Mask>
        <Text
          id="Text"
          x={Dimensions.get('window').width / 2}
          y={Dimensions.get('window').height / 2}
          fontFamily="Verdana"
          fontSize="100"
          textAnchor="middle"
        >
          Loading
        </Text>
      </Defs>
      <Use href="#Text" fill="url(#Gradient)" mask="url(#Mask)" />
      <Use href="#Text" fill="none" stroke="black" stroke-width="2" />
    </Svg>
  );
}

export default SvgComponent;
