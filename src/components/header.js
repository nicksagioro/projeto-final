import React from 'react';
import Image from 'next/image';
import styles from '../app/page.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Image
          className={styles.senai}
          src="/imagem/senai-logo.png"
          alt="Logo SENAI"
          width={120}
          height={60}
        />
        <div className={styles['header-content']}>
          <p className={styles.subtitle}>SENAI - Serviço Nacional de Aprendizagem Industrial</p>
        </div>
      </div>
    </header>
  );
}

export default Header;