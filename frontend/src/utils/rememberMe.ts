import createPersistedState from 'use-persisted-state';

export const REMEMBER_ME = 'remember_me';

export const getRememberMe = (): boolean => localStorage.getItem(REMEMBER_ME) === 'true';

/*
 * keeping remember me in the localstorage because we would need to
 * know that where we should read the token value from. (localStorage or sessionStorage)
 * It also brings a nice little touch on the UX.
 */
export const useRememberMe = createPersistedState(REMEMBER_ME);
