import styles from './vagasMaterias.module.css';

function VagasMaterias({ telaAtual, formData, handleInputChange, materias, mostrarVagas }) {
  switch (telaAtual) {
    case 'verVagas':
      return (
        <div className={styles['form-section'] + ' ' + styles.active}>
          <h3 className={styles['form-title']}>📋 Ver Vagas Disponíveis</h3>
          <div className={styles['form-grid']}>
            <div className={styles['form-group']}>
              <label htmlFor="materia-vagas">Matéria:</label>
              <select
                id="materia-vagas"
                value={formData.materia}
                onChange={e => handleInputChange('materia', Number(e.target.value))}
                className={styles['form-control']}
              >
                {materias.map((mat, idx) => (
                  <option key={idx} value={idx}>{mat}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={mostrarVagas} className={styles['btn-primary']}>Ver Vagas</button>
        </div>
      );

    default:
      return null;
  }
}

export default VagasMaterias;