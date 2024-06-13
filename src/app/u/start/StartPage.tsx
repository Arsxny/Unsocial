import React from "react";
import Head from 'next/head';
import styles from '@/app/u/start/start.module.css';
import AppIcon from '@/app/assets/AppIcon.png';
import Link from "next/link";

const StartPage: React.FC = (props) => {
    return (
        <div className={styles.container}>
        <Head>
          <title>Unsocial: Connecting People</title>
          <meta name="description" content="Unsocial: Connecting People, Cultivating Truth." />
        </Head>
  
        <main className={styles.main}>
            <div className={styles.leftSide}>
                <img src={AppIcon.src} alt="Icon" className={styles.appIcon} />
                    <h1 className={styles.title}>Unsocial: Connecting People, Cultivating Truth.</h1>
            </div>
            <div className={styles.rightSide}>
                <span className={styles.startText}>
                    Get started
                </span>
                <div className={styles.options}>
                <Link href="/u/auth/login">
                    <button className={styles.button}>Log in</button>
                </Link>
                <Link href="/u/auth/signup">
                    <button className={styles.button}>Sign up</button>
                </Link>
                </div>
            </div>
        </main>
      </div>
    )
}

export default StartPage;