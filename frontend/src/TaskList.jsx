import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskEditForm from './TaskEditForm';

// Composant d'une ligne de tâche
function TaskRow({ task, onToggleDetails, isOpen, onToggleSelect, selected, onEdit }) {
  return (
    <>
      <tr className={`hover:bg-gray-50 ${selected ? 'bg-emerald-50' : ''}`}>
        <td className="border p-2 text-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(task.id)}
          />
        </td>
        <td className="border p-2">{task.task}</td>
        <td className="border p-2">{task.responsible}</td>
        <td className="border p-2">{task.duration}</td>
        <td className="border p-2 text-center">
          <button
            onClick={() => onToggleDetails(task.id)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {isOpen ? "Fermer" : "Détails"}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-green-600 underline hover:text-green-800 ml-2"
          >
            Modifier
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan="5" className="bg-gray-50 p-4 text-sm border border-t-0">
            <div className="grid grid-cols-2 gap-2">
              <p><strong>Description :</strong> {task.comments}</p>
              <p><strong>Système :</strong> {task.system}</p>
              <p><strong>Durée :</strong> {task.duration}</p>
              <p><strong>Acteurs :</strong> {task.actor?.join(', ')}</p>
              <p><strong>Status :</strong> {task.status}</p>
              <p><strong>Plan :</strong> {task.execution_plan?.join(', ')}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // tâche en cours d'édition

  // Chargement des tâches depuis le backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleDetails = (id) => {
    setSelectedTaskId(selectedTaskId === id ? null : id);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleUpdate = () => {
    fetchTasks(); // recharge après édition
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-bold mb-4">📋 Liste des tâches</h2>

      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-center">✔</th>
            <th className="border p-2">Tâche</th>
            <th className="border p-2">Responsable</th>
            <th className="border p-2">Durée</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggleDetails={toggleDetails}
              isOpen={selectedTaskId === task.id}
              onToggleSelect={toggleSelect}
              selected={selectedIds.includes(task.id)}
              onEdit={setTaskToEdit} // passe la tâche à modifier
            />
          ))}
        </tbody>
      </table>

      {selectedIds.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          {selectedIds.length} tâche(s) sélectionnée(s).
          <button
            className="ml-4 text-blue-600 hover:underline"
            onClick={() => setSelectedIds([])}
          >
            Désélectionner tout
          </button>
        </div>
      )}

      {/* ✅ Affiche la modale si une tâche est en cours d'édition */}
      {taskToEdit && (
        <TaskEditForm
          task={taskToEdit}
          onClose={() => setTaskToEdit(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default TaskList;
