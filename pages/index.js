import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import axios from 'axios'
import FirebaseConfig from '../firebaseConfig'
import DiscordConfig from '../discordConfig'

export default function Home() {
  const href = `https://discord.com/api/oauth2/authorize?client_id=767649418148446248&redirect_uri=http%3A%2F%2F13.125.119.95%2Fcallback.html&response_type=token&scope=identify`;
  // `https://discord.com/api/oauth2/authorize?client_id=767649418148446248&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback.html&response_type=token&scope=identify%20email%20connections`
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
          <a className={styles.login} href={href}>
            Log in with Discord
          </a> 
        </div>
        <div className={styles.copyright}>
          <br/>
          개발자 <span>[야쿠자]solnreo</span>
          <br/><br/>
          이 페이지는 FRESH 스톤에이지 사용자들을 위해 만들어졌습니다.<br/>
          FRESH AUCTION 사용에 있어 발생하는 문제에 대한 책임은 전적으로 사용자에게 있으며,<br/>
          이로 인해 발생하는 이슈 및 유저 간의 마찰에 대해서는 책임지지 않습니다.<br/>
          또한, FRESH 스톤에이지 운영진과는 전혀 연관이 없음을 알려드립니다.<br/><br/>        
          {/* Permission is hereby granted, free of charge, to any person obtaining a copy
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
          SOFTWARE. */}
        </div>
      </main>      
    </div>
  )
}
