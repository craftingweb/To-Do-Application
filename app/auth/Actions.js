import { getCurrentUser } from "@/app/auth/api/supabase";

export const isAuth = () => {
  let currentUser;
  getCurrentUser().then(({ user }) => {
    if (user === null) {
      window.location.href = "/auth/login";
    }
    currentUser = user;
  });
  return currentUser;
};
