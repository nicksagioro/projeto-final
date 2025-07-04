'use client';
import React from 'react';
import styles from './notaAluno.module.css';

export default function NotaAluno({ formData, turmas, notas, setNotas, handleInputChange }) {
  const handleNotaChange = (field, value) => {
    const { materia, alunoIndex } = formData;
    const novaNota = Number(value);

    setNotas(prev => ({
      ...prev,
      [field]: prev[field].map((arr, idx) =>
        idx === materia
          ? arr.map((n, i) => (i === alunoIndex ? novaNota : n))
          : arr
      ),
    }));
  };

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>📝 Lançar Nota</h3>
      <div className={styles['form-grid']}>

        <div className={styles['form-group']}>
          <label>Matéria:</label>
          <select
            value={formData.materia}
            onChange={e => handleInputChange('materia', Number(e.target.value))}
            className={styles['form-control']}
          >
            {Object.keys(turmas).map((idx) => (
              <option key={idx} value={idx}>Matéria {Number(idx) + 1}</option>
            ))}
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Aluno:</label>
          <select
            value={formData.alunoIndex}
            onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
            className={styles['form-control']}
          >
            {turmas[formData.materia]?.map((aluno, idx) => (
              <option key={idx} value={idx}>{aluno}</option>
            ))}
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Nota 1:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={notas.nota1?.[formData.materia]?.[formData.alunoIndex] || ''}
            onChange={e => handleNotaChange('nota1', e.target.value)}
            className={styles['form-control']}
          />
        </div>

        <div className={styles['form-group']}>
          <label>Nota 2:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={notas.nota2?.[formData.materia]?.[formData.alunoIndex] || ''}
            onChange={e => handleNotaChange('nota2', e.target.value)}
            className={styles['form-control']}
          />
        </div>

      </div>
    </div>
  );
}
