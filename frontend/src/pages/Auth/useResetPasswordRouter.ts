import { useHistory, useLocation } from 'react-router-dom';

export type LocationState = undefined | { email: string };

/*
 * These two hooks are made because first using location state is untyped by default,
 * and it's a bit messy.
 * This way we will be sure correct types are provided to the component.
 */

export const useResetPasswordLocationState = (): string | null => {
  const location = useLocation<LocationState>();
  return location.state ? location.state.email : null;
};

type RedirectToResetPasswordPage = (email: string) => void;
export const useRedirectToResetPasswordPage = (): RedirectToResetPasswordPage => {
  const history = useHistory();

  return (email) => {
    const state: LocationState = { email };
    history.push({ pathname: '/resetPassword', state });
  };
};
