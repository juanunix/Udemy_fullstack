import { combineReducers } from 'redux'
import auth from './authReducer'
import { reducer as form } from 'redux-form'

export default combineReducers({ auth, form })
