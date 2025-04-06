import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [formData, setFormData] = useState({
    task: '',
    comments: '',
    execution_plan: [],
    sub_team: '',
    system: '',
    theme: '',
    actor: [],
    responsible: '',
    controller: '',
    previous: [],
    duration: '',
    status: 'todo',
    priority: '',
    notes: '',
    location: '',
    interface_impacted: '',
    go_nogo_point: false,
    created_by: 'romain'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (["execution_plan", "actor", "previous"].includes(name)) {
      const values = value.split(',').map((item) => item.trim());
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.task) newErrors.task = "Le titre est requis.";
    if (!formData.duration.match(/^\d{2}:\d{2}$/)) newErrors.duration = "Format hh:mm requis.";
    if (!formData.responsible) newErrors.responsible = "Responsable requis.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/tasks/', formData);
      onTaskAdded(response.data);
      alert("Tâche ajoutée !");
      setFormData({
        task: '',
        comments: '',
        execution_plan: [],
        sub_team: '',
        system: '',
        theme: '',
        actor: [],
        responsible: '',
        controller: '',
        previous: [],
        duration: '',
        status: 'todo',
        priority: '',
        notes: '',
        location: '',
        interface_impacted: '',
        go_nogo_point: false,
        created_by: 'romain'
      });
      setErrors({});
    } catch (error) {
      console.error('Erreur :', error);
      alert("Erreur lors de la création !");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border">
      <h2 className="text-2xl font-bold mb-4">Ajouter une tâche</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-2">
          <input type="text" name="task" placeholder="Titre" value={formData.task} onChange={handleChange}
            className="w-full p-2 border rounded" />
          {errors.task && <p className="text-red-600 text-sm">{errors.task}</p>}
        </div>

        <input type="text" name="comments" placeholder="Description" value={formData.comments} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="execution_plan" placeholder="Dry Run 1, Go Live..." value={formData.execution_plan} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="sub_team" placeholder="Sous-équipe" value={formData.sub_team} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="system" placeholder="Système" value={formData.system} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="theme" placeholder="Thématique" value={formData.theme} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="actor" placeholder="Acteurs (séparés par ,)" value={formData.actor} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="responsible" placeholder="Responsable" value={formData.responsible} onChange={handleChange} className="p-2 border rounded" />
        {errors.responsible && <p className="text-red-600 text-sm col-span-2">{errors.responsible}</p>}

        <input type="text" name="controller" placeholder="Contrôleur" value={formData.controller} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="previous" placeholder="IDs précédents (ex: 1,2)" value={formData.previous} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="duration" placeholder="Durée (hh:mm)" value={formData.duration} onChange={handleChange} className="p-2 border rounded" />
        {errors.duration && <p className="text-red-600 text-sm col-span-2">{errors.duration}</p>}

        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminé</option>
          <option value="blocked">Bloqué</option>
        </select>

        <input type="text" name="priority" placeholder="Priorité" value={formData.priority} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="location" placeholder="Lieu" value={formData.location} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="interface_impacted" placeholder="Interfaces impactées" value={formData.interface_impacted} onChange={handleChange} className="p-2 border rounded" />

        <label className="col-span-2 flex items-center gap-2">
          <input type="checkbox" name="go_nogo_point" checked={formData.go_nogo_point} onChange={handleChange} />
          Point Go / No-Go
        </label>

        <button type="submit" className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          ➕ Ajouter la tâche
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6">🔍 Aperçu</h3>
      <pre className="bg-gray-100 p-4 rounded text-sm mt-2 overflow-auto max-h-64">{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

export default TaskForm;
