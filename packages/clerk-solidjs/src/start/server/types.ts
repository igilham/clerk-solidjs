import { VerifyTokenOptions } from '@clerk/backend';
import {
  MultiDomainAndOrProxy,
  SignInFallbackRedirectUrl,
  SignInForceRedirectUrl,
  SignUpFallbackRedirectUrl,
  SignUpForceRedirectUrl
} from '@clerk/shared/types';

export type LoaderOptions = {
  publishableKey?: string;
  jwtKey?: string;
  secretKey?: string;
  authorizedParties?: [];
  signInUrl?: string;
  signUpUrl?: string;
  apiUrl?: string;
  /** @deprecated use fallbackRedirectUrl or forceRedirectUrl */
  afterSignInUrl?: string;
  /** @deprecated use fallbackRedirectUrl or forceRedirectUrl */
  afterSignUpUrl?: string;
} & Pick<VerifyTokenOptions, 'audience'> & {
  isSatellite?: boolean | ((url: URL) => boolean);
  proxyUrl?: string | ((url: URL) => string);
  domain?: string | ((url: URL) => string);
} & SignInForceRedirectUrl &
  SignInFallbackRedirectUrl &
  SignUpForceRedirectUrl &
  SignUpFallbackRedirectUrl;

export type AdditionalStateOptions = SignInFallbackRedirectUrl &
  SignUpFallbackRedirectUrl &
  SignInForceRedirectUrl &
  SignUpForceRedirectUrl;
