import { ImageBackground, ScrollView } from 'react-native';

const Royalcourtbg = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/imgs/royalcourtbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Royalcourtbg;
