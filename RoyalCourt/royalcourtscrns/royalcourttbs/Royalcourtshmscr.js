import Royalcourtbg from '../../royalcourtcmpnts/Royalcourtbg';
import { useRoyalCourtStore } from '../../royalcourtstr/royalcourtcntx';
import { BlurView } from '@react-native-community/blur';
import { useCallback, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Royalcourtgrdtxt } from '../../royalcourtcmpnts/Royalcourtgrdtxt';
import { royalcourtadvs } from '../../royalcourtcnsts/royalcourtadvs';
import Royalcourtmnbtn from '../../royalcourtcmpnts/Royalcourtmnbtn';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Pressable,
  Modal,
  Platform,
  Share,
  StyleSheet,
  Image,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const royalcourtcategories = [
  'Advice from the King',
  'Advice from the Prince',
  'Advice from the Jester',
  'Advice from the Queen',
];
const numCategories = royalcourtcategories.length;

const Royalcourtshmscr = () => {
  const {
    royalCourtName,
    royalCourtPht,
    royalCourtDate,
    saveRoyalCourtAdvice,
    getRoyalCourtAdvice,
    deleteRoyalCourtAdvice,
  } = useRoyalCourtStore();
  const rotation = useRef(new Animated.Value(0)).current;
  const [selectedRoyalCourtCategory, setSelectedRoyalCourtCategory] =
    useState(null);
  const [isRoyalCourtSpinning, setIsRoyalCourtSpinning] = useState(false);
  const [toggleButtonColor, setToggleButtonColor] = useState(false);
  const [isVisibleMdl, setIsVisibleMdl] = useState(true);
  const [randomRoyalCourtIndex, setRandomRoyalCourtIndex] = useState(null);

  const filteredRoyalCourtsAdv = royalcourtadvs.filter(
    adv => adv.royalcourtcat === selectedRoyalCourtCategory,
  );

  // const randomRoyalCourtIndex = Math.floor(
  //   Math.random() * filteredRoyalCourtsAdv.length,
  // );

  const getRandomIndex = () => {
    const index = Math.floor(Math.random() * filteredRoyalCourtsAdv.length);

    setRandomRoyalCourtIndex(index);
  };

  useFocusEffect(
    useCallback(() => {
      getRoyalCourtAdvice();
      renderRoyalAdvices(filteredRoyalCourtsAdv[randomRoyalCourtIndex]);
    }, [selectedRoyalCourtCategory]),
  );

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => setIsVisibleMdl(false);
    }, []),
  );

  const spinRoyalCourtWheel = () => {
    if (isRoyalCourtSpinning) return;
    setIsRoyalCourtSpinning(true);
    setIsVisibleMdl(true);

    getRandomIndex();

    const duration = Math.random() * (8000 - 3000) + 3000;
    const categoryIndex = Math.floor(Math.random() * numCategories);
    setSelectedRoyalCourtCategory(royalcourtcategories[categoryIndex]);

    const anglePerCategory = 360 / numCategories;
    const randomRoyalCourtOffset = Math.random() * anglePerCategory;
    const extraRoyalCourtSpins = 360 * 5;

    const finalRotation =
      extraRoyalCourtSpins +
      categoryIndex * anglePerCategory +
      randomRoyalCourtOffset;

    Animated.timing(rotation, {
      toValue: finalRotation,
      duration: duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(finalRotation % 360);
      setIsRoyalCourtSpinning(false);
    });
  };

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const shareAdv = async () => {
    try {
      await Share.share({
        message: `${selectedRoyalCourtCategory}
${filteredRoyalCourtsAdv[randomRoyalCourtIndex].royalcourtadv}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  const handleSaveRoyalAdvice = selectedAdvice => {
    const newAdvice = { ...selectedAdvice, favorite: false };

    if (toggleButtonColor) {
      deleteRoyalCourtAdvice(newAdvice);
      setToggleButtonColor(false);
    } else {
      saveRoyalCourtAdvice(newAdvice);
      setToggleButtonColor(true);
    }
  };

  const renderRoyalAdvices = async item => {
    const jsonValue = await AsyncStorage.getItem('royal_court_advs');

    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null
        ? setToggleButtonColor(false)
        : setToggleButtonColor(true);
    }
  };

  return (
    <Royalcourtbg>
      <View
        style={[
          styles.royalcourtcnt,
          Platform.OS === 'android' &&
            selectedRoyalCourtCategory &&
            !isRoyalCourtSpinning && { filter: 'blur(1px)' },
        ]}
      >
        <View style={styles.royalcourtblcnt}>
          <View style={styles.royalcourtblurwrp}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={20}
              reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
            />
            <Image
              source={{ uri: royalCourtPht }}
              style={styles.royalcourtpckimg}
            />
            <View style={{ top: -10, width: '75%' }}>
              <Text style={styles.royalcourttltxt}>
                Hello, {royalCourtName}
              </Text>
              <Text style={styles.royalcourtsbttxt}>{royalCourtDate}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.royalcourtmntxt}>Scroll and get advice</Text>

        <Pressable
          onPress={spinRoyalCourtWheel}
          style={styles.royalcourtwhlcnt}
        >
          <Animated.Image
            source={require('../../../assets/imgs/royalcourtwh.png')}
            style={[{ transform: [{ rotate: rotateInterpolation }] }]}
          />
          <Image
            source={require('../../../assets/imgs/royalcourtarr.png')}
            style={styles.royalcourtarr}
          />
        </Pressable>

        {selectedRoyalCourtCategory && !isRoyalCourtSpinning && (
          <Modal transparent animationType="fade" visible={isVisibleMdl}>
            {Platform.OS === 'ios' && (
              <>
                {selectedRoyalCourtCategory && !isRoyalCourtSpinning && (
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="black"
                    blurAmount={5}
                  />
                )}
              </>
            )}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LinearGradient
                style={[styles.royalcourtmdlbrd]}
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
                  {Platform.OS === 'ios' ? (
                    <Text style={styles.royalcourtmdttl}>
                      {selectedRoyalCourtCategory}
                    </Text>
                  ) : (
                    <Royalcourtgrdtxt
                      royalCourtPropsTxt={selectedRoyalCourtCategory}
                      style={styles.royalcourtttl}
                    />
                  )}
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.royalcourtimgbg}>
                      {selectedRoyalCourtCategory ===
                        'Advice from the King' && (
                        <Image
                          source={require('../../../assets/imgs/royalcourtkng.png')}
                          style={styles.royalcourtlog}
                        />
                      )}
                      {selectedRoyalCourtCategory ===
                        'Advice from the Prince' && (
                        <Image
                          source={require('../../../assets/imgs/royalcourtprin.png')}
                          style={styles.royalcourtlog}
                        />
                      )}
                      {selectedRoyalCourtCategory ===
                        'Advice from the Queen' && (
                        <Image
                          source={require('../../../assets/imgs/royalcourtqueen.png')}
                          style={styles.royalcourtlog}
                        />
                      )}
                      {selectedRoyalCourtCategory ===
                        'Advice from the Jester' && (
                        <Image
                          source={require('../../../assets/imgs/royalcourtjest.png')}
                          style={styles.royalcourtlog}
                        />
                      )}
                    </View>
                  </View>
                  <Text style={styles.royalcourtmdsbt}>
                    {
                      filteredRoyalCourtsAdv[randomRoyalCourtIndex]
                        ?.royalcourtadv
                    }
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Royalcourtmnbtn
                      rangerPropsLabel={'Share'}
                      buttonWidth={151}
                      buttonHeight={50}
                      fontSize={20}
                      onPress={shareAdv}
                      rangerPropsImage={require('../../../assets/imgs/royalcourtbtn.png')}
                    />

                    <Royalcourtmnbtn
                      rangerPropsLabel={toggleButtonColor ? 'Saved' : 'Save'}
                      buttonWidth={151}
                      buttonHeight={50}
                      fontSize={20}
                      rangerPropsImage={
                        toggleButtonColor
                          ? require('../../../assets/imgs/royalcourtbtnsvd.png')
                          : require('../../../assets/imgs/royalcourtbtn.png')
                      }
                      onPress={() =>
                        handleSaveRoyalAdvice(
                          filteredRoyalCourtsAdv[randomRoyalCourtIndex],
                        )
                      }
                    />
                  </View>
                </View>
              </LinearGradient>

              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
                activeOpacity={0.6}
                onPress={() => {
                  setSelectedRoyalCourtCategory('');
                  setToggleButtonColor(false);
                }}
              >
                <Image
                  source={require('../../../assets/imgs/royalcourtclsbg.png')}
                />
                <Image
                  source={require('../../../assets/imgs/royalcourtcls.png')}
                  style={{
                    position: 'absolute',
                    bottom: 14,
                  }}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </Royalcourtbg>
  );
};

const styles = StyleSheet.create({
  royalcourtcnt: {
    padding: 5,
    paddingTop: 54,
    alignItems: 'center',
    flex: 1,
    paddingBottom: 150,
  },
  royalcourtmdlbrd: {
    marginBottom: 13,
    borderRadius: 22,
    width: '90%',
  },
  royalcourtlog: {
    width: 135,
    height: 195,
    top: 5,
  },
  royalcourtttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  royalcourtmdl: {
    paddingTop: 34,
    paddingHorizontal: 14,
    paddingBottom: 17,
    backgroundColor: '#550101',
    margin: 3,
    borderRadius: 22,
  },
  royalcourttltxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 32,
    color: '#fff',
  },
  royalcourtsbttxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 12,
    color: '#fff',
  },
  royalcourtmntxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    marginTop: 53,
    marginBottom: 61,
  },
  royalcourtpckimg: {
    width: 92,
    height: 92,
    borderRadius: 22,
  },
  royalcourtblurwrp: {
    width: '105%',
    paddingTop: 12,
    paddingBottom: 13,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 18,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  royalcourtblcnt: {
    width: '70%',
    backgroundColor: 'rgba(6, 6, 6, 0.48)',
    borderRadius: 22,
    alignItems: 'center',
    borderTopWidth: 0,
    paddingHorizontal: 5,
  },
  royalcourtwhlcnt: { justifyContent: 'center', alignItems: 'center' },
  royalcourtarr: {
    position: 'absolute',
    top: -50,
  },
  royalcourtmdsbt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 68,
  },
  royalcourtmdttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 24,
    color: '#ECCB64',
    textAlign: 'center',
    marginBottom: 26,
  },
  royalcourtimgbg: {
    width: 196,
    height: 196,
    borderRadius: 100,
    backgroundColor: '#163E7E',
    alignItems: 'center',
    marginBottom: 28,
    overflow: 'hidden',
  },
});

export default Royalcourtshmscr;
