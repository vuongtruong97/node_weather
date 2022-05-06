require('dotenv').config()

const { GEO_TOKEN } = process.env

async function geocoding(address) {
    try {
        const urlGeocodingAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
        )}.json?access_token=${GEO_TOKEN}`
        const data = await fetch(urlGeocodingAPI).then((res) => {
            return res.json()
        })
        if (data.message) {
            console.log(data.message)
            return { error: data.message }
        }
        if (data.features.length === 0) {
            return { error: 'Unable to find location. Try another search' }
        }
        return {
            longitude: data.features[0].center[0],
            latitude: data.features[0].center[1],
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = geocoding
