const liveTest = 'https://exchange-rates.abstractapi.com/v1/live/?api_key=7413a37a6a6042a287d36afa892fb44f&base=USD&target=EUR';
const liveTestMultiple = 'https://exchange-rates.abstractapi.com/v1/live/?api_key=7413a37a6a6042a287d36afa892fb44f&base=USD&date=2023-04-24';

let baseCurrency = 0;
let MultipleBaseCurrency = 0;
let targetCurrency = 0;
let todayDate = new Date().toISOString().slice(0, 10);
const multipleRatesUl = document.querySelector('.li-goes-here');



let exchangeRate = {
    apiKey:  '7413a37a6a6042a287d36afa892fb44f',
    fetchExchangeRate: function(base, target) {
        fetch('https://exchange-rates.abstractapi.com/v1/live/?api_key=' +
        this.apiKey + 
        '&base=' + base + 
        '&target=' + target)
        .then((response) => response.json())
        .then((data) => this.displayRate(data));
        console.log("yes");
    },

    fetchMultipleRates: function(base) {
        fetch('https://exchange-rates.abstractapi.com/v1/live/?api_key=' + 
        this.apiKey + 
        '&base=' + base +
        '&date=' + 
        String(todayDate))
        .then((response) => response.json())
        .then((data) => this.displayMultipleRates(data));
    },
    displayRate: function(data) {
        const { base } = data;
        const { exchange_rates } = data;
        document.querySelector('.result').innerText = '1 ' + base + ' = ' + Object.keys(exchange_rates)[0] + ': ' + Object.values(exchange_rates)[0];
    },
    displayMultipleRates: function(data) {
        const { base } = data;
        const { exchange_rates } = data;
        for (let i = 0; i < Object.keys(exchange_rates).length ; i++) {
            addListItem('1 ' + base + ' = ' + Object.keys(exchange_rates)[i] + ': ' + Object.values(exchange_rates)[i]);
        }
    }
    
}

document.querySelector(".btn-gcr").addEventListener("click", function() {
    exchangeRate.fetchExchangeRate(baseCurrency, targetCurrency);
});

document.querySelector(".btn-mgcr").addEventListener("click", function() {
    exchangeRate.fetchMultipleRates(MultipleBaseCurrency);
});


const getBaseCur = (baseCur) => {
    baseCurrency = baseCur;
    document.querySelector('.base-currency1').classList.add("invisible");
}

const getMultipleBaseCur = (mulitBaseCur) => {
    MultipleBaseCurrency = mulitBaseCur;
    document.querySelector('.multiple-base-currency').classList.add("invisible");
}

const getTargetCur = (targetCur) => {
    targetCurrency = targetCur;
    document.querySelector('.target-currency1').classList.add("invisible");
}

const addListItem = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    multipleRatesUl.appendChild(li)
}

//https://exchange-rates.abstractapi.com/v1/historical
//? api_key = YOUR_UNIQUE_API_KEY
//& base = USD
//& date = 2020-08-31