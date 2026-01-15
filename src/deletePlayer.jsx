import { supabase } from "./CreateClient";

export async function deletePlayer(id) {
    const { error } = await supabase.from("player").delete().eq("id",id)

    if (error) throw new Error(error.message)
}