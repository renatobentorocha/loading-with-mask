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

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const { width, height } = Dimensions.get('window');
const MASK_WIDTH = 373;
const MASK_HEIGHT = 118;
const MASK_X_POSITION = (MASK_WIDTH - (width - MASK_WIDTH) / 2) * -1;
const SVG_TEXT_HEIGHT = 97;
const SVG_TEXT_FONT_SIZE = 100;

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
          x={Dimensions.get('window').width / 2 - MASK_WIDTH / 2}
          y={Dimensions.get('window').height / 2 - SVG_TEXT_HEIGHT}
          height={MASK_HEIGHT}
        >
          <AnimatedRect
            x={MASK_X_POSITION}
            y={Dimensions.get('window').height / 2 - SVG_TEXT_HEIGHT}
            width={MASK_WIDTH}
            style={{
              transform: [
                {
                  translateX: interpolate(progress, {
                    inputRange: [0, 1],
                    outputRange: [0, MASK_WIDTH],
                    extrapolate: Extrapolate.CLAMP,
                  }),
                },
              ],
            }}
            height={MASK_HEIGHT}
            fill="url(#Gradient)"
          />
        </Mask>
        <Text
          id="Text"
          x={width / 2}
          y={height / 2}
          fontFamily="Verdana"
          fontSize={SVG_TEXT_FONT_SIZE}
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
