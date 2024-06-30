"use client";

import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { HeightContextProps } from '@/app/types';
import { auth } from '@/app/firebase';

export const HeightContext = createContext<HeightContextProps | undefined>(undefined);

export const HeightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLElement>(null);

    const user = auth.currentUser;

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) {
                setHeight(ref.current.clientHeight);
            }
        };

        if (user) {
            updateHeight();
        }

        // Update on window resize
        window.addEventListener('resize', updateHeight);

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, [ref.current?.clientHeight]);

    return (
        <HeightContext.Provider value={{ height, ref }}>
            {children}
        </HeightContext.Provider>
    );
};