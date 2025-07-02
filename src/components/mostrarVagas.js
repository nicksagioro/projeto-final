import React from 'react';
import styles from '../app/page.module.css';

function MostrarVagas({ formData, turmas, materias, TOTAL_ALUNOS, setOutput }) {
  const handleMostrarVagas = () => {
    const { materia } = formData;
    const vagas = turmas[materia].filter(nome => nome === 'VAGA').length;
    setOutput(`Vagas disponíveis na turma de ${materias[materia]}: ${vagas}/${TOTAL_ALUNOS}`);
  };

  return (
    <div className={styles['form-section'] + ' ' + styles.active}>
      <h3 className={styles['form-title']}>📋 Ver Vagas</h3>
      <div className={styles['form-grid']}>
        <div className={styles['form-group']}>
          <label htmlFor="materia-vagas">Matéria:</label>
          <select
            id="materia-vagas"
            value={formData.materia}
            className={styles['form-control']}
            onChange={e => {
              handleInputChange('materia', Number(e.target.value));
              setOutput('');
            }}
          >
            {materias.map((mat, idx) => (
              <option key={idx} value={idx}>{mat}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleMostrarVagas} className={styles['btn-primary']}>Mostrar Vagas</button>
    </div>
  );
}

export default MostrarVagas;
