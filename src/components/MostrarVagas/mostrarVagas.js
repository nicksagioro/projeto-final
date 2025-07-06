'use client';
import React from 'react';
import styles from './mostrarVagas.module.css';

export default function MostrarVagas({ turmas }) {
  const capacidadeMaxima = 45; 
  const materias = ['Matemática', 'Português', 'Ciências'];

  return (
    <div className={styles['form-section']}>
      <h3 className={styles['form-title']}>📋 Vagas Disponíveis</h3>
      <div className={styles['form-grid']}>
        {Object.keys(turmas).map((idx) => (
          <div key={idx} className={styles['form-group']}>
            <strong>{materias[Number(idx)] || `Matéria ${Number(idx) + 1}`}:</strong> {capacidadeMaxima - (Array.isArray(turmas[idx]) ? turmas[idx].length : 0)} vagas disponíveis
          </div>
        ))}
      </div>
    </div>
  );
}