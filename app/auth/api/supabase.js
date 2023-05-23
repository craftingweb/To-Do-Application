import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://lpnctllpxscniumytgbu.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbmN0bGxweHNjbml1bXl0Z2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NDQ4MTMsImV4cCI6MjAwMDQyMDgxM30.A3irGazn8hy2qQoMNKur1wwIewRtZttSeRT1pZ8_Hlg";
const supabase = createClient(supabaseURL, anonKey);

export const signUpUser = async ({ firstName, lastName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const userData = await supabase.from("users").insert({
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email: email.trim(),
  });
  return { data, error };
};

export const logInUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
};

export const getUserData = async (userEmail) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .single();
  console.log(data);
  return { data };
};

export const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
