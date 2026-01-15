import { useMutation , useQueryClient } from "@tanstack/react-query"
import { deletePlayer } from "./deletePlayer"
import { updatePlayer } from "./updatePlayer"

function Table({ data, onEdit }) {
  const queryClient = useQueryClient()
  
  if (!data || data.length === 0) {
    return <p>No players found</p>
  }

  const { mutate , isPending } = useMutation({
    mutationFn:deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["player"]})
    },
  })

  return (
    <div className="table-wrapper">
      <table className="players-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Club</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((player) => (
            <tr key={player.id}>
              <td data-label="Name">{player.name}</td>
              <td data-label="Age">{player.age}</td>
              <td data-label="Club">{player.club}</td>
              <td data-label="Actions">
                <button className="btn update" onClick={() => onEdit(player)}>Update</button>
                <button className="btn delete" onClick={() => mutate(player.id)} disabled={isPending} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
