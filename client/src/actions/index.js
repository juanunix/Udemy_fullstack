import axios from 'axios'
import { FETCH_USER as type } from './types'

export const fetchUser = () => dispatch =>
  axios
  .get('/api/current_user')
  .then(payload => dispatch({ type, payload }))
