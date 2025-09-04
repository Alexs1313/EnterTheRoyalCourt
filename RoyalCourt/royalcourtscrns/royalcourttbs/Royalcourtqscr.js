import Royalcourtbg from '../../royalcourtcmpnts/Royalcourtbg';
import { useRoyalCourtStore } from '../../royalcourtstr/royalcourtcntx';
import { BlurView } from '@react-native-community/blur';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Royalcourtmnbtn from '../../royalcourtcmpnts/Royalcourtmnbtn';
import Royalcourtcrsl from '../../royalcourtcmpnts/Royalcourtcrsl';
import { royalcourtsrddls } from '../../royalcourtcnsts/royalcourtsrddls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Share,
  TextInput,
} from 'react-native';
import WebView from 'react-native-webview';
import { royalCourtLoaderHTML } from '../../royalcourtcnsts/royalcourthtmlldr';

const royalcourtcategories = [
  {
    royalcourtsttl: 'King',
    royalcourtcat: 'Advice from the King',
    royalcourtsimg: require('../../../assets/imgs/royalcourtkng.png'),
    royalcourtdesc:
      'I will give you a task that requires intelligence and attentiveness. Only those who think clearly will find the answer.',
  },
  {
    royalcourtsttl: 'Prince',
    royalcourtcat: 'Advice from the Prince',
    royalcourtsimg: require('../../../assets/imgs/royalcourtprin.png'),
    royalcourtdesc:
      'I offer riddles from the world of dreams and adventures. The answers are hidden in fairy tales that live in your imagination.',
  },
  {
    royalcourtsttl: 'Queen',
    royalcourtcat: 'Advice from the Queen',
    royalcourtsimg: require('../../../assets/imgs/royalcourtqueen.png'),
    royalcourtdesc:
      'My riddles are about the tenderness and harmony around us. If you see beauty in the details, you will easily find the answer.',
  },
  {
    royalcourtsttl: 'Jester',
    royalcourtcat: 'Advice from the Jester',
    royalcourtsimg: require('../../../assets/imgs/royalcourtjest.png'),
    royalcourtdesc:
      'My riddles are funny and unexpected. Logic will not always help - sometimes you just need to laugh.',
  },
];

const Royalcourtqscr = () => {
  const {
    royalCourtName,
    royalCourtPht,
    royalCourtDate,
    saveRoyalCourtRiddle,
    getRoyalCourtRiddle,
    deleteRoyalCourtRiddle,
  } = useRoyalCourtStore();
  const [selectedRoyalCourtCategory, setSelectedRoyalCourtCategory] =
    useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [royalCourtInptValue, setRoyalCourtInptValue] = useState('');
  const [showRoyalCourtAnsw, setShowRoyalCourtAnsw] = useState(false);
  const [randomRoyalCourtIndex, setRandomRoyalCourtIndex] = useState(null);
  const [toggleButtonColor, setToggleButtonColor] = useState(false);
  const [isRoyalCourtEditable, setIsRoyalCourtEditable] = useState(true);
  const [isRoyalCourtLoading, setIsRoyalCourtLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getRoyalCourtRiddle();
      renderRoyalAdvices(royalcourtsrddls[randomRoyalCourtIndex]);
    }, [selectedRoyalCourtCategory]),
  );

  const getRandomIndex = () => {
    const index = Math.floor(Math.random() * 5);

    setRandomRoyalCourtIndex(index);
  };

  const showRiddleRes = () => {
    setIsRoyalCourtEditable(false);
    setIsRoyalCourtLoading(true);

    setTimeout(() => {
      setIsRoyalCourtLoading(false);
      setShowRoyalCourtAnsw(true);
    }, 1500);
  };

  const shareRiddleRes = async () => {
    try {
      await Share.share({
        message: `${royalcourtsrddls[randomRoyalCourtIndex].royalcourtadv}
Correct answer: ${royalcourtsrddls[randomRoyalCourtIndex].royalcourtansw}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  const handleSaveRoyalRiddle = selectedRiddle => {
    const newRiddle = { ...selectedRiddle, favorite: false };

    if (toggleButtonColor) {
      deleteRoyalCourtRiddle(newRiddle);
      setToggleButtonColor(false);
    } else {
      saveRoyalCourtRiddle(newRiddle);
      setToggleButtonColor(true);
    }
  };

  const renderRoyalAdvices = async item => {
    const jsonValue = await AsyncStorage.getItem('royal_court_riddle');

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
      <View style={{ paddingBottom: 140 }}>
        {selectedRoyalCourtCategory ? (
          <>
            <View style={{ alignItems: 'center', marginTop: 54 }}>
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
                    <Text style={styles.royalcourtsbttxt}>
                      {royalCourtDate}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 52,
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
                  <Text style={[styles.royalcourtmdsbt, { marginBottom: 17 }]}>
                    {royalcourtsrddls[randomRoyalCourtIndex].royalcourtadv}
                  </Text>

                  <View
                    style={{
                      alignItems: 'center',
                    }}
                  >
                    <TextInput
                      style={[
                        styles.royalcourtinpt,
                        royalCourtInptValue && { fontSize: 15 },
                        showRoyalCourtAnsw
                          ? royalcourtsrddls[
                              randomRoyalCourtIndex
                            ].royalcourtansw.toLowerCase() ===
                            royalCourtInptValue.toLowerCase()
                            ? { backgroundColor: '#009805' }
                            : { backgroundColor: '#EF0F0F' }
                          : { backgroundColor: '#260101' },
                      ]}
                      placeholder="Your answer"
                      placeholderTextColor={'#414141'}
                      onChangeText={setRoyalCourtInptValue}
                      value={royalCourtInptValue}
                      editable={isRoyalCourtEditable}
                    />
                  </View>

                  {isRoyalCourtLoading && (
                    <View
                      style={{
                        transform: [{ rotate: '151deg' }],
                        flex: 1,
                        alignItems: 'center',
                      }}
                    >
                      <WebView
                        originWhitelist={['*']}
                        source={{ html: royalCourtLoaderHTML }}
                        style={{
                          backgroundColor: 'transparent',
                          width: 350,
                          height: 95,
                        }}
                        scrollEnabled={false}
                      />
                    </View>
                  )}

                  {!isRoyalCourtLoading && (
                    <>
                      {royalCourtInptValue && !showRoyalCourtAnsw && (
                        <View style={{ alignItems: 'center' }}>
                          <Royalcourtmnbtn
                            rangerPropsLabel={'Go'}
                            buttonWidth={151}
                            buttonHeight={59}
                            fontSize={20}
                            rangerPropsImage={require('../../../assets/imgs/royalcourtbtn.png')}
                            onPress={() => showRiddleRes()}
                          />
                        </View>
                      )}
                    </>
                  )}

                  {showRoyalCourtAnsw && (
                    <View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.royalcourtcorransttl}>
                          Correct answer:
                        </Text>

                        <View
                          style={[
                            styles.royalcourtcorranswcnt,
                            royalcourtsrddls[
                              randomRoyalCourtIndex
                            ].royalcourtansw.toLowerCase() ===
                            royalCourtInptValue.toLowerCase()
                              ? { backgroundColor: '#009805' }
                              : { backgroundColor: '#EF0F0F' },
                          ]}
                        >
                          <Text style={styles.royalcourtcorranstxt}>
                            {
                              royalcourtsrddls[randomRoyalCourtIndex]
                                .royalcourtansw
                            }
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Royalcourtmnbtn
                          rangerPropsLabel={'Share'}
                          buttonWidth={151}
                          buttonHeight={59}
                          fontSize={20}
                          rangerPropsImage={require('../../../assets/imgs/royalcourtbtn.png')}
                          onPress={shareRiddleRes}
                        />
                        <Royalcourtmnbtn
                          rangerPropsLabel={
                            toggleButtonColor ? 'Saved' : 'Save'
                          }
                          buttonWidth={151}
                          buttonHeight={59}
                          fontSize={20}
                          rangerPropsImage={
                            toggleButtonColor
                              ? require('../../../assets/imgs/royalcourtbtnsvd.png')
                              : require('../../../assets/imgs/royalcourtbtn.png')
                          }
                          onPress={() =>
                            handleSaveRoyalRiddle(
                              royalcourtsrddls[randomRoyalCourtIndex],
                            )
                          }
                        />
                      </View>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                  activeOpacity={0.6}
                  disabled={isRoyalCourtLoading}
                  onPress={() => {
                    setSelectedRoyalCourtCategory('');
                    setShowRoyalCourtAnsw(false);
                    setRoyalCourtInptValue('');
                    setCurrentIndex(0);
                    setIsRoyalCourtEditable(true);
                  }}
                >
                  <Image
                    source={require('../../../assets/imgs/royalcourtclsbg.png')}
                    style={{ width: 45, height: 45 }}
                  />
                  <Image
                    source={require('../../../assets/imgs/royalcourtclsm.png')}
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      top: 12,
                    }}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </>
        ) : (
          <View style={[styles.royalcourtcnt]}>
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
            <Text style={styles.royalcourtmntxt}>
              Choose from which you want to receive a riddle:
            </Text>

            <Royalcourtcrsl
              categories={royalcourtcategories}
              setCurrentIndex={setCurrentIndex}
              onSelect={item => {
                setSelectedRoyalCourtCategory(item.royalcourtcat);
                getRandomIndex();
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}
            >
              {[1, 2, 3, 4].map((item, idx) =>
                currentIndex === idx ? (
                  <Image
                    source={require('../../../assets/imgs/royalcourtpgsel.png')}
                    key={idx}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/imgs/royalcourtpg.png')}
                    key={idx}
                  />
                ),
              )}
            </View>
          </View>
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
    paddingTop: 6,
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
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 36,
    marginBottom: 26,
    paddingHorizontal: 20,
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
    marginBottom: 23,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  royalcourtinpt: {
    width: '90%',
    height: 46,
    borderRadius: 22,
    backgroundColor: '#260101',
    marginBottom: 24,

    fontFamily: 'SpicyRice-Regular',
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 14,
  },
  royalcourtcorranswcnt: {
    width: '90%',
    height: 46,
    borderRadius: 22,
    backgroundColor: 'green',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 34,
  },
  royalcourtcorransttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 20,
    color: '#fff',
    marginBottom: 7,
  },
  royalcourtcorranstxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 15,
    color: '#fff',
  },
  royalcourtlog: {
    width: 135,
    height: 195,
    top: 5,
  },
});

export default Royalcourtqscr;
