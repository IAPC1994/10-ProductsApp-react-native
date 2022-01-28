import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any,any>{}

export const LoginScreen = ({ navigation }: Props) => {

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
  }

  return( 
    <>
      {/* Background */}
      <Background />

      {/* Keyboard avoid view */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
      >
        <View style={ loginStyles.formContainer }>
          <WhiteLogo />

          <Text style={ loginStyles.title }> Login </Text>

          <Text style={ loginStyles.label }> Email: </Text>
          <TextInput 
              placeholder='Enter your email'
              placeholderTextColor='rgba(255,255,255,0.4)'
              keyboardType='email-address'
              underlineColorAndroid='white'
              style={[ 
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor='white'
              onChangeText={ (value) => onChange( value, 'email' ) }
              value={ email }
              autoCapitalize='none'
              autoCorrect={ false }
              onSubmitEditing={ onLogin }
          />

          <Text style={ loginStyles.label }> Password: </Text>
          <TextInput 
              placeholder='Enter your password'
              placeholderTextColor='rgba(255,255,255,0.4)'
              underlineColorAndroid='white'
              secureTextEntry
              style={[ 
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor='white'
              onChangeText={ (value) => onChange( value, 'password' ) }
              value={ password }
              autoCapitalize='none'
              autoCorrect={ false }
              onSubmitEditing={ onLogin }
          />

          { /* Login Button */}
          <View style={ loginStyles.buttonContainer }>
              <TouchableOpacity
                activeOpacity={ 0.8 }
                style={ loginStyles.button }
                onPress={ onLogin } 
              >
                <Text style={ loginStyles.buttonText }> Login </Text>
              </TouchableOpacity>
          </View>

          { /* Create a new account */}
          <View style={ loginStyles.newUserContainer }>
              <TouchableOpacity
                activeOpacity={ 0.8 }
                onPress={ () => navigation.replace('RegisterScreen') }
              >
                <Text style={ loginStyles.buttonText }> New account </Text>
              </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </>
  );
};
