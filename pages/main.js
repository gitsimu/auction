import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { connection, selectedItem } from '../src/actions'

import AuctionSearch from '../src/containers/AuctionSearch'
import Sell from '../src/containers/Sell'
import Buy from '../src/containers/Buy'

import FirebaseConfig from '../firebaseConfig'
import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

import * as script from '../src/js/script'

// https://medium.com/@orels1/using-discord-oauth2-a-simple-guide-and-an-example-nodejs-app-71a9e032770

function Main({info, selectedItem, connection}) {
  const [loading, isLoading] = useState(true)
  const [screen, setScreen] = useState(0)

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig)
  }
  const database = firebase.database()

  useEffect(() => {
    console.log('start')    
    const accessToken = script.getCookie('discord_access_token')
    const tokenType = script.getCookie('discord_token_type')
    
    // 243634472803762176
    if (accessToken && tokenType) {
      fetch('https://discord.com/api/users/@me', {
		  	headers: {authorization: `${tokenType} ${accessToken}`}
		  })
		  	.then(res => res.json())
		  	.then(response => {
          connection(response)
          isLoading(false)
		  	})
        .catch(console.error)
              
      // fetch('https://discord.com/api/users/243634472803762176', {
		  // 	headers: {authorization: `${tokenType} ${accessToken}`}
		  // })
		  // 	.then(res => res.json())
		  // 	.then(response => {
      //     console.log('userinfo', response)
		  // 	})
      //   .catch(console.error)

    } else {
      location.href = '/'      
    }

    // simpleline icons
    let simplelineLink = document.createElement("link")
    simplelineLink.href = "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css"
    simplelineLink.rel = "stylesheet"
    simplelineLink.type = "text/css"
    document.querySelector('body').appendChild(simplelineLink)
  }, [])

  useEffect(() => {
    selectedItem(undefined)
  }, [screen])

  return (
    <div className="auction-main">
      {!loading && (
        <>
          <div className="container-menu">
            <div className={screen === 0 ? "container-menu-tab active" : "container-menu-tab"} onClick={() => { setScreen(0) }}>
              검색
            </div>
            <div className={screen === 1 ? "container-menu-tab active" : "container-menu-tab"} onClick={() => { setScreen(1) }}>
              판매 관리
            </div>
            <div className={screen === 2 ? "container-menu-tab active" : "container-menu-tab"} onClick={() => { setScreen(2) }}>
              구매 내역
            </div>
          </div>
          <div className="container-screen">
            {screen === 0 && (
              <AuctionSearch database={database}/>
            )}
            {screen === 1 && (
              <Sell database={database}/>
            )}
            {screen === 2 && (
              <Buy database={database}/>
            )}
          </div>
        </>
      )}
      {loading && (<div id="loading"><div></div></div>)}
    </div>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})

const mapDispatchToProps = dispatch => ({
  connection: (info) => dispatch(connection(info)),
  selectedItem: i => dispatch(selectedItem(i))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)