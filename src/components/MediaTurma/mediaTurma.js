'use client';
import React from 'react';
import styles from './mediaTurma.module.css';

export default function MediaTurma({ turmas, notas }) {
  const calcularMediaTurma = (materiaIndex) => {
    const alunos = turmas[materiaIndex];
    if (!alunos || alunos.length === 0) return 0;

    let somaMedias = 0;

    alunos.forEach((_, idx) => {
      const media = (notas.nota1[materiaIndex][idx] + notas.nota2[materiaIndex][idx]) / 2;
      somaMedias += media;
    });

    return (somaMedias / alunos.length).toFixed(2);
  };

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>📈 Média das Turmas</h3>
      <div className={styles['form-grid']}>
        {Object.keys(turmas).map((idx) => (
          <div key={idx} className={styles['form-group']}>
            <strong>Matéria {Number(idx) + 1}:</strong> {calcularMediaTurma(Number(idx))}
          </div>
        ))}
      </div>
    </div>
  );
}
