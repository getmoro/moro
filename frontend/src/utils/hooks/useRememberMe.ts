import createPersistedState from 'use-persisted-state';

/*
 * keeping remember me in the localstorage because we would need to
 * know that where we should read the token value from. (localStorage or sessionStorage)
 * It also brings a nice little touch on the UX.
 */
export const useRememberMe = createPersistedState('remember_me');
