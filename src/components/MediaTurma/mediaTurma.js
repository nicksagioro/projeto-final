'use client';
import React from 'react';
import styles from './mediaTurma.module.css';

export default function MediaTurma({ turmas, notas }) {
  const materias = ['Matemática', 'Português', 'Ciências'];

  const calcularMediaTurma = (materiaIndex) => {
    const alunos = turmas[materiaIndex];
    if (!alunos || !Array.isArray(alunos) || alunos.length === 0) return '0.00';

    let somaMedias = 0;
    let alunosValidos = 0;

    alunos.forEach((_, idx) => {
      const nota1 = notas?.nota1?.[materiaIndex]?.[idx];
      const nota2 = notas?.nota2?.[materiaIndex]?.[idx];

      if (typeof nota1 === 'number' && typeof nota2 === 'number' && nota1 >= 0 && nota2 >= 0) {
        const media = (nota1 + nota2) / 2;
        somaMedias += media;
        alunosValidos++;
      }
    });

    if (alunosValidos === 0) return '0.00';

    return (somaMedias / alunosValidos).toFixed(2);
  };

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>📈 Média das Turmas</h3>
      <div className={styles['form-grid']}>
        {Object.keys(turmas).map((idx) => (
          <div key={idx} className={styles['form-group']}>
            <strong>{materias[Number(idx)] || `Matéria ${Number(idx) + 1}`}:</strong> {calcularMediaTurma(Number(idx))}
          </div>
        ))}
      </div>
    </div>
  );
}
