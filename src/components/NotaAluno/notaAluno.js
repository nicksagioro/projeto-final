'use client';
import React from 'react';
import styles from './notaAluno.module.css';

export default function NotaAluno({
  formData,
  turmas,
  notas,
  setNotas,
  handleInputChange,
  inserirNotas,
  mostrarRecuperacao
}) {
  const materias = ['Matemática', 'Português', 'Ciências'];

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
              <option key={idx} value={idx}>{materias[idx]}</option>
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
              aluno !== 'VAGA' ? (
                <option key={idx} value={idx}>{idx} - {aluno}</option>
              ) : null
            )).filter(Boolean)}
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Nota 1:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.nota1}
            onChange={e => handleInputChange('nota1', e.target.value)}
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
            value={formData.nota2}
            onChange={e => handleInputChange('nota2', e.target.value)}
            className={styles['form-control']}
          />
        </div>

        {mostrarRecuperacao && (
          <div className={styles['form-group']}>
            <label>Nota Recuperação:</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.recuperacao}
              onChange={e => handleInputChange('recuperacao', e.target.value)}
              className={styles['form-control']}
            />
          </div>
        )}

      </div>

      <button onClick={inserirNotas} className={styles['btn-tertiary']}>
        Inserir Notas
      </button>
    </div>
  );
}