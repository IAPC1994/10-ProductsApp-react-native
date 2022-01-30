import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafeApi';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }:  { children: JSX.Element | JSX.Element[] } ) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    useEffect(() => {
       checkToken();
    }, []);
    
    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        const { data, status } = await cafeApi.get('/auth');

        if( status !== 200 ){
            return dispatch({ type: 'notAuthenticated' });
        } 

        await AsyncStorage.setItem( 'token', data.token );

        dispatch({ type:'signUp', payload:{
            token: data.token,
            user: data.usuario
        }});
    }

    const signIn = async( { correo, password }: LoginData ) => {
        try {
            
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({ type:'signUp', payload:{
                token: data.token,
                user: data.usuario
            }});

            await AsyncStorage.setItem( 'token', data.token );

        } catch (error: any) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg || 'Incorrect information'
            })
        }
    };

    const signUp = async( { nombre, correo, password }: RegisterData ) => {
        try {
            
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', { nombre, correo, password });
            dispatch({ type: 'signUp', payload: { 
                token: data.token, 
                user: data.usuario 
            }});

            await AsyncStorage.setItem( 'token', data.token );

        } catch (error: any) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.errors[0].msg || 'Incorrect information'
            })
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    );
}