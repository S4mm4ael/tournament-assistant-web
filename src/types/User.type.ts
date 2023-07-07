export type UserType = {
  id: string;
  elo: number;
  email?: string;
  firstname: string;
  lastname: string;
  nickname: string;
  userType?: string[];
  proxy?: boolean;
};
