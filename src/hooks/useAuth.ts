import { useSession, signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const login = async (username: string, password: string) => {
    return signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  };

  const logout = () => signOut();

  return {
    user: session?.user,
    loading: status === "loading",
    isAuthenticated: status === "authenticated",
    login,
    logout,
  };
};
