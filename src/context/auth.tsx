import { ReactNode } from "@tanstack/react-router";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export type AuthContext = {
	isAuthenticated: boolean;
	login: (username: string) => void;
	logout: () => void;
	user: string | null;
};

const AuthContext = createContext<AuthContext | null>(null);

const key = "zenml.auth.user";

function getStoredUser() {
	return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
	if (user) {
		localStorage.setItem(key, user);
	} else {
		localStorage.removeItem(key);
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<string | null>(getStoredUser());
	const isAuthenticated = !!user;

	const logout = useCallback(() => {
		setStoredUser(null);
		setUser(null);
	}, []);

	const login = useCallback((username: string) => {
		setStoredUser(username);
		setUser(username);
	}, []);

	useEffect(() => {
		const user = getStoredUser();
		if (user) {
			setUser(user);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
