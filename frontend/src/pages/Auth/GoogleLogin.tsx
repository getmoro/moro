import React, { FC } from 'react';
import ReactGoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
} from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../utils/constants';
import { useValidateSocialLoginMutation, AuthServices } from '../../graphql/hooks';
import { setToken } from '../../utils/token';
import { useHistory } from 'react-router-dom';

export const GoogleLogin: FC = () => {
  const history = useHistory(); // used to redirect to app after login
  const [validateMutation, { loading, data }] = useValidateSocialLoginMutation();

  const handleSuccess = async (values: GoogleLoginResponse): Promise<void> => {
    if (values.tokenId) {
      // sending received JWT token from google to our backend to verify it with the secret
      // then we will receive a new (our own signed) JWT token
      const credentials = { token: values.tokenId, service: AuthServices.Google };
      const { data } = await validateMutation({ variables: { credentials } });

      // if it was successful
      if (data?.validateSocialLogin?.success && data?.validateSocialLogin?.token) {
        setToken(data.validateSocialLogin.token);
        history.push('/app');
      }
    }
  };

  if (!GOOGLE_CLIENT_ID) return null;
  return (
    <>
      <div>{loading && 'Loading'}</div>
      <ReactGoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={handleSuccess as GoogleLoginProps['onSuccess']} // help needed to make the type right
        // onFailure={() => setMessage('Error signing in with google')}
        cookiePolicy={'single_host_origin'}
      />
      <div>{data?.validateSocialLogin?.message}</div>
    </>
  );
};
