export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}
