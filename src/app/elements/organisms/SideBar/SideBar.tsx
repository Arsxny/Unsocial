"use client";
import React, {useState, useEffect} from "react";
import { SideBarData } from "./SideBarData";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/app/elements/organisms/organisms.module.css"
import { SideBarType } from "@/app/types";
import SendIcon from "@/app/assets/SendIcon.svg";
import { signOutFirebase } from "@/app/backend/AuthService";

const SideBar: React.FC<SideBarType> = (props) => {
    const { headerHeight, profileImage, username, name } = props;
    return (
        <div className={styles.sideBar} style={{ top: headerHeight + 1}}>
            <div className={styles.profileInfo}>
                <img src={profileImage} className={styles.profileImage} />
                <div className={styles.userInfo}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.userName}>@{username}</p>
                </div>
            </div>
            <ul className={styles.sideBarList}>
                {SideBarData.map((val, key) => {
                    return (
                        <li key={key}>
                        <Link href={val.link} className={styles.link}>
                            <div className={styles.icon}>{val.icon}</div>
                            <div className={styles.title}>{val.title}</div>
                        </Link>
                      </li>
                    );
                })}
            </ul>
            <Link href="/u/start" onClick={signOutFirebase} className={styles.logOutLink}>
                <div className={styles.logOutIcon}>
                    <SendIcon stroke="currentColor" />
                </div>
                <div className={styles.logOutText}>Log out</div>
            </Link>
        </div>
    );
};

export default SideBar;