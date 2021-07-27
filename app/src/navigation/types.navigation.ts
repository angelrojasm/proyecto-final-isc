/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Group: undefined;
  Auth: undefined;
  register: undefined;
};

export type AuthStackParamList = {
  home: undefined;
  logIn: undefined;
  register: undefined;
  profileSetup: undefined;
  Dashboard: undefined;
};
export type DashboardParamList = {
  Dashboard: undefined;
};

export type MainBottomTabParamList = {
  Dashboard: undefined;
  Groups: undefined;
  Profile: undefined;
};

export type GroupBottomTabParamList = {
  Feed: undefined;
  Room: undefined;
};

export type GroupParamList = {
  Groups: undefined;
  GroupSearch: undefined;
  Group: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type RoomParamList = {
  Room: undefined;
};

export type FeedParamList = {
  Feed: undefined;
  Replies: undefined;
};
