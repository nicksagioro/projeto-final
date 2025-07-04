import React from "react";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <img
          className={styles.senai ? styles.senai : ""}
          src={"/imagem/senai-logo2.png"}
          alt="Logo do SENAI"
        />
        <div className={styles["header-content"]}>
          <p className={styles.subtitle}>
            SENAI - Serviço Nacional de Aprendizagem Industrial
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;