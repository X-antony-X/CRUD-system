import { supabase } from "./CreateClient";

export async function updatePlayer({id,name,age,club}) {
    const { error } = await supabase.from("player").update({name,age,club}).eq("id",id)

    if (error) throw new Error(error.message)
}