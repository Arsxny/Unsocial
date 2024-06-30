import React from "react";
import HomeTab from "@/app/assets/HomeTab";
import ExploreTab from "@/app/assets/CompassIcon.svg";
import MessageTab from "@/app/assets/MessageTab.svg";
import ProfileTab from "@/app/assets/ProfileTab";

export const SideBarData = [
    {
        title: "Home", 
        icon: <HomeTab stroke="currentColor" fill="currentColor"/>,
        link: "/u/home"
    },
    {
        title: "Explore", 
        icon: <ExploreTab stroke="currentColor" fill="currentColor"/>,
        link: ""
    },
    {
        title: "Message", 
        icon: <MessageTab stroke="currentColor" fill="currentColor"/>,
        link: ""
    },
    {
        title: "Profile", 
        icon: <ProfileTab stroke="currentColor" fill="currentColor"/>,
        link: "/u/profile"
    },
]