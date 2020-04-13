import Reactotron from 'reactotron-react-native';

export const logger = (text = 'value need to know is: ', data) => {
  Reactotron.log(text, data);
};
