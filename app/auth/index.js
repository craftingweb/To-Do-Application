import { getCurrentUser } from "./api/supabase";
export const isAuth = async () => {
  const user = await getCurrentUser();
  return user;
};
