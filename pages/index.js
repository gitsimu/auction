import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import axios from 'axios'
import FirebaseConfig from '../firebaseConfig'
import DiscordConfig from '../discordConfig'

export default function Home() {
  const CLIENT_ID = '767649418148446248'
  const redirect = encodeURIComponent('/localhost:3000/main')
  return (
    <div className={styles.container}>
      <Head>
        <title>Fresh auction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Welcome to Auction!
        </h1> */}
        <div className={styles.loginContainer}>
          <div className={styles.loginTitle}>            
            FRESH AUCTION
            <div className={styles.badge}>Beta</div>
          </div>
          <a className={styles.login} href={`https://discord.com/api/oauth2/authorize?client_id=767649418148446248&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback.html&response_type=token&scope=identify%20email%20connections`}>
            Log in with Discord
          </a> 
        </div>
        <div className={styles.copyright}>
          Copyright (c) 2020 yakuza tribe
          <br/><br/>
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
          <br/><br/>
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
          <br/><br/>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </div>
      </main>      
    </div>
  )
}
