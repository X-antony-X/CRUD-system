import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPlayer } from "./addPlayer"
import { updatePlayer } from "./updatePlayer"
import { useEffect, useState } from "react"

function Form({ editingPlayer, setEditingPlayer }) {
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    club: "",
  })

  useEffect(() => {
    if (editingPlayer) {
      setFormData({
        name: editingPlayer.name,
        age: editingPlayer.age,
        club: editingPlayer.club,
      })
    }
  }, [editingPlayer])

  const addMutation = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player"] })
      setFormData({ name: "", age: "", club: "" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updatePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player"] })
      setEditingPlayer(null)
      setFormData({ name: "", age: "", club: "" })
    },
  })

  function handleSubmit(e) {
    e.preventDefault()

    if (editingPlayer) {
      updateMutation.mutate({
        id: editingPlayer.id,
        ...formData,
      })
    } else {
      addMutation.mutate(formData)
    }
  }

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) =>
          setFormData({ ...formData, age: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Club"
        value={formData.club}
        onChange={(e) =>
          setFormData({ ...formData, club: e.target.value })
        }
      />

      <button
        type="submit"
        disabled={addMutation.isPending || updateMutation.isPending}
      >
        {editingPlayer ? "Save" : "Add"}
      </button>

      {editingPlayer && (
        <button
          type="button"
          onClick={() => {
            setEditingPlayer(null)
            setFormData({ name: "", age: "", club: "" })
          }}
        >
          Cancel
        </button>
      )}
    </form>
  )
}

export default Form
