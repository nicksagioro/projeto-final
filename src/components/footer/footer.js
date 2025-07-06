import React from 'react';
import styles from './footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Sistema de Notas</p>
      <p>Desenvolvido por [Nicolas Sagioro e Brian Fontes]</p>
    </footer>
  );
};

export default Footer;
