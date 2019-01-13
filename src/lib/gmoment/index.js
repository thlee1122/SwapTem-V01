'use strict';

const gmoment = (inputDate) => {

  let state = {};

  const ERR_INVALID_CODE = {
    1 : 'Error: The input is an invalid format. Please try YYYY-MM-DD.',
    2 : 'Error: The month format should range from 1-12'
  };

  const setState = (key, value) => state[key] = value;

  const setDate = (newDate) => {

    let dateArray = "";

    if(newDate.includes("-")) {
      dateArray = newDate.split('-');

      if (dateArray.length === 3) {
        setState('date', {
            'year'  : dateArray[0],
            'month' : dateArray[1],
            'day'   : dateArray[2]
        });
      } else {
        setState('error', 1);
      }
      
    } else if(newDate.includes("/")) {
      dateArray = newDate.split("/");

      if(dateArray.length === 3) {
        setState('date', {
            'year'  : dateArray[2],
            'month' : dateArray[0],
            'day'   : dateArray[1]
        });
      } else {
        setState('error', 1);
      }
    }
  };

  if (inputDate) {
    setDate(inputDate.split("T")[0]);
  } else {
    setDate(new Date().toISOString().split("T")[0]);
  }

  const convertMonth = (month) => {

    const months = {
      '01' : 'January',
      '02' : 'February',
      '03' : 'March',
      '04' : 'April',
      '05' : 'May',
      '06' : 'June',
      '07' : 'July',
      '08' : 'August',
      '09' : 'September',
      '10' : 'October',
      '11' : 'November',
      '12' : 'December'
    };

    let targetMonth = month.length < 2 ? months['0' + month] : months[month];
    
    if (targetMonth) {
      return targetMonth;
    } else {
      setState('error', 2);
      return '';
    }

  };

  const replaceToken = (inputString, token, replacement) => {

    const headChar = token.substr(token.length - 1);
    const tailChar = token.substr(0, 1);
    let startIndex = 0;
    let foundIndex = inputString.indexOf(token, startIndex);

    let newArray = [];

    while( ~foundIndex ) {

      let leftSegment = inputString.substr(startIndex, (foundIndex - startIndex));

      if (leftSegment !== "") {
        newArray.push(leftSegment);
      }

      let nextChar = inputString.substr(foundIndex + token.length, 1);
      let prevChar = foundIndex - 1 >= 0 ? inputString.substr(foundIndex - 1, 1) : '';

      if (nextChar === headChar || prevChar === tailChar) {
        startIndex = foundIndex + token.length + 1;
        newArray.push(inputString.substr(foundIndex, token.length + 1));
      } else {
        startIndex = foundIndex + token.length;
        newArray.push(replacement);
      }

      foundIndex = inputString.indexOf(token, startIndex);

    }

    if (startIndex < inputString.length) {
      newArray.push(inputString.substr(startIndex));
    }

    return newArray.join('');
  
  };

  const replaceTokens = (inputString) => {

    let outputString = inputString;

    const tokens = {
      'DD'    : state.date.day,
      'MM'    : state.date.month,
      'MMMM'  : convertMonth(state.date.month),
      'YYYY'  : state.date.year
    };

    Object.keys(tokens).forEach(function eachKey(token) {
      outputString = replaceToken(outputString, token, tokens[token]);
    });

    return outputString;

  };

  return {

    format(inputString = 'DD MMMM YYYY') {

      if (state.error) {
        return ERR_INVALID_CODE[state.error];
      } else {
        let outputString = replaceTokens(inputString);
        return state.error ? ERR_INVALID_CODE[state.error] : outputString;
      }

    }

  };

};

export default gmoment;