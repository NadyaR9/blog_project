import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';

export enum ValidateProfileError {
    INVALID_USER_DATA = 'INVALID_USER_DATA',
    INVALID_AGE = 'INVALID_AGE',
    INVALID_COUNTRY = 'INVALID_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}
export interface Profile {
  first?: string,
  lastname?: string,
  age?: number,
  currency?: Currency,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string
}

export interface ProfileSchema {
  data?: Profile,
  form?: Profile,
  error?: string,
  isLoading: boolean,
  readonly: boolean,
  validateErrors?: ValidateProfileError[],
}
