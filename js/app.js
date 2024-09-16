const cryptoSelect = document.querySelector("#cryptos")
const currencySelect = document.querySelector("#currency")
const formulario = document.querySelector("#formulario")
const result = document.querySelector("#resultado")

const searchObj = {
    currency: "",
    cryptoCurrency: "",
}

//Primise
const getCryptos = cryptos => new Promise(resolve => {
    resolve(cryptos)
})

document.addEventListener(`DOMContentLoaded`, () => {
    fetchCryptos()

    formulario.addEventListener("submit", submitForm)

    cryptoSelect.addEventListener("change", readValue)
    currencySelect.addEventListener("change", readValue)
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

function readValue(e) {
    searchObj[e.target.name] = e.target.value
    console.log(searchObj);


}

function submitForm(e) {
    e.preventDefault();

    //Verify 
    const { currency, cryptoCurrency } = searchObj

    if (currency === '' || cryptoCurrency === '') {
        showAlert("Ambos os campos são obrigatórios")
        return
    }

    //Api results
    apiRequest()

}

function showAlert(msg) {

    const existError = document.querySelector(".error")


    if (!existError) {
        const divMsg = document.createElement("div")
        divMsg.classList.add('error')

        divMsg.textContent = msg

        formulario.appendChild(divMsg)

        setTimeout(() => {
            divMsg.remove()
        }, 1000);
    }
}

function apiRequest() {
    const { currency, cryptoCurrency } = searchObj;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`

    showSipnner();

    fetch(url)
        .then(response => response.json())
        .then(quotation => showQuotation(quotation.DISPLAY[cryptoCurrency][currency]))
}

function showQuotation(quotation) {

    clearHtml()

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quotation


    const price = document.createElement("p")
    price.classList.add('.price')
    price.innerHTML = `O Preço é: <span>${PRICE}</span>`

    const highPrice = document.createElement("p")
    highPrice.innerHTML = `<p> O maior preço do dia: <span>${HIGHDAY}</span>`


    const lowPrice = document.createElement("p")
    lowPrice.innerHTML = `<p> O maior preço do dia: <span>${LOWDAY}</span>`

    const last24Hours = document.createElement("p")
    last24Hours.innerHTML = `<p> Variação do dia: <span>${CHANGEPCT24HOUR}%</span>`

    const lastUp = document.createElement("p")
    lastUp.innerHTML = `<p> Ultima atualização: <span>${LASTUPDATE}</span>`

    result.appendChild(price)
    result.appendChild(highPrice)
    result.appendChild(lowPrice)
    result.appendChild(last24Hours)
    result.appendChild(lastUp)


}

function clearHtml() {
    while (result.firstChild) {
        result.removeChild(result.firstChild)
    }
}
function showSipnner() {
    clearHtml()

    const spinner = document.createElement("div")

    spinner.classList.add('spinner')

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `
    result.appendChild(spinner)
}