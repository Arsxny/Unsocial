import React from "react";
import HomeTab from "@/assets/HomeTab.svg";
import ExploreTab from "@/assets/CompassIcon.svg";
import MessageTab from "@/assets/MessageTab.svg";
import ProfileTab from "@/assets/ProfileTab.svg";

export const SideBarData = [
    {
        title: "Home", 
        icon: <HomeTab stroke="white" fill="white"/>,
        link: "/home"
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