import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useRoyalCourtStore = () => {
  return useContext(StoreContext);
};

export const RoyalCourtContextProvider = ({ children }) => {
  const [savedRoyalCourtAdvices, setSavedRoyalCourtAdvices] = useState([]);
  const [savedRoyalCourtRiddles, setSavedRoyalCourtRiddles] = useState([]);
  const [royalCourtPht, setRoyalCourtPht] = useState('');
  const [royalCourtName, setRoyalCourtName] = useState('');
  const [royalCourtDate, setRoyalCourtDate] = useState('');

  // advices

  const saveRoyalCourtAdvice = async (data, edit) => {
    try {
      const stored = await AsyncStorage.getItem('royal_court_advs');
      let advice = stored !== null ? JSON.parse(stored) : [];

      let updatedAdvs;

      if (edit?.id) {
        updatedAdvs = savedRoyalCourtAdvices.map(movie =>
          movie.id === edit.id ? data : movie,
        );
      } else {
        updatedAdvs = [...advice, data];
      }

      await AsyncStorage.setItem(
        'royal_court_advs',
        JSON.stringify(updatedAdvs),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getRoyalCourtAdvice = async () => {
    try {
      const savedData = await AsyncStorage.getItem('royal_court_advs');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedRoyalCourtAdvices(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoyalCourtAdvice = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('royal_court_advs');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    console.log('data', data);

    const filtered = data.filter(item => item.id !== selectedId.id);
    console.log('filtered', filtered);

    setSavedRoyalCourtAdvices(filtered);
    await AsyncStorage.setItem('royal_court_advs', JSON.stringify(filtered));
  };

  // riddles

  const saveRoyalCourtRiddle = async (data, edit) => {
    try {
      const stored = await AsyncStorage.getItem('royal_court_riddle');
      let riddle = stored !== null ? JSON.parse(stored) : [];

      let updatedRiddles;

      if (edit?.id) {
        updatedRiddles = savedRoyalCourtRiddles.map(rid =>
          rid.id === edit.id ? data : rid,
        );
      } else {
        updatedRiddles = [...riddle, data];
      }

      await AsyncStorage.setItem(
        'royal_court_riddle',
        JSON.stringify(updatedRiddles),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getRoyalCourtRiddle = async () => {
    try {
      const savedData = await AsyncStorage.getItem('royal_court_riddle');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedRoyalCourtRiddles(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoyalCourtRiddle = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('royal_court_riddle');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedId.id);
    console.log('filtered', filtered);

    setSavedRoyalCourtRiddles(filtered);
    await AsyncStorage.setItem('royal_court_riddle', JSON.stringify(filtered));
  };

  const value = {
    saveRoyalCourtAdvice,
    getRoyalCourtAdvice,
    deleteRoyalCourtAdvice,
    savedRoyalCourtAdvices,
    royalCourtPht,
    setRoyalCourtPht,
    royalCourtName,
    setRoyalCourtName,
    royalCourtDate,
    setRoyalCourtDate,
    saveRoyalCourtRiddle,
    getRoyalCourtRiddle,
    deleteRoyalCourtRiddle,
    savedRoyalCourtRiddles,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
