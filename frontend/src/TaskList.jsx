import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/tasks/')
      .then(response => {
        console.log("Tâches reçues depuis l'API :", response.data); // <--- ligne de debug
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des tâches :", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des tâches...</p>;

  return (
    <div>
      <h2>Liste des tâches</h2>
      {tasks.length === 0 ? (
        <p>Aucune tâche trouvée.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Durée (min)</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.duration}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
