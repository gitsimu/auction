// import React from 'react'
import DiscordConfig from '../../discordConfig'
import axios from 'axios'

const url = require('url')

export default (req, res) => {
  res.statusCode = 200  

  const access = async (code) => {
    const data = {
      'client_id': DiscordConfig.CLIENT_ID,
      'client_secret': DiscordConfig.CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': DiscordConfig.REDIRECT_URI,
      'scope': 'identify email'
    }
    const config = {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    const res = await axios.post(`${DiscordConfig.API_ENDPOINT}/oauth2/token`, data, config)
    return await res
  }

  const urlObj = url.parse(req.url, true)
  if (urlObj.query.code) {
    const accessCode = urlObj.query.code
    console.log(`The access code is: ${accessCode}`)

    // access(accessCode)
    //   .then((data) => {
    //     console.log('data', data)
    //     res.json({ result: 'authorized', data: data })
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //     res.json({ result: 'unauthorized', data: err })
    //   })
  } else {
    res.json({ result: 'unauthorized' })
  }
  
  // if (urlObj.pathname === '/') {
  //   responseCode = 200
  //   content = fs.readFileSync('./index.html')
  // }  
}



