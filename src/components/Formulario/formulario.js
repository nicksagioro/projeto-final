import React from 'react';
import styles from '../app/page.module.css';

function Formulario({ formData, handleInputChange, onSubmit }) {
  return (
    <div className={styles['form-container']}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nome do aluno"
          className={styles['input']}
          value={formData.nomeAluno}
          onChange={e => handleInputChange('nomeAluno', e.target.value)}
        />
        {/* Adicione outros campos conforme necessário */}
        <button type="submit" className={styles['btn-primary']}>Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;