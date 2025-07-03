import React from 'react';
import styles from './mediaTurma.module.css'

function MediaTurma({ formData, handleInputChange, materias, mostrarMediaTurma }) {
  return (
    <div className={styles['form-section'] + ' ' + styles.active}>
      <h3 className={styles['form-title']}>📈 Média da Turma</h3>
      <div className={styles['form-grid']}>
        <div className={styles['form-group']}>
          <label htmlFor="materia-media">Matéria:</label>
          <select
            id="materia-media"
            value={formData.materia}
            onChange={e => handleInputChange('materia', Number(e.target.value))}
            className={styles['form-control']}
          >
            {materias.map((mat, idx) => (
              <option key={idx} value={idx}>{mat}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={mostrarMediaTurma} className={styles['btn-primary']}>Ver Média</button>
    </div>
  );
}

export default MediaTurma;