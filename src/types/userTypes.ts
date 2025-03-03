export type User = {
  id: string;
  username: string;
  email: string;
} | null;

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}
