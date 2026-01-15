import { supabase } from "./CreateClient"

export async function addPlayer(newPlayer) {
    const { data , error } = await supabase.from("player").insert([newPlayer])

    if (error) throw new Error(error.message)

    return data
}