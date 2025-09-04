import {
  StyleSheet,
  Text as Royalcourttxt,
  View as Royalcourtview,
  Image,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import Royalcourtbg from '../../royalcourtcmpnts/Royalcourtbg';
import { royalcourtondta } from '../../royalcourtcnsts/royalcourtondta';
import { Royalcourtgrdtxt } from '../../royalcourtcmpnts/Royalcourtgrdtxt';
import { useState } from 'react';
import Royalcourtmnbtn from '../../royalcourtcmpnts/Royalcourtmnbtn';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoyalCourtStore } from '../../royalcourtstr/royalcourtcntx';

const Royalcountwlc = () => {
  const [royalCourtCurrSctn, setRoyalCourtCurrSctn] = useState(0);
  const [showRoyalCourtReg, setShowRoyalCourtReg] = useState(0);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const royalcourtnav = useNavigation();
  const {
    royalCourtName,
    setRoyalCourtName,
    royalCourtPht,
    setRoyalCourtPht,
    setRoyalCourtDate,
  } = useRoyalCourtStore();

  const getRyalCourtDt = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
  };

  let royalcourtopt = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  const launchRoyalCourtPckr = () => {
    launchImageLibrary(royalcourtopt, response => {
      if (response.didCancel) return;

      setRoyalCourtPht(response.assets[0].uri);
    });
  };

  return (
    <Royalcourtbg>
      {showRoyalCourtReg ? (
        <Royalcourtview
          style={{ alignItems: 'centers', justifyContent: 'center', flex: 1 }}
        >
          <Royalcourtview style={styles.royalcourtregcnt}>
            <Royalcourtgrdtxt
              royalCourtPropsTxt={'Registration'}
              style={styles.royalcourtttl}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.royalcourtpckrcnt}
              onPress={launchRoyalCourtPckr}
            >
              {royalCourtPht ? (
                <Image
                  source={{ uri: royalCourtPht }}
                  style={styles.royalcourtpckimg}
                />
              ) : (
                <>
                  <Image
                    source={require('../../../assets/imgs/royalcourtadd.png')}
                  />
                  <Royalcourttxt style={styles.royalcourtpcktxt}>
                    Add Photo
                  </Royalcourttxt>
                </>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Name"
              value={royalCourtName}
              onChangeText={setRoyalCourtName}
              maxLength={10}
              style={[
                styles.royalcourtinpt,
                royalCourtName && { color: '#fff', fontSize: 15 },
              ]}
              placeholderTextColor={'#414141'}
            />

            {royalCourtName && (
              <Royalcourtmnbtn
                rangerPropsLabel={'Start'}
                buttonWidth={183}
                buttonHeight={72}
                fontSize={24}
                rangerPropsImage={require('../../../assets/imgs/royalcourtbtn.png')}
                onPress={() => {
                  royalcourtnav.navigate('Royalcourtbottomtbs');
                  setRoyalCourtDate(getRyalCourtDt());
                }}
              />
            )}
          </Royalcourtview>
        </Royalcourtview>
      ) : (
        <>
          <Royalcourtview style={styles.royalcourtcnt}>
            <Image
              source={royalcourtondta[royalCourtCurrSctn].royalcourtimg}
              style={[
                { width },
                (royalCourtCurrSctn === 0 || royalCourtCurrSctn === 1) && {
                  marginTop: 79,
                  top: 25,
                },
                isLandscape && { width: 400 },
              ]}
            />
          </Royalcourtview>
          <Royalcourtview
            style={[
              styles.royalcourtwlccnt,
              royalCourtCurrSctn === 2 && { top: -40 },
            ]}
          >
            <Royalcourtgrdtxt
              royalCourtPropsTxt={
                royalcourtondta[royalCourtCurrSctn].royalcourtttl
              }
              style={styles.royalcourtttl}
            />
            <Royalcourttxt style={styles.royalcourtsbt}>
              {royalcourtondta[royalCourtCurrSctn].royalcourtsbt}
            </Royalcourttxt>
            <Royalcourtmnbtn
              rangerPropsLabel={
                royalcourtondta[royalCourtCurrSctn].royalcourtbtn
              }
              buttonWidth={183}
              buttonHeight={72}
              fontSize={24}
              rangerPropsImage={require('../../../assets/imgs/royalcourtbtn.png')}
              onPress={() =>
                royalCourtCurrSctn === 3
                  ? setShowRoyalCourtReg(true)
                  : setRoyalCourtCurrSctn(prevSctn => prevSctn + 1)
              }
            />
          </Royalcourtview>
        </>
      )}
    </Royalcourtbg>
  );
};

const styles = StyleSheet.create({
  royalcourtcnt: {
    padding: 5,
    alignItems: 'center',
  },
  royalcourtwlccnt: {
    width: '100%',
    backgroundColor: '#550101',
    height: '100%',
    borderRadius: 22,
    paddingTop: 33,
    padding: 5,
    alignItems: 'center',
  },
  royalcourtttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  royalcourtsbt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    paddingHorizontal: 45,
    marginTop: 48,
    marginBottom: 38,
  },
  royalcourtregcnt: {
    width: '100%',
    backgroundColor: '#550101',
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 60,
    padding: 5,
    alignItems: 'center',
  },
  royalcourtpckrcnt: {
    width: 149,
    height: 149,
    borderRadius: 22,
    backgroundColor: '#260101',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  royalcourtpcktxt: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
  royalcourtpckimg: {
    width: 149,
    height: 149,
    borderRadius: 22,
  },
  royalcourtinpt: {
    width: '100%',
    height: 55,
    backgroundColor: '#260101',
    borderRadius: 22,
    fontFamily: 'SpicyRice-Regular',
    fontSize: 14,
    color: '#414141',
    paddingHorizontal: 15,
    marginBottom: 33,
  },
});

export default Royalcountwlc;
