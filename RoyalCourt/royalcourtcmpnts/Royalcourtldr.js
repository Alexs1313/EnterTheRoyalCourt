import { Image, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { royalCourtLoaderHTML } from '../royalcourtcnsts/royalcourthtmlldr';

import Royalcourtbg from './Royalcourtbg';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Orientation from 'react-native-orientation-locker';

const Royalcourtldr = () => {
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Royalcourtbg>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/imgs/royalcourtldrbg.png')}
            style={{ width: '100%' }}
          />
          <Image
            source={require('../../assets/imgs/royalcourtldr.png')}
            style={{ position: 'absolute' }}
          />
        </View>
        <View style={{ transform: [{ rotate: '150deg' }], flexGrow: 1 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: royalCourtLoaderHTML }}
            style={styles.fullscreen}
            scrollEnabled={false}
            backgroundColor="transparent"
          />
        </View>
      </Royalcourtbg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 300,
  },
});

export default Royalcourtldr;
