import { createClerkClient } from '@clerk/backend';
import { AuthStatus } from '@clerk/backend/internal';

import { errorThrower } from '../../errors/error-thrower';
import { LoaderOptions } from './types';
import { patchRequest } from './utils';

export async function authenticateRequest(
  request: Request,
  opts: LoaderOptions
): Promise<any> {
  const { audience, authorizedParties } = opts;

  const { secretKey, jwtKey, publishableKey } = opts;
  const apiUrl = opts.apiUrl as string;
  const domain = opts.domain as string;
  const isSatellite = opts.isSatellite as boolean;
  const proxyUrl = opts.proxyUrl as string;
  const {
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl,
    signInForceRedirectUrl,
    signUpForceRedirectUrl
  } = opts;

  const requestState = await createClerkClient({
    apiUrl,
    secretKey,
    jwtKey,
    proxyUrl,
    isSatellite,
    domain,
    publishableKey,
    userAgent: `${PACKAGE_NAME}@${PACKAGE_VERSION}`
  }).authenticateRequest(patchRequest(request), {
    audience,
    authorizedParties,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl,
    signInForceRedirectUrl,
    signUpForceRedirectUrl
  } as any);

  const hasLocationHeader = requestState.headers.get('location');
  if (hasLocationHeader) {
    // triggering a handshake redirect
    throw new Response(null, { status: 307, headers: requestState.headers });
  }

  if (requestState.status === AuthStatus.Handshake) {
    throw errorThrower.throw('Clerk: unexpected handshake without redirect');
  }

  return requestState;
}
