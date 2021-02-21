import { useHistory, useLocation } from 'react-router-dom';

export type LocationState = undefined | { email: string };

/*
 * These two hooks are made because location state is untyped by default.
 */

export const useEmailSentLocationState = (): string | null => {
  const location = useLocation<LocationState>();
  return location.state ? location.state.email : null;
};

type RedirectToEmailSentPage = (email: string) => void;
export const useRedirectToEmailSentPage = (): RedirectToEmailSentPage => {
  const history = useHistory();

  return (email) => {
    const state: LocationState = { email };
    history.push({ pathname: '/forgotPasswordEmailSent', state });
  };
};
