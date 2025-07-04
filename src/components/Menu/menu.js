import React from 'react';
import styles from './menu.module.css';

export default function Menu({ menuOptions, opcaoAtiva, handleClick }) {
  return (
    <section className={styles['menu-section']}>
      <h3 className={styles['section-title']}>Menu Principal</h3>
      <div className={styles['menu-grid']}>
        {menuOptions.map(({ id, icon, title, desc }) => (
          <button
            key={id}
            className={`${styles['menu-btn']} ${opcaoAtiva === id ? styles.active : ''}`}
            onClick={() => handleClick(id)}
          >
            <div className={styles['btn-icon']}>{icon}</div>
            <div className={styles['btn-content']}>
              <span className={styles['btn-title']}>{title}</span>
              <span className={styles['btn-desc']}>{desc}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
