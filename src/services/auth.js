/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const TOKEN_KEY = "@WPPConnect-Token";

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