import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import DiscordConfig from '../../discordConfig'

const url = require('url')

export default function Home() {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  
	if (fragment.has("access_token")) {
		const accessToken = fragment.get("access_token");
		const tokenType = fragment.get("token_type");
		fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${tokenType} ${accessToken}`
			}
		})
			.then(res => res.json())
			.then(response => {
				const { username, discriminator } = response;
        document.getElementById('info').innerText += ` ${username}#${discriminator}`;
        console.log('response', ` ${username}#${discriminator}`)
			})
			.catch(console.error);
	}
	else {
		document.getElementById('login').style.display = 'block';
	}

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
