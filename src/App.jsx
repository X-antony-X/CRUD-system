import Table from "./Table"
import Form from "./Form"
import { useQuery } from "@tanstack/react-query"
import { getPlayers } from "./getPlayers"
import { useState } from "react"

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ["player"],
    queryFn: getPlayers,
  })

  const [editingPlayer, setEditingPlayer] = useState(null)

  // if (isPending) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div className="container">
      <Form
        editingPlayer={editingPlayer}
        setEditingPlayer={setEditingPlayer}
      />
      <Table
        data={data}
        onEdit={setEditingPlayer}
      />
    </div>
  )
}

export default App
