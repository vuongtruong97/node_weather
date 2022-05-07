const weatherDetails = document.querySelector('.weather_details')
const inputSearch = document.querySelector('#searchInput')
const searchBtn = document.querySelector('.searchBtn')
let urlForeCast = 'http://localhost:3000/weather?address=ninh%20binh'
inputSearch.oninput = (e) => {
    if (e.target.value.length != 0) {
        searchBtn.removeAttribute('disabled')
    } else {
        searchBtn.setAttribute('disabled', 'disabled')
    }
}
inputSearch.onblur = (e) => {
    if (e.target.value.length != 0) {
        searchBtn.removeAttribute('disabled')
    } else {
        searchBtn.setAttribute('disabled', 'disabled')
    }
}
searchBtn.addEventListener('click', () => {
    weatherDetails.innerHTML = `<span>Loading...</span>`
    if (inputSearch.value.trim().length > 0) {
        fetch(`/weather?address=${encodeURIComponent(inputSearch.value)}`)
            .then((res) => {
                res.json().then((data) => {
                    if (data.error) {
                        return (weatherDetails.innerHTML = `<h2>${data.error}</h2>`)
                    }
                    weatherDetails.innerHTML = `<div class='forecast ${data.weather.main.toLowerCase()}'>
                    <div class='forecast_title'>${data.location},${
                        data.country
                    }</div>
                    <div class='forecast_weather'>
                        <span class='weather_temp'>${Math.round(
                            data.temp
                        )}°C</span>
                        <img src='https://openweathermap.org/img/wn/${
                            data.weather.icon
                        }@2x.png' />
                    </div>
                    <div class='forecast_description'>
                        <span class='des_title'>${data.weather.main}</span>
                        <span>Humidity:${data.humidity} %</span>
                        <span>Pressure:${data.pressure} ba</span>
                        <span>Wind:${data.windspeed} km/h</span>
                        <spN>Visibility: ${data.visibility} m </span>
                    </div>
                </div>`
                })
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                searchBtn.setAttribute('disabled', 'disabled')
                inputSearch.value = ''
            })
    }
})
