import React from 'react';
import styles from './menu.module.css';

function Menu({ opcaoAtiva, setOpcaoAtiva, setOutput, clearForm }) {
  return (
    <section className={styles['menu-section']}>
      <h3 className={styles['section-title']}>Menu Principal</h3>
      <div className={styles['menu-grid']}>
        <button className={`${styles['menu-btn']} ${opcaoAtiva === 1 ? styles.active : ''}`}
          onClick={() => { setOpcaoAtiva(1); setOutput(''); clearForm(); }}>
          <div className={styles['btn-icon']}>📝</div>
          <div className={styles['btn-content']}>
            <span className={styles['btn-title']}>Inserir Notas</span>
            <span className={styles['btn-desc']}>Lançar notas dos alunos</span>
          </div>
        </button>
        <button className={`${styles['menu-btn']} ${opcaoAtiva === 2 ? styles.active : ''}`}
          onClick={() => { setOpcaoAtiva(2); setOutput(''); clearForm(); }}>
          <div className={styles['btn-icon']}>📊</div>
          <div className={styles['btn-content']}>
            <span className={styles['btn-title']}>Boletim</span>
            <span className={styles['btn-desc']}>Imprimir boletim individual</span>
          </div>
        </button>
        <button className={`${styles['menu-btn']} ${opcaoAtiva === 3 ? styles.active : ''}`}
          onClick={() => { setOpcaoAtiva(3); setOutput(''); clearForm(); }}>
          <div className={styles['btn-icon']}>📈</div>
          <div className={styles['btn-content']}>
            <span className={styles['btn-title']}>Média da Turma</span>
            <span className={styles['btn-desc']}>Ver desempenho geral</span>
          </div>
        </button>
        <button className={`${styles['menu-btn']} ${opcaoAtiva === 4 ? styles.active : ''}`}
          onClick={() => { setOpcaoAtiva(4); setOutput(''); clearForm(); }}>
          <div className={styles['btn-icon']}>👤</div>
          <div className={styles['btn-content']}>
            <span className={styles['btn-title']}>Adicionar Aluno</span>
            <span className={styles['btn-desc']}>Matricular novo aluno</span>
          </div>
        </button>
        <button className={`${styles['menu-btn']} ${opcaoAtiva === 5 ? styles.active : ''}`}
          onClick={() => { setOpcaoAtiva(5); setOutput(''); clearForm(); }}>
          <div className={styles['btn-icon']}>❌</div>
          <div className={styles['btn-content']}>
            <span className={styles['btn-title']}>Remover Aluno</span>
            <span className={styles['btn-desc']}>Cancelar matrícula</span>
          </div>
        </button>
        <button className={`${styles['menu-btn']} ${opcaoAtiva === 6 ? styles.active : ''}`}
          onClick={() => { setOpcaoAtiva(6); setOutput(''); clearForm(); }}>
          <div className={styles['btn-icon']}>📋</div>
          <div className={styles['btn-content']}>
            <span className={styles['btn-title']}>Ver Vagas</span>
            <span className={styles['btn-desc']}>Consultar disponibilidade</span>
          </div>
        </button>
      </div>
    </section>
  );
}

export default Menu;