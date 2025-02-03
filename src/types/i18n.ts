export type Locale = "en" | "zh";
export type Dictionary = {
  common: {
    welcome: string;
    dashboard: string;
    profile: string;
    admin: string;
    logout: string;
    userInfo: string;
  };
  auth: {
    login: {
      title: string;
      username: string;
      password: string;
      submit: string;
      usernamePlaceholder: string;
      passwordPlaceholder: string;
      success: string;
      error: string;
    };
  };
};
