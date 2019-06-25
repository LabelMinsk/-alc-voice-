//gotten values
function getHistory() {
  return document.getElementById('history-value').innerText;
}
//print input value
function printHistory(num) {
  document.getElementById('history-value').innerText = num;
}
//get input value
function getOutput() {
  return document.getElementById('output-value').innerText;
}
//check value and ..
function printOutput(num) {
  if(num ===''){
    document.getElementById('output-value').innerText = num;
  }else{
    document.getElementById('output-value').innerText = getFormattedNumber(num);
  }
}
//convert
function getFormattedNumber(num) {
  if(num ==='-'){
    return '';
  }
  return  Number(num).toLocaleString('en');
}
//cut ',' and string to num
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g,''));
}

//addEvent '+' '-' '/' ....
let operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function(){
    if(this.id ==='clear'){
      printHistory('');
      printOutput('0');
    }
    else if(this.id ==='backspace'){
      let output = reverseNumberFormat(getOutput()).toString();
      if(output) {//has a value
        output = output.substr(0,output.length-1);
        printOutput(output);
      }
    }
    else{
      let output = getOutput();
      let history = getHistory();
      if(output==='' && history !== ''){
        if(isNaN(history[history.length - 1])){
          history = history.substr(0,history.length - 1);
        }
      }
      if(output!=='' || history !== ''){
        output = output ==='' ? output : reverseNumberFormat(output);
        history = history + output;
         if(this.id ==='='){
           let result = eval(history);
           printOutput(result);
           printHistory('');
         }
         else{
           history = history + this.id;
           printHistory(history);
           printOutput('');
         }
      }
    }
  });
}

//Enter numbers
const number = document.getElementsByClassName('number');
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function(){
    let output = reverseNumberFormat(getOutput());
    if(!isNaN(output)){
      output = output + this.id;
      printOutput(output);
    }
  })
}

const microphone = document.getElementById('microphone');
microphone.onclick=function(){
  microphone.classList.add("record");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  //recognition.lang = 'ru-RU';
  recognition.lang = 'en-US';
  recognition.start();
  let operations = {
    "plus": "+",
    "minus": "-",
    "multiply": "*",
    "multiplied": "*",
    "divide": "/",
    "divided": "/",
    "reminder": "%"

    /* 'плюс':"+",
     "минус":"-",
     "умножить":"*",
     "умножить на":"*",
     "делить":"/",
     "процент":"%"*/
  };


  recognition.onresult = function(event){
    let input = event.results[0][0].transcript;
    for(let property in operations){
      input= input.replace(property, operations[property]);
    }
    document.getElementById("output-value").innerText = input;
    setTimeout(function(){
      evaluate(input);
    },2000);
    microphone.classList.remove("record");
  }

};
function evaluate(input){
  try{
    let result = eval(input);
    document.getElementById("output-value").innerText = result;
  }
  catch(e){
    console.log(e);
    document.getElementById("output-value").innerText = "";
  }
}