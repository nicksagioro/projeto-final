import React from 'react';
import styles from './mediaTurma.module.css';

const materias = ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'];

function MediaTurma({ formData, handleInputChange }) {

return (
  <div>
    <label htmlFor="materia-media">Selecione a matéria:</label>
    <select
      id="materia-media"
      value={formData?.materia || 0}
      onChange={e => handleInputChange('materia', Number(e.target.value))}
      className="form-control"
    >
      <option value={0}>Selecione uma matéria</option>
      {materias.map((materia, index) => (
        <option key={index + 1} value={index + 1}>
          {materia}
        </option>
      ))}
    </select>
  </div>
);
};

export default MediaTurma;