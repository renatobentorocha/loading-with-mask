import * as React from 'react';
import Svg, { Text } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function LoadingText() {
  return (
    <Svg height="100" width="400" style={{ zIndex: 10 }}>
      <Text
        fill="transparent"
        stroke="purple"
        fontSize={60}
        fontWeight="bold"
        x={200}
        y={50}
        textAnchor="middle"
      >
        LOADING
      </Text>
    </Svg>
  );
}

export { LoadingText };
