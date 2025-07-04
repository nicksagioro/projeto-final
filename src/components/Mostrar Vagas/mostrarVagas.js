'use client';
import React from 'react';
import styles from './mostrarVagas.module.css';

export default function MostrarVagas({ turmas }) {
  const capacidadeMaxima = 5; // Você pode alterar para o limite da sua turma

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>📋 Vagas Disponíveis</h3>
      <div className={styles['form-grid']}>
        {Object.keys(turmas).map((idx) => (
          <div key={idx} className={styles['form-group']}>
            <strong>Matéria {Number(idx) + 1}:</strong> {capacidadeMaxima - (Array.isArray(turmas[idx]) ? turmas[idx].length : 0)} vagas disponíveis
          </div>
        ))}
      </div>
    </div>
  );
}
