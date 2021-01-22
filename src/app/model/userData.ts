import {Profil} from './profil';

export class UserData {
  userEmail: string;
  statusId: number;
  userUsername: string;
  userPassword: string;
  userFirstname: string;
  userLastname: string;
  userBirthdate: Date;
  userSignin: Date;
  userDescription: string;
  userLinkContact: string;
  userGaz: number;
  enabled: boolean;
  using2FA: boolean;
  userSecret: string;
  roles: Profil;
}
