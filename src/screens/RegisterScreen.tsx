import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({ navigation }: Props) => {

    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });
    
    const onRegister = () => {
        console.log({email, password, name});
        Keyboard.dismiss();
    }

    return( 
        <>
          {/* Keyboard avoid view */}
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor:'#5856D6' }}
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
          >
            <View style={ loginStyles.formContainer }>
              <WhiteLogo />
    
              <Text style={ loginStyles.title }> Register </Text>


              <Text style={ loginStyles.label }> Name: </Text>
              <TextInput 
                  placeholder='Enter your name'
                  placeholderTextColor='rgba(255,255,255,0.4)'
                  underlineColorAndroid='white'
                  style={[ 
                    loginStyles.inputField,
                    (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                  ]}
                  selectionColor='white'
                  onChangeText={ (value) => onChange( value, 'name' ) }
                  value={ name }
                  autoCapitalize='words'
                  autoCorrect={ false }
                  onSubmitEditing={ onRegister }
              />
    
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
                  onSubmitEditing={ onRegister }
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
                  onSubmitEditing={ onRegister }
              />
    
              { /* Register Button */}
              <View style={ loginStyles.buttonContainer }>
                  <TouchableOpacity
                    activeOpacity={ 0.8 }
                    style={ loginStyles.button }
                    onPress={ onRegister } 
                  >
                    <Text style={ loginStyles.buttonText }> Create account </Text>
                  </TouchableOpacity>
              </View>
    
              { /* Go back */}
              <View style={{
                  alignItems: 'center',
                  marginTop: 10
              }}>
                <TouchableOpacity
                    onPress={ () => navigation.navigate('LoginScreen') }
                    activeOpacity={ 0.8 }
                    style={
                        loginStyles.buttonReturn
                    }
                >
                    <Text style={ loginStyles.buttonText } > Back to Login</Text>
                </TouchableOpacity>
              </View>
    
            </View>
          </KeyboardAvoidingView>
        </>
      );
};

