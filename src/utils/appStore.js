import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import { connect } from 'react-redux';
export const store = configureStore({
    reducer:{
        user : userReducer,
        feed : feedReducer,
        connections : connectionReducer
    }
})