"use client";

import React, { createContext, useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import { HeightContextProps } from '@/app/types';

export const HeightContext = createContext<HeightContextProps | undefined>(undefined);

export const HeightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, []);

    return (
        <HeightContext.Provider value={{ height, ref }}>
            {children}
        </HeightContext.Provider>
    );
};