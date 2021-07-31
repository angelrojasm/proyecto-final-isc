interface IContext {
  currentUser: User;
  currentGroup: Group;
  logIn: (UserUID: string) => Promise<void>;
  logOut: () => void;
  joinGroup: (groupId: number) => Promise<void>;
}

interface IUser {
  username: string;
  email: string;
  country: string;
  afflictions: string[];
  groups: Group[] | null;
  id: number;
  uid: string;
}

interface IGroup {
  name: string;
  description: string;
  totalUsers: number;
  creationDate: Date;
  users: User[];
  id: number;
}
