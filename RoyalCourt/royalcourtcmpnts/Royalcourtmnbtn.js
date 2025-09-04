import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const Royalcourtmnbtn = ({
  rangerPropsLabel,
  onPress,
  buttonWidth,
  buttonHeight,
  fontSize = 24,
  rangerPropsImage,
  rangerPropsIcon,
  rangerPropsLockIcon,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      <ImageBackground
        source={rangerPropsImage}
        style={[
          styles.royalcourtbtn,
          { width: buttonWidth, height: buttonHeight },
          rangerPropsLockIcon && { alignItems: 'flex-start' },
        ]}
        resizeMode="stretch"
      >
        <Text
          style={[
            styles.royalcourtbtntxt,
            { fontSize },
            rangerPropsIcon && {
              marginLeft: 65,
              width: 245,
              textAlign: 'left',
            },
          ]}
        >
          {rangerPropsLabel}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  royalcourtbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  royalcourtbtntxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 24,
    color: '#fff',
    top: -4,
  },
});

export default Royalcourtmnbtn;
