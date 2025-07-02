import React, { useState } from 'react';
import styles from '../app/page.module.css';

const materias = ["Matemática", "Português", "Ciências"];

function NotaAluno({
  getAlunosOptions,
  mostrarRecuperacao,
  inserirNotas
}) {
  const [formData, setFormData] = useState({
    materia: 0,
    alunoIndex: 0,
    nota1: '',
    nota2: '',
    recuperacao: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const safeFormData = formData || {};

  const alunosOptions = typeof getAlunosOptions === 'function'
    ? getAlunosOptions(safeFormData.materia)
    : [];

  return (
    <div className={styles['form-section'] + ' ' + styles.active}>
      <h3 className={styles['form-title']}>📝 Inserir Notas de Aluno</h3>
      <div className={styles['form-grid']}>
        <div className={styles['form-group']}>
          <label htmlFor="materia-nota">Matéria:</label>
          <select
            id="materia-nota"
            value={safeFormData.materia}
            onChange={e => handleInputChange('materia', Number(e.target.value))}
            className={styles['form-control']}
          >
            {Array.isArray(materias) && materias.map((mat, idx) => (
              <option key={idx} value={idx}>{mat}</option>
            ))}
          </select>
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="aluno-nota">Aluno:</label>
          <select
            id="aluno-nota"
            value={safeFormData.alunoIndex}
            onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
            className={styles['form-control']}
          >
            {alunosOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="nota1">Nota 1:</label>
          <input
            id="nota1"
            type="number"
            value={safeFormData.nota1}
            onChange={e => handleInputChange('nota1', e.target.value)}
            className={styles['form-control']}
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="nota2">Nota 2:</label>
          <input
            id="nota2"
            type="number"
            value={safeFormData.nota2}
            onChange={e => handleInputChange('nota2', e.target.value)}
            className={styles['form-control']}
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        {mostrarRecuperacao && (
          <div className={styles['form-group']}>
            <label htmlFor="recuperacao">Nota de Recuperação:</label>
            <input
              id="recuperacao"
              type="number"
              value={safeFormData.recuperacao}
              onChange={e => handleInputChange('recuperacao', e.target.value)}
              className={styles['form-control']}
              min="0"
              max="10"
              step="0.1"
            />
          </div>
        )}
      </div>
      <button onClick={inserirNotas} className={styles['btn-primary']}>Inserir Notas</button>
    </div>
  );
}

export default NotaAluno;