export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const getNiceTime = (fromDate, toDate, levels, prefix) => {
  const 
    diff = fromDate - (toDate ? toDate : new Date()),
    diffrent = diff < 0 ? diff * -1 : diff,
    date = new Date(new Date(1970,0,1,0).getTime()+diffrent),
    months = date.getMonth(),
    days = date.getDate() - 1;
  
  if (days > 7 || months > 0) {
    const 
      newDate = new Date(fromDate),
      m = newDate.getMonth() + 1,
      d = newDate.getDate()

    return `${m > 9 ? m : '0' + m}/${d > 9 ? d : '0' + d}`    
  } else {
    return _getNiceTime(fromDate, toDate, levels, prefix)
  }
}

const _getNiceTime = (fromDate, toDate, levels, prefix) => {
  var lang = {
  "date.past": "{0} 전",
  "date.future": "{0} 후",
  "date.now": "방금",
  "date.year": "{0}년",
  "date.years": "{0}년",
  "date.years.prefixed": "{0}년",
  "date.month": "{0}달",
  "date.months": "{0}달",
  "date.months.prefixed": "{0}달",
  "date.day": "{0}일",
  "date.days": "{0}일",
  "date.days.prefixed": "{0}일",
  "date.hour": "{0}시간",
  "date.hours": "{0}시간",
  "date.hours.prefixed": "{0}시간",
  "date.minute": "{0}분",
  "date.minutes": "{0}분",
  "date.minutes.prefixed": "{0}분",
  "date.second": "{0}초",
  "date.seconds": "{0}초",
  "date.seconds.prefixed": "{0}초",
},
langFn = function(id,params){
  var returnValue = lang[id] || "";
  if(params){
      for(var i=0;i<params.length;i++){
          returnValue = returnValue.replace("{"+i+"}",params[i]);
      }
  }
  return returnValue;
},
diff = fromDate - (toDate ? toDate : new Date()),
past = diff < 0 ? true : false,
diffrent = diff < 0 ? diff * -1 : diff,
date = new Date(new Date(1970,0,1,0).getTime()+diffrent),
returnString = '',
count = 0,
years = (date.getFullYear() - 1970);

let langSingle, langMultiple

if(years > 0){
  langSingle = "date.year" + (prefix ? "" : "")
  langMultiple = "date.years" + (prefix ? ".prefixed" : "");
  returnString += (count > 0 ?  ', ' : '') + (years > 1 ? langFn(langMultiple,[years]) : langFn(langSingle,[years]));
  count ++;
}
var months = date.getMonth();
if(count < levels && months > 0){
  langSingle = "date.month" + (prefix ? "" : "")
  langMultiple = "date.months" + (prefix ? ".prefixed" : "");
  returnString += (count > 0 ?  ', ' : '') + (months > 1 ? langFn(langMultiple,[months]) : langFn(langSingle,[months]));
  count ++;
} else {
  if(count > 0)
      count = 99;
}
var days = date.getDate() - 1;
if(count < levels && days > 0){
  langSingle = "date.day" + (prefix ? "" : "")
  langMultiple = "date.days" + (prefix ? ".prefixed" : "");
  returnString += (count > 0 ?  ', ' : '') + (days > 1 ? langFn(langMultiple,[days]) : langFn(langSingle,[days]));
  count ++;
} else {
  if(count > 0)
      count = 99;
}
var hours = date.getHours();
if(count < levels && hours > 0){
  langSingle = "date.hour" + (prefix ? "" : "")
  langMultiple = "date.hours" + (prefix ? ".prefixed" : "");
  returnString += (count > 0 ?  ', ' : '') + (hours > 1 ? langFn(langMultiple,[hours]) : langFn(langSingle,[hours]));
  count ++;
} else {
  if(count > 0)
      count = 99;
}
var minutes = date.getMinutes();
if(count < levels && minutes > 0){
  langSingle = "date.minute" + (prefix ? "" : "")
  langMultiple = "date.minutes" + (prefix ? ".prefixed" : "");
  returnString += (count > 0 ?  ', ' : '') + (minutes > 1 ? langFn(langMultiple,[minutes]) : langFn(langSingle,[minutes]));
  count ++;
} else {
  if(count > 0)
      count = 99;
}
var seconds = date.getSeconds();
if(count < levels && seconds > 0){
  langSingle = "date.second" + (prefix ? "" : "")
  langMultiple = "date.seconds" + (prefix ? ".prefixed" : "");
  returnString += (count > 0 ?  ', ' : '') + (seconds > 1 ? langFn(langMultiple,[seconds]) : langFn(langSingle,[seconds]));
  count ++;
} else {
  if(count > 0)
      count = 99;
}
if(prefix){
  if(returnString === ""){
      returnString = langFn("date.now");
  } else if(past)
      returnString = langFn("date.past",[returnString]);
  else
      returnString = langFn("date.future",[returnString]);
}
return returnString;
}

export const numberWithCommas = (x) => {
  return String(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getCookie = (cookieName) => {
  let cookieValue
  if(document.cookie){
      const array = document.cookie.split((escape(cookieName)+'='))
      if(array.length >= 2){
          const arraySub = array[1].split(';')
          cookieValue = unescape(arraySub[0])
      }
  }
  return cookieValue
}

