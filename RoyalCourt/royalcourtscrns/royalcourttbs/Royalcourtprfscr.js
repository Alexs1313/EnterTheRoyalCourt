import { StyleSheet, Image, View, Text, Platform, Share } from 'react-native';
import Royalcourtbg from '../../royalcourtcmpnts/Royalcourtbg';
import { useRoyalCourtStore } from '../../royalcourtstr/royalcourtcntx';
import LinearGradient from 'react-native-linear-gradient';
import Royalcourtmnbtn from '../../royalcourtcmpnts/Royalcourtmnbtn';
import { Royalcourtgrdtxt } from '../../royalcourtcmpnts/Royalcourtgrdtxt';

const Royalcourtprfscr = () => {
  const { royalCourtName, royalCourtPht, royalCourtDate } =
    useRoyalCourtStore();

  const shareRiddleRes = async () => {
    try {
      await Share.share({
        message: `The application immerses you in the world of the royal court, where the wise King, the charming Queen, the dreamy Prince and the cheerful Jester share their advice and riddles.
Spin the wheel of fortune, guess fairy-tale tasks and save the best moments in your collection of inspiration.
`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <Royalcourtbg>
      <View style={[styles.royalcourtcnt]}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../assets/imgs/royalcourtlnbg.png')} />
          <Image
            source={require('../../../assets/imgs/royalcourtmnlog.png')}
            style={{ position: 'absolute', borderRadius: 12 }}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: -10,
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
              <View>
                <View style={{ alignItems: 'center' }}>
                  {Platform.OS === 'ios' ? (
                    <Text style={styles.royalcourtmdttl}>About the app</Text>
                  ) : (
                    <Royalcourtgrdtxt
                      royalCourtPropsTxt={'About the app'}
                      style={styles.royalcourtttl}
                    />
                  )}
                  <Text style={styles.royalcourtcorransttl}>
                    The application immerses you in the world of the royal
                    court, where the wise King, the charming Queen, the dreamy
                    Prince and the cheerful Jester share their advice and
                    riddles. Spin the wheel of fortune, guess fairy-tale tasks
                    and save the best moments in your collection of inspiration.
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: 'center',
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
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View
          style={{
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
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{ uri: royalCourtPht }}
                    style={styles.royalcourtpckimg}
                  />
                  <View>
                    {Platform.OS === 'ios' ? (
                      <Text
                        style={[styles.royalcourtmdttl, { marginBottom: 11 }]}
                      >
                        Hello, {royalCourtName}
                      </Text>
                    ) : (
                      <Royalcourtgrdtxt
                        royalCourtPropsTxt={`Hello, ${royalCourtName}`}
                        style={[styles.royalcourtttl]}
                      />
                    )}
                    <Text style={styles.royalcourtdttxt}>{royalCourtDate}</Text>
                    {/* <View
                      style={{
                        alignItems: 'center',
                        marginTop: 44,
                      }}
                    >
                      <Royalcourtmnbtn
                        rangerPropsLabel={'Edit'}
                        buttonWidth={111}
                        buttonHeight={43}
                        fontSize={20}
                        rangerPropsImage={require('../../../assets/imgs/royalcourtbtn.png')}
                        onPress={shareRiddleRes}
                      />
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Royalcourtbg>
  );
};

const styles = StyleSheet.create({
  royalcourtcnt: {
    padding: 5,
    paddingTop: 45,
    flex: 1,
    paddingBottom: 140,
  },
  royalcourtmdlbrd: {
    marginBottom: 13,
    borderRadius: 22,
    width: '90%',
  },
  royalcourtttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  royalcourtmdl: {
    paddingTop: 24,
    paddingHorizontal: 23,
    paddingBottom: 17,
    backgroundColor: '#550101',
    margin: 3,
    borderRadius: 22,
  },
  royalcourtpckimg: {
    width: 116,
    height: 116,
    borderRadius: 17,
  },
  royalcourtmdttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 24,
    color: '#ECCB64',
    textAlign: 'center',
    marginBottom: 26,
  },
  royalcourtcorransttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 19,
    textAlign: 'center',
  },
  royalcourtcorranstxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 15,
    color: '#fff',
  },
  royalcourtdttxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
});

export default Royalcourtprfscr;
