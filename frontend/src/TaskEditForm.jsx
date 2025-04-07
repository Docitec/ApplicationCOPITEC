import React, { useState } from 'react';
import axios from 'axios';

function TaskEditForm({ task, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    task: task.task || '',
    comments: task.comments || '',
    duration: task.duration || '',
    system: task.system || '',
    updated_by: 'romain', // à remplacer plus tard par l'utilisateur connecté
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/tasks/${task.id}`, formData);
      onUpdate(); // recharge la liste
      onClose();  // ferme la modale
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Modifier la tâche</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nom de la tâche</label>
            <input type="text" name="task" value={formData.task} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Commentaires</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Durée</label>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Système</label>
            <input type="text" name="system" value={formData.system} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEditForm;
