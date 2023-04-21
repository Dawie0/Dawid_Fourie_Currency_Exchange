const liveTest = 'https://exchange-rates.abstractapi.com/v1/live/?api_key=7413a37a6a6042a287d36afa892fb44f&base=USD&target=EUR';


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
    displayRate: function(data) {
        const { base } = data;
        const { exchange_rates } = data;
        document.querySelector('.base-currency').innerText = base;
        console.log(Object.values(exchange_rates).length);
        document.querySelector('.target-currency').innerText = Object.values(exchange_rates)[0];
    }

    
}

document.querySelector(".btn-gcr").addEventListener("click", function() {
    exchangeRate.fetchExchangeRate('USD', 'CAD');
});





