import axios from 'axios';

export function infoLoading(){
  return {
    type: 'INFO_IS_LOADING',
    payload:{
      status: 'isLoading'
    }
  }
}

export function infoHasErrored(error){
  return {
    type: 'INFO_HAS_ERRORED',
    payload:{
      status: 'hasErrored',
      error
    }
  }
}

export function infoFetchDataSuccess(data){
  return {
    type: 'INFO_FETCH_DATA_SUCCESS',
    payload:{
      status: 'success',
      data
    }
  }
}

export function fetchWeatherInfo(city=''){
    return function(dispatch){

      dispatch(infoLoading(true));

      const cityIndex = city.replace(" ", "").toLowerCase(); //index for localStorage
      let data = (localStorage.getItem(cityIndex) !==null) && JSON.parse(localStorage.getItem(cityIndex)),
          current = new Date().getTime(),
          threshold = (data.timestamp) && (data.timestamp+600000);

      //fetch data from localStorage if this request is within 10min threshold
      if(data!== null && (current<threshold)){

          let action = (current<threshold)? infoFetchDataSuccess(data) : infoHasErrored('TTL threshold error');
          dispatch(action);

      }else{

          const apiKey = `dce9ac51e02964915538fac1075ddbe5`;
          const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

          axios.get(apiURL).then(res => {

                let newData = JSON.stringify({
                  timestamp: new Date().getTime(),
                  ...res.data
                });

                localStorage.setItem(cityIndex, newData);
                dispatch(infoFetchDataSuccess(res.data));

            }).catch(error => {
                dispatch(infoHasErrored('Async operation error'));
          });
      }

    }
}
