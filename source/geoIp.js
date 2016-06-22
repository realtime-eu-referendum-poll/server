import fetch from 'node-fetch'

export function fetchCountry (ipOrHostname) {
  return fetch(`http://freegeoip.net/json/${ipOrHostname}`)
    .then(data => data.json())
    .then(json => json.country)
}
