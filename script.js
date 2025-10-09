// Your API Key: 6f50b55e5e1efa9ef5f972ae
// Example Request: https://v6.exchangerate-api.com/v6/6f50b55e5e1efa9ef5f972ae/latest/


const Base_Url =   "https://v6.exchangerate-api.com/v6/6f50b55e5e1efa9ef5f972ae/latest";

const dropDowns = document.querySelectorAll(".dropDown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")

for(let select of dropDowns){
    for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode==="USD"){
        newOption.selected = "selected";
    }else if (select.name ==="to" && currCode ==="PKR"){
        newOption.selected = "selected";
    }


    select.append(newOption);

}

    // Calling updateFlag function and applying Listener
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

//function for changing flags whenever country update

const updateFlag = (element) => {
  let currCode = element.value
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` 
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
    
}

btn.addEventListener  ("click", async (evt)=>{
    evt.preventDefault(); //the URL would't be change auto now we will control it
    let amount = document.querySelector (".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal<1){
        amtVal = 1;
       amount.value = "1";
    }
console.log(fromCurr.value,toCurr.value);
   const URL = `${Base_Url}/${fromCurr.value}`//URL of API
   let response = await fetch (URL); //use to Fetch 
   let data = await response.json();//convert data to readable format
   let rate = data.conversion_rates[toCurr.value];//convert the rate to other currency
   let finalAmount = (amtVal*rate).toFixed(2);//will muliply amount of user
   console.log(finalAmount);

   msg.innerText=`${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;//1USD = 283PKR
});

