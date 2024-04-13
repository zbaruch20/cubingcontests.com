import { Role } from '@sh/enums';
import { IPerson } from '@sh/interfaces';

export interface IFrontendUser {
  username: string;
  email: string;
  roles?: Role[];
  person?: IPerson;
}
