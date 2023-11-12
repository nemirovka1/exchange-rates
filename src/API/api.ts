export const API_ENDPOINT = '/api/exchange-rates'

export const mockData = [
    {"ccy":"CHF","base_ccy":"UAH","buy": 40.00670,"sale": 40.00670},
    {"ccy":"CZK","base_ccy":"UAH","buy": 1.56860,"sale": 1.56860},
    {"ccy":"GBP","base_ccy":"UAH","buy": 40.00670,"sale": 44.18370},
    {"ccy":"ILS","base_ccy":"UAH","buy":9.37100,"sale":9.37100},
    {"ccy":"JPY","base_ccy":"UAH","buy":0.23848,"sale":0.23848},
    {"ccy":"NOK","base_ccy":"UAH","buy":3.22790,"sale":3.22790},
    {"ccy":"PLZ","base_ccy":"UAH","buy":8.65850,"sale":8.65850},
    {"ccy":"SEK","base_ccy":"UAH","buy":3.31180,"sale":3.31180}
];
export const currencies = ['CHF', 'CZK','GBP','ILS','JPY','NOK','PLZ','SEK', 'UAH']
export const fetcher = async () => {
    const response = await fetch(API_ENDPOINT)

    const storedCounter = localStorage.getItem('requestCounter')
    let requestCounter: number = storedCounter ? parseInt(storedCounter) : 0

    if (requestCounter === 5) {
        localStorage.setItem('requestCounter', (requestCounter + 1).toString())
        throw new Error('Server Error')
    } else {
        localStorage.setItem('requestCounter', (requestCounter + 1).toString())
        return mockData;
    }
};
