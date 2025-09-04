import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import Royalcourtbg from '../../royalcourtcmpnts/Royalcourtbg';
import { useRoyalCourtStore } from '../../royalcourtstr/royalcourtcntx';
import { BlurView } from '@react-native-community/blur';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Royalcourttpscrd from '../../royalcourtcmpnts/Royalcourttpscrd';
import Royalcourtriddlecrd from '../../royalcourtcmpnts/Royalcourtriddlecrd';

const Royalcourtsvscr = () => {
  const {
    royalCourtName,
    royalCourtPht,
    royalCourtDate,
    getRoyalCourtRiddle,
    savedRoyalCourtRiddles,
    getRoyalCourtAdvice,
    savedRoyalCourtAdvices,
  } = useRoyalCourtStore();

  const [toggleRoyalCourtSegmentContr, setToggleRoyalCourtSegmentContr] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      getRoyalCourtRiddle();
      getRoyalCourtAdvice();
    }, []),
  );

  return (
    <Royalcourtbg>
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

        <Pressable
          style={styles.royalcourtsegmentcntrl}
          onPress={() =>
            setToggleRoyalCourtSegmentContr(!toggleRoyalCourtSegmentContr)
          }
        >
          <Text style={styles.royalcourtsegtxt}>Tips</Text>
          <Text style={styles.royalcourtsegtxt}>Riddles</Text>

          <View
            style={[
              {
                position: 'absolute',
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
              },
              toggleRoyalCourtSegmentContr && { right: -160 },
            ]}
          >
            <Image
              source={require('../../../assets/imgs/royalcourtgradbg.png')}
            />
            <Text style={[styles.royalcourtsegtxt, { position: 'absolute' }]}>
              {toggleRoyalCourtSegmentContr ? 'Riddle' : 'Tips'}
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          marginBottom: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!toggleRoyalCourtSegmentContr ? (
          <>
            {savedRoyalCourtAdvices.map((adv, idx) => (
              <Royalcourttpscrd adv={adv} key={idx} />
            ))}
          </>
        ) : (
          <>
            {savedRoyalCourtRiddles.map((adv, idx) => (
              <Royalcourtriddlecrd adv={adv} key={idx} />
            ))}
          </>
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
    paddingTop: 21,
    paddingHorizontal: 14,
    paddingBottom: 7,
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
    marginBottom: 21,
  },
  royalcourtimgbg: {
    width: 113,
    height: 113,
    borderRadius: 100,
    backgroundColor: '#163E7E',
    alignItems: 'center',
    marginBottom: 23,
    overflow: 'hidden',
    justifyContent: 'flex-end',
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
  royalcourtsegtxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 32,
    color: '#000',
  },
  royalcourtsegmentcntrl: {
    width: 342,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#fff',
    marginTop: 15,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Royalcourtsvscr;
