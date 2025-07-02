import React from 'react';
import styles from './mainContent.module.css';

function MainContent() {
  return (
    <main className={styles['main-container']}>
      <div className={styles['system-card']}>
        <div className={styles['card-header']}>
          <h2>Sistema de Notas e Alunos</h2>
          <p>Gerencie turmas, alunos e avaliações de forma integrada</p>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
