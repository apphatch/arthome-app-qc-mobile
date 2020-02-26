import React, {memo, useState} from 'react';
// import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

// ### components
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

// ### validations
import {emailValidator, passwordValidator} from './validations';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const _onLoginPressed = () => {
    // const emailError = emailValidator(email.value);
    // const passwordError = passwordValidator(password.value);

    // if (emailError || passwordError) {
    //   setEmail({...email, error: emailError});
    //   setPassword({...password, error: passwordError});
    //   return;
    // }

    navigation.navigate('ShopScreen');
  };

  return (
    <Background>
      <Logo />

      <Header>Xin chào.</Header>

      <TextInput
        label="Tài khoản"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Đăng nhập
      </Button>
    </Background>
  );
};

export default memo(LoginScreen);
