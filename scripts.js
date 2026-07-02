// 1. MAPEAMENTO DE DADOS DAS MOEDAS
const currencies = {
    real: { name: 'Real Brasileiro', locale: 'pt-BR', currency: 'BRL', img: './assets/real.png' },
    dolar: { name: 'Dólar Americano', locale: 'en-US', currency: 'USD', img: './assets/dolar.png' },
    euro: { name: 'Euro', locale: 'de-DE', currency: 'EUR', img: './assets/euro.png' },
    libra: { name: 'Libra Esterlina', locale: 'en-GB', currency: 'GBP', img: './assets/libra.png' },
    iene: { name: 'Iene Japonês', locale: 'ja-JP', currency: 'JPY', img: './assets/yen.png' },
    yuan: { name: 'Yuan Chinês', locale: 'zh-CN', currency: 'CNY', img: './assets/yuan.png' },
    Bitcoin: { name: 'Bitcoin', img: './assets/bitcoin.png' } // Caso especial
};

// 2. SELEÇÃO DOS ELEMENTOS DO HTML
const convertButton = document.querySelector('.convert-button');
const inputCurrencyValue = document.querySelector('.input-currency');

const selectFrom = document.getElementById('currency-select-from');
const selectTo = document.getElementById('currency-select-to');

const swapButton = document.getElementById('swap-button');

const currencyImgFrom = document.getElementById('currency-img-from');
const currencyNameFrom = document.getElementById('currency-name-from');
const currencyValueFrom = document.getElementById('currency-value-from');

const currencyImgTo = document.getElementById('currency-img-to');
const currencyNameTo = document.getElementById('currency-name-to');
const currencyValueTo = document.getElementById('currency-value-to');


// 3. FUNÇÃO DE CONVERSÃO
async function convertValues() {
    const amountToConvert = parseFloat(inputCurrencyValue.value.replace(",", ".")) || 0;
    const currencyFrom = selectFrom.value;
    const currencyTo = selectTo.value;

    // Se as moedas forem iguais, não precisa de API, apenas formata e exibe.
    if (currencyFrom === currencyTo) {
        formatCurrency(currencyValueFrom, amountToConvert, currencyFrom);
        formatCurrency(currencyValueTo, amountToConvert, currencyTo);
        return;
    }

    // Busca os dados da API
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,JPY-BRL,CNY-BRL")
        .then(response => response.json())
        .catch(error => {
            console.error("Erro ao buscar dados da API:", error);
            alert("Não foi possível buscar as cotações. Tente novamente mais tarde.");
            return;
        });

    if (!data) return;

    // Monta um objeto com as cotações, adicionando o Real com valor 1.
    const rates = {
        real: 1,
        dolar: parseFloat(data.USDBRL.high),
        euro: parseFloat(data.EURBRL.high),
        Bitcoin: parseFloat(data.BTCBRL.high) * 1000, // API retorna valor em milhares
        libra: parseFloat(data.GBPBRL.high),
        iene: parseFloat(data.JPYBRL.high),
        yuan: parseFloat(data.CNYBRL.high)
    };

    // Pega a cotação da moeda de origem e destino
    const rateFrom = rates[currencyFrom];
    const rateTo = rates[currencyTo];

    // Calcula o valor convertido
    const convertedValue = (amountToConvert * rateFrom) / rateTo;

    // Formata e exibe os valores na tela
    formatCurrency(currencyValueFrom, amountToConvert, currencyFrom);
    formatCurrency(currencyValueTo, convertedValue, currencyTo);
}

// 4. FUNÇÃO AUXILIAR PARA FORMATAR MOEDA
function formatCurrency(element, value, currencyKey) {
    const currencyInfo = currencies[currencyKey];

    // Caso especial para Bitcoin
    if (currencyKey === 'Bitcoin') {
        element.innerHTML = `${value > 0 ? value.toFixed(8).replace(".", ",") : "0,00000000"} BTC`;
        return;
    }

    // Formatação padrão para outras moedas
    element.innerHTML = new Intl.NumberFormat(currencyInfo.locale, {
        style: 'currency',
        currency: currencyInfo.currency
    }).format(value);
}


// 5. FUNÇÃO PARA ATUALIZAR A INTERFACE (IMAGEM E NOME)
function updateUI() {
    const currencyFromKey = selectFrom.value;
    const currencyToKey = selectTo.value;

    const infoFrom = currencies[currencyFromKey];
    const infoTo = currencies[currencyToKey];

    // Atualiza a seção "DE"
    currencyImgFrom.src = infoFrom.img;
    currencyNameFrom.innerHTML = infoFrom.name;

    // Atualiza a seção "PARA"
    currencyImgTo.src = infoTo.img;
    currencyNameTo.innerHTML = infoTo.name;

    // Realiza a conversão
    convertValues();
}

// NOVA FUNÇÃO: PARA INVERTER AS MOEDAS
function swapCurrencies() {
    // Pega os valores atuais dos selects
    const valueFrom = selectFrom.value;
    const valueTo = selectTo.value;

    // Inverte os valores
    selectFrom.value = valueTo;
    selectTo.value = valueFrom;

    // Atualiza a interface para refletir a mudança
    updateUI();
}

// 6. ADICIONA OS EVENTOS
convertButton.addEventListener('click', convertValues);
selectFrom.addEventListener('change', updateUI);
selectTo.addEventListener('change', updateUI);

swapButton.addEventListener('click', swapCurrencies);

// Chama a função uma vez ao carregar a página para inicializar a UI com os valores corretos
window.addEventListener('load', updateUI);