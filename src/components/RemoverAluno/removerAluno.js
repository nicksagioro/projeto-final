'use client';
import React, { useState } from 'react';
import styles from './removerAluno.module.css';

export default function RemoverAluno({ materias, turmas, removerAluno }) {
  const [materiaIndex, setMateriaIndex] = useState(0);
  const [alunoIndex, setAlunoIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!turmas[materiaIndex] || turmas[materiaIndex].length === 0) return;

    removerAluno(materiaIndex, alunoIndex);
    setAlunoIndex(0);
  };

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>➖ Remover Aluno</h3>
      <form onSubmit={handleSubmit} className={styles['form-grid']}>

        <div className={styles['form-group']}>
          <label>Matéria:</label>
          <select
            value={materiaIndex}
            onChange={e => setMateriaIndex(Number(e.target.value))}
            className={styles['form-control']}
          >
            {materias.map((mat, idx) => (
              <option key={idx} value={idx}>{mat}</option>
            ))}
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Aluno:</label>
          <select
            value={alunoIndex}
            onChange={e => setAlunoIndex(Number(e.target.value))}
            className={styles['form-control']}
          >
            {turmas[materiaIndex]?.map((aluno, idx) => (
              <option key={idx} value={idx}>{aluno}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles['btn-primary']}>
          Remover
        </button>

      </form>
    </div>
  );
}
