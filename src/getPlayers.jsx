import { supabase } from "./CreateClient"

export const getPlayers = async () => {
  const { data, error } = await supabase.from("player").select("*")

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  return data
}
