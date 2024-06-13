import React from "react";
import HomeTab from "@/app/assets/HomeTab.svg";
import ExploreTab from "@/app/assets/CompassIcon.svg";
import MessageTab from "@/app/assets/MessageTab.svg";
import ProfileTab from "@/app/assets/ProfileTab.svg";

export const SideBarData = [
    {
        title: "Home", 
        icon: <HomeTab stroke="white" fill="white" strokeWidth="2"/>,
        link: "/u/home"
    },
    {
        title: "Explore", 
        icon: <ExploreTab />,
        link: "/explore"
    },
    {
        title: "Message", 
        icon: <MessageTab />,
        link: "/message"
    },
    {
        title: "Profile", 
        icon: <ProfileTab />,
        link: "/profile"
    },
]