export type UserType = 'owner' | 'admin' | 'member' | 'disable' | 'visitor';
export interface User {
  name: string;
  surname?: string;
  type: UserType;
  userID?: number;
  userName: string;
  visitas: number;
}

export const visitorTypes: UserType[] = ['visitor'];
export const memberTypes: UserType[] = ['member', 'admin', 'owner'];
export const adminTypes: UserType[] = ['admin', 'owner'];
export const ownerTypes: UserType[] = ['owner'];
export const disabledTypes: UserType[] = ['disable'];
export const allTypes: UserType[] = [
  ...visitorTypes,
  ...memberTypes,
  ...adminTypes,
  ...ownerTypes,
  ...disabledTypes,
];
