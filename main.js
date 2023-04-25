const liveTest = 'https://exchange-rates.abstractapi.com/v1/live/?api_key=7413a37a6a6042a287d36afa892fb44f&base=USD&target=EUR';
const liveTestMultiple = 'https://exchange-rates.abstractapi.com/v1/live/?api_key=7413a37a6a6042a287d36afa892fb44f&base=USD&date=2023-04-24';
const liveTestAmount = 'https://exchange-rates.abstractapi.com/v1/convert?api_key=7413a37a6a6042a287d36afa892fb44f&base=USD&target=SGD&date=2020-01-01&base_amount=500'

let baseCurrency = 0;
let baseCurrencyAmount = 0;
let baseCurrencyAmountNumber = 0;
let MultipleBaseCurrency = 0;
let targetCurrency = 0;
let targetCurrencyAmount = 0;
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
    fetchAmountExchangeRate: function(base, target, amount) {
        fetch('https://exchange-rates.abstractapi.com/v1/convert?api_key=' +
        this.apiKey +
        '&base=' + base +
        '&target=' + target +
        '&date=2023-04-23' +
        '&base_amount=' + amount)
        .then((response) => response.json())
        .then((data) => this.displayAmountExchangeRate(data));
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
    },
    displayAmountExchangeRate: function(data) {
        const { base } = data;
        const { base_amount } = data;
        const { target } = data;
        const { converted_amount } = data;
        document.querySelector('.result-amount').innerText = `${base} ${base_amount} = ${target} ${converted_amount}`;
    }
    
}

const getBaseCur = (baseCur) => {
    baseCurrency = baseCur;
    document.querySelector('.base-currency').classList.add("invisible");
}
const getBaseCurAmount = (baseCur) => {
    baseCurrencyAmount = baseCur;
    document.querySelector('.base-currency-amount').classList.add("invisible");
}
const getMultipleBaseCur = (multiBaseCur) => {
    MultipleBaseCurrency = multiBaseCur;
    document.querySelector('.multiple-base-currency').classList.add("invisible");
}
const getTargetCur = (targetCur) => {
    targetCurrency = targetCur;
    document.querySelector('.target-currency').classList.add("invisible");
}
const getTargetCurAmount = (targetCur) => {
    targetCurrencyAmount = targetCur;
    document.querySelector('.target-currency-amount').classList.add("invisible");
}
const addListItem = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    multipleRatesUl.appendChild(li)
}

document.querySelector(".btn-gcr").addEventListener("click", function() {
    exchangeRate.fetchExchangeRate(baseCurrency, targetCurrency);
    document.querySelector('.base-currency').classList.remove("invisible");
    document.querySelector('.target-currency').classList.remove("invisible");
});

document.querySelector(".btn-mgcr").addEventListener("click", function() {
    exchangeRate.fetchMultipleRates(MultipleBaseCurrency);
});

document.querySelector(".btn-gca").addEventListener("click", function() {
    let getAmount = document.querySelector('#AmountToConvert').value;
    getAmount = String(getAmount);
    document.querySelector('.base-currency-amount').classList.remove("invisible");
    document.querySelector('.target-currency-amount').classList.remove("invisible");
    exchangeRate.fetchAmountExchangeRate(baseCurrencyAmount, targetCurrencyAmount, getAmount);
});

