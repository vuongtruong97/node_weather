require('dotenv').config()
const { API_KEY, API_UNIT } = process.env

async function forecast(longitude, latitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=en&appid=${API_KEY}&units=metric`
    console.log(url)
    const weather = await fetch(url)
        .then((res) => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error('Bad response from server')
            }
            return res.json()
        })
        .catch((error) => {
            console.log(error)
        })
    return weather
}

module.exports = forecast
