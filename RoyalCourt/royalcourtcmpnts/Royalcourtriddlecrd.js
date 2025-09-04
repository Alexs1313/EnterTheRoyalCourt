import {
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Royalcourtgrdtxt } from '../royalcourtcmpnts/Royalcourtgrdtxt';
import Royalcourtmnbtn from '../royalcourtcmpnts/Royalcourtmnbtn';
import { useCallback, useState } from 'react';
import { useRoyalCourtStore } from '../royalcourtstr/royalcourtcntx';
import { useFocusEffect } from '@react-navigation/native';

const Royalcourtriddlecrd = ({ adv }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);
  const {
    saveRoyalCourtRiddle,
    getRoyalCourtRiddle,

    deleteRoyalCourtRiddle,
  } = useRoyalCourtStore();

  useFocusEffect(
    useCallback(() => {
      getRoyalCourtRiddle();
    }, []),
  );

  const handleDeleteRoyalAdvice = () => {
    deleteRoyalCourtRiddle(adv);
    setToggleMenu(false);
  };

  const addToFavorites = () => {
    if (adv.favorite) setToggleMenu(false);
    else {
      const updatedAdvices = { ...adv, favorite: true };
      setToggleIcon(!toggleIcon);
      saveRoyalCourtRiddle(updatedAdvices, adv);
      setToggleMenu(false);
    }
  };

  const shareRiddle = async () => {
    try {
      await Share.share({
        message: `${adv.royalcourtcat} 
${adv.royalcourtadv}
Correct answer: ${adv.royalcourtansw}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
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
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <View style={styles.royalcourtimgbg}>
              {adv.royalcourtcat === 'Advice from the King' && (
                <Image
                  source={require('../../assets/imgs/royalcourtkng.png')}
                  style={styles.royalcourtlog}
                />
              )}
              {adv.royalcourtcat === 'Advice from the Prince' && (
                <Image
                  source={require('../../assets/imgs/royalcourtprin.png')}
                  style={styles.royalcourtlog}
                />
              )}
              {adv.royalcourtcat === 'Advice from the Queen' && (
                <Image
                  source={require('../../assets/imgs/royalcourtqueen.png')}
                  style={styles.royalcourtlog}
                />
              )}
              {adv.royalcourtcat === 'Advice from the Jester' && (
                <Image
                  source={require('../../assets/imgs/royalcourtjest.png')}
                  style={styles.royalcourtlog}
                />
              )}
            </View>
            <View style={{ alignItems: 'center' }}>
              <View>
                {Platform.OS === 'ios' ? (
                  <Text style={[styles.royalcourtmdttl]}>
                    {adv.royalcourtcat}
                  </Text>
                ) : (
                  <Royalcourtgrdtxt
                    royalCourtPropsTxt={adv.royalcourtcat}
                    style={styles.royalcourtttl}
                  />
                )}
                <View style={{ width: 220 }}>
                  <Text style={styles.royalcourtcorransttl}>
                    {adv.royalcourtadv}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      width: 120,
                      height: 32,
                      borderRadius: 22,
                      backgroundColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.royalcourtanswtxt}>
                      {adv.royalcourtansw}
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Royalcourtmnbtn
                      rangerPropsLabel={'Share'}
                      buttonWidth={90}
                      buttonHeight={30}
                      fontSize={12}
                      rangerPropsImage={require('../../assets/imgs/royalcourtbtn.png')}
                      onPress={shareRiddle}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.royalcourtopnmn}
          activeOpacity={0.6}
          onPress={() => setToggleMenu(!toggleMenu)}
        >
          <Image source={require('../../assets/imgs/royalcourtdel.png')} />
        </TouchableOpacity>
      </LinearGradient>
      <>
        {(adv.favorite || toggleIcon) && (
          <View style={styles.royalcourtliked}>
            <Image source={require('../../assets/imgs/royalcourtfavbg.png')} />
            <Image
              source={require('../../assets/imgs/royalcourtfav.png')}
              style={{ position: 'absolute' }}
            />
          </View>
        )}

        {toggleMenu && (
          <View style={styles.royalcourtmenucnt}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={addToFavorites}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                left: 10,
              }}
            >
              <Image source={require('../../assets/imgs/royalcourtlike.png')} />
              <Text style={styles.royalcourtlkttxt}>Like</Text>
            </TouchableOpacity>

            <View
              style={{ width: '100%', height: 1, backgroundColor: '#fff' }}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={handleDeleteRoyalAdvice}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                left: 10,
              }}
            >
              <Image
                source={require('../../assets/imgs/royalcourtdelete.png')}
              />
              <Text style={styles.royalcourtlkttxt}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  royalcourtmdlbrd: {
    marginBottom: 13,
    borderRadius: 23,
    width: '90%',
  },
  royalcourtmdl: {
    paddingTop: 21,
    paddingHorizontal: 14,
    paddingBottom: 7,
    backgroundColor: '#550101',
    margin: 2,
    borderRadius: 22,
  },
  royalcourtmdttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 24,
    color: '#ECCB64',
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
  royalcourtcorransttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  royalcourtlog: {
    width: 75,
    height: 113,
    top: 5,
  },

  royalcourtlkttxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 23,
    color: '#fff',
  },
  royalcourtmenucnt: {
    width: 117,
    height: 100,
    backgroundColor: '#000',
    position: 'absolute',
    right: -14,
    top: 35,
    borderRadius: 22,
    paddingVertical: 13,
    gap: 5,
  },
  royalcourtopnmn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 14,
  },
  royalcourtliked: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    left: 7,
  },
  royalcourtttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  royalcourtanswtxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Royalcourtriddlecrd;
