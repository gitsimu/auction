import React from 'react'
import '../css/App.css'
import "firebase/auth"
import "firebase/firestore"
import "firebase/database"

function App() {
  const Discord = require('discord.js')
  const client = new Discord.Client()
  
  React.useEffect(() => {
    
  })

  client.once('ready', () => {
    console.log('Ready!')
  })
  
  client.login('your-token-goes-here')

  client.on('message', message => {
    console.log(message.content)

    if (message.content === '!ping') {
      // send back "Pong." to the channel the message was sent in
      message.channel.send('Pong.')
    }
  })

  return (
    <div className="auction-container">
      <div>
        <div>
          <input type="text"></input>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default App
