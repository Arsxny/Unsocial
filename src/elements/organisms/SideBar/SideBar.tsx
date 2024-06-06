import React from "react";
import { SideBarData } from "./SideBarData";
import Link from "next/link";
import styles from "@/elements/organisms/organisms.module.css"
import bla from "@/assets/f75kgip037f01.png"
import { SideBarType } from "@/elements/types";

const SideBar: React.FC<SideBarType> = (props) => {

    const { headerHeight } = props;
    return (
        <div className={styles.sideBar} style={{ top: headerHeight + 1}}>
            <div className={styles.profileInfo}>
                <img src={bla.src} className={styles.profileImage} />
                <div className={styles.userInfo}>
                    <p className={styles.name}>Arseny</p>
                    <p className={styles.userName}>@Arsxnx</p>
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
        </div>
    );
};

export default SideBar;