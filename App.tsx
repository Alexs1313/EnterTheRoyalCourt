import { NavigationContainer } from '@react-navigation/native';
import Royalcourtstcknv from './RoyalCourt/royalcourtnv/Royalcourtstcknv';
import { RoyalCourtContextProvider } from './RoyalCourt/royalcourtstr/royalcourtcntx';
import { useEffect, useState } from 'react';
import Royalcourtldr from './RoyalCourt/royalcourtcmpnts/Royalcourtldr';

const App = () => {
  const [showRoyalCourtLdr, setShowRoyalCourtLdr] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowRoyalCourtLdr(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <RoyalCourtContextProvider>
        {showRoyalCourtLdr ? <Royalcourtstcknv /> : <Royalcourtldr />}
      </RoyalCourtContextProvider>
    </NavigationContainer>
  );
};

export default App;
