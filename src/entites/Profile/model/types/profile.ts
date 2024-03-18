import { Country } from '@/entites/Country';
import { Currency } from '@/entites/Currency';

export interface Profile {
  id?: string,
  firstname?: string,
  lastname?: string,
  age?: number,
  currency?: Currency,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string
}
