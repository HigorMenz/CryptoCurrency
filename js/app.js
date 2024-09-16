const cryptoSelect = document.querySelector("#cryptos")

//Primise
const getCryptos = cryptos => new Promise(resolve => {
    resolve(cryptos)
})

document.addEventListener(`DOMContentLoaded`, () => {
    fetchCryptos()

})

function fetchCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=brl'

    fetch(url)
        .then(response => response.json())
        .then(result => getCryptos(result.Data))
        .then(cryptos => selectCryptos(cryptos))
}


function selectCryptos(cryptos) {


    cryptos.forEach(crypto => {
        const { FullName, Name } = crypto.CoinInfo;

        const option = document.createElement('option')
        option.value = Name
        option.textContent = FullName
        cryptoSelect.appendChild(option)
    })
}