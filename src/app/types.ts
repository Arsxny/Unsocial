import { User } from "firebase/auth";

export type TabProps = {
    children: React.ReactNode;
    index: number;
    value: number;
}

export type TabComponentType = {
    headerHeight: number;
}

export type SideBarType = {
    headerHeight: number;
}

export type AuthType = {
    user: User | null;
    setUser: (user: User ) => void;
};

export type HeightContextProps = {
    height: number;
    ref: React.RefObject<HTMLElement>;
}