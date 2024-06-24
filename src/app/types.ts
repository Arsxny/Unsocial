import { User } from "firebase/auth";

export type TabProps = {
    children: React.ReactNode;
    index: number;
    value: number;
}

export type TabComponentType = {
    headerHeight: number;
}


export type AuthType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export type HeightContextProps = {
    height: number;
    ref: React.RefObject<HTMLElement>;
}

export type PostType = {
    key: string;
    image?: string;
    type: string;
    location: string;
    text?: string;
    date: Date;
    user: string;
}

export type Modaltype = {
    open: boolean;
    handleClose: () => void;
}

export type ProfileTabType = {
    userId: string;
}