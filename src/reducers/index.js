import { combineReducers } from 'redux';

function weatherInfo(state = {}, action){

  switch(action.type){
      case 'INFO_IS_LOADING':
      case 'INFO_HAS_ERRORED':
      case 'INFO_FETCH_DATA_SUCCESS':
        return action.payload;
      default:
        return state;
  }

}


export const rootReducer = combineReducers({
    weatherInfo
});
