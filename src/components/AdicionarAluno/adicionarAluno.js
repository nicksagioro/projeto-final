'use client';
import React, { useState } from 'react';
import styles from './adicionarAluno.module.css';

export default function AdicionarAluno({ materias, adicionarAluno }) {
  const [materiaIndex, setMateriaIndex] = useState(0);
  const [nomeAluno, setNomeAluno] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomeAluno.trim() === '') return;

    adicionarAluno(materiaIndex, nomeAluno);
    setNomeAluno('');
  };

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>➕ Adicionar Aluno</h3>
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
          <label>Nome do Aluno:</label>
          <input
            type="text"
            value={nomeAluno}
            onChange={e => setNomeAluno(e.target.value)}
            className={styles['form-control']}
          />
        </div>

        <button type="submit" className={styles['btn-primary']}>
          Adicionar
        </button>

      </form>
    </div>
  );
}
