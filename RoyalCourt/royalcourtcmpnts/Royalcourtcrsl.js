import React, { useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Royalcourtgrdtxt from '../royalcourtcmpnts/Royalcourtgrdtxt';
import Royalcourtmnbtn from '../royalcourtcmpnts/Royalcourtmnbtn';

export default function Royalcourtcrsl({
  categories = [],
  onSelect = () => {},
  setCurrentIndex,
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
  const ITEM_WIDTH = Math.round(SCREEN_WIDTH * (isLandscape ? 0.72 : 1));
  const ITEM_SPACING = Math.round((SCREEN_WIDTH - ITEM_WIDTH) / 2.5);

  const handleScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true },
      )}
      onMomentumScrollEnd={handleScrollEnd}
      scrollEventThrottle={16}
    >
      {categories.map((item, index) => {
        const inputRange = [
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 1) * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [12, 0, 12],
          extrapolate: 'clamp',
        });

        return (
          <View key={index}>
            <Animated.View
              style={[
                {
                  width: ITEM_WIDTH,
                  transform: [{ scale }, { translateY }],
                  opacity,
                },
              ]}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LinearGradient
                  style={styles.royalcourtmdlbrd}
                  colors={[
                    '#BB862A',
                    '#C48E24',
                    '#DBA414',
                    '#F0B706',
                    '#FEF387',
                    '#F0B706',
                    '#ECCB64',
                    '#BB862A',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={[styles.royalcourtmdl]}>
                    <View style={{ alignItems: 'center' }}>
                      <View style={styles.royalcourtimgbg}>
                        <Image
                          source={item.royalcourtsimg}
                          style={[{ width: 99.57, height: 151.3 }]}
                        />
                      </View>

                      <Text style={styles.royalcourtmdttl}>
                        {item.royalcourtsttl}
                      </Text>
                    </View>
                    <Text style={styles.royalcourtmdsbt}>
                      {item.royalcourtdesc}
                    </Text>

                    <View style={{ alignItems: 'center' }}>
                      <Royalcourtmnbtn
                        rangerPropsLabel={'Go'}
                        buttonWidth={151}
                        buttonHeight={59}
                        fontSize={20}
                        onPress={() => onSelect(item)}
                        rangerPropsImage={require('../../assets/imgs/royalcourtbtn.png')}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  rangernotescnt: {
    justifyContent: 'center',
  },
  royalcourtmdlbrd: {
    marginBottom: 13,
    borderRadius: 22,
    width: '90%',
  },
  royalcourtttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  royalcourtmdl: {
    paddingTop: 8,
    paddingHorizontal: 14,
    paddingBottom: 17,
    backgroundColor: '#550101',
    margin: 3,
    borderRadius: 22,
  },
  royalcourtmdsbt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  royalcourtmdttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 40,
    color: '#F0B706',
    textAlign: 'center',
    marginTop: 20,
  },
  royalcourtimgbg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#163E7E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
