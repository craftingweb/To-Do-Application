import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://lpnctllpxscniumytgbu.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbmN0bGxweHNjbml1bXl0Z2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NDQ4MTMsImV4cCI6MjAwMDQyMDgxM30.A3irGazn8hy2qQoMNKur1wwIewRtZttSeRT1pZ8_Hlg";
const supabase = createClient(supabaseURL, anonKey);

export const getAllLists = async () => {
  const { data, error } = await supabase.from("lists").select();

  return { data, error };
};

export const getSingleList = async (id) => {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};

export const getUserLists = async (user_id) => {
  const { data, error } = await supabase
    .from("lists")
    .select()
    .eq("user_id", user_id);
  return { data, error };
};

export const insertNewList = async (
  listName = "Untitled List",
  items,
  user
) => {
  const { error } = await supabase.from("lists").insert({
    list_name: listName,
    items: items,
    user_id: user.id,
  });
  return { error };
};

export const deleteList = async (list_id) => {
  const { error } = await supabase.from("lists").delete().eq("id", list_id);
  return { error };
};

export const updateList = async (list_id, newListName) => {
  const { data, error } = await supabase
    .from("lists")
    .update({
      list_name: newListName,
    })
    .eq("id", list_id)
    .select();
  return { data, error };
};

export const addNewItem = async (items, list_id) => {
  const { data, error } = await supabase
    .from("lists")
    .update({
      items: [...items],
    })
    .eq("id", list_id)
    .select();
  return { data, error };
};

export const markCompletedItem = async (items, list_id, item_id) => {
  const item = await items.find((item) => item.id === item_id);
  item.status = !item.status;
  const { data, error } = await supabase
    .from("lists")
    .update({
      items: [...items],
    })
    .eq("id", list_id);
  return { data, error };
};

export const deleteItem = async (list_id, items, item_id) => {
  const { data, error } = await supabase
    .from("lists")
    .update({ items: items?.filter((item) => item?.id !== item_id) })
    .eq("id", list_id)
    .select();
  return { data, error };
};
