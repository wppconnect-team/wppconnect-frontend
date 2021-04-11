export const TOKEN_KEY = "@WPPConnect-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const defaultKey = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getSession = () => {
    if (defaultKey() !== null) {
        const {session} = JSON.parse(defaultKey());
        return session;
    }
};

export const getToken = () => {
    if (defaultKey() !== null) {
        const {token} = JSON.parse(defaultKey());
        return token;
    }
};

export const getDefaultImage = () => {
    return "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png";
};