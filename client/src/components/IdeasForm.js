import { useState } from "react"

const IdeasForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [team, setTeam] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const project = { name, description, team }
        const res = await fetch('/api/v1/projects', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }
        if (res.ok) {
            setName('')
            setDescription('')
            setTeam('')
            setError('')
        }
    }

    return (
        <div>
            <h2>Создать идею</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Название проекта"
                />
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Описание проекта"
                />
                <input
                    type="number"
                    onChange={(e) => setTeam(e.target.value)}
                    value={team}
                    placeholder="Размер команды"
                />
                <button type="submit">Добавить идею</button>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default IdeasForm