const convertButton = document.querySelector('.convert-button')
const currencySelect = document.querySelector('.currency-select')

function convertValues() {
    const inputCurrencyValue = document.querySelector('.input-currency').value
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert') // Valor em Real //
    const currencyValueConverted = document.querySelector('.currency-value') // outras moedas //


    const dolarToday = 5.2
    const euroToday = 6.2
    const libraToday = 6.9
    const ieneToday = 0.03
    const yuanToday = 0.76

    if (currencySelect.value == 'dolar') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(inputCurrencyValue / dolarToday)
    }

    if (currencySelect.value == 'euro') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(inputCurrencyValue / euroToday)
    }

    if (currencySelect.value == 'libra') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(inputCurrencyValue / libraToday)
    }

     if (currencySelect.value == 'iene') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(inputCurrencyValue / ieneToday)
    }

      if (currencySelect.value == 'yuan') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY'
        }).format(inputCurrencyValue / ieneToday)
    }


    currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(inputCurrencyValue)

}
function changeCurrency() {
    const currencyName = document.getElementById('currency-name')
    const currencyImage = document.querySelector('.currency-img')

    if(currencySelect.value == 'dolar'){
       currencyName.innerHTML = 'Dólar Americano'
       currencyImage.src = './assets/dolar.png' 
    }

     if(currencySelect.value == 'euro'){
       currencyName.innerHTML = 'Euro'
       currencyImage.src = './assets/euro.png'  
    }

    if(currencySelect.value == 'libra'){
       currencyName.innerHTML = 'Libra Esterlina'
       currencyImage.src = './assets/libra.png'  
    }

     if(currencySelect.value == 'iene'){
       currencyName.innerHTML = 'Iene Japones'
       currencyImage.src = './assets/yen.png'  
    }

     if(currencySelect.value == 'yuan'){
       currencyName.innerHTML = 'CN¥ Yuan Chinês'
       currencyImage.src = './assets/yuan.png'  
    }

    convertValues()
}

currencySelect.addEventListener('change', changeCurrency)
convertButton.addEventListener('click', convertValues)
