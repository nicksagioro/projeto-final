import React from 'react';
import styles from '../app/page.module.css';

function AdicionarAluno({
  turmas,
  setTurmas,
  setOutput,
  clearForm,
  formData,
  handleInputChange,
  materias,
  TOTAL_ALUNOS
}) {
  const handleAdicionarAluno = () => {
    if (!formData.nomeAluno || !formData.nomeAluno.trim()) {
      setOutput('Digite um nome válido para o aluno!');
      return;
    }
    const newTurmas = {
      ...turmas,
      [formData.materia]: [...turmas[formData.materia]]
    };
    for (let i = 0; i < TOTAL_ALUNOS; i++) {
      if (newTurmas[formData.materia][i] === 'VAGA') {
        newTurmas[formData.materia][i] = formData.nomeAluno.trim();
        setTurmas(newTurmas);
        setOutput(`Aluno ${formData.nomeAluno} adicionado na posição ${i}`);
        clearForm();
        return;
      }
    }
    setOutput('Não há vagas disponíveis nessa turma!');
  };

  return (
    <div className={styles['form-section'] + ' ' + styles.active}>
      <h3 className={styles['form-title']}>👤 Adicionar Aluno</h3>
      <div className={styles['form-grid']}>
        <div className={styles['form-group']}>
          <label htmlFor="materia-add">Matéria:</label>
          <select
            id="materia-add"
            value={formData.materia}
            onChange={e => handleInputChange('materia', Number(e.target.value))}
            className={styles['form-control']}
          >
            {materias.map((mat, idx) => (
              <option key={idx} value={idx}>{mat}</option>
            ))}
          </select>
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="nomeAluno">Nome do Aluno:</label>
          <input
            id="nomeAluno"
            type="text"
            value={formData.nomeAluno}
            onChange={e => handleInputChange('nomeAluno', e.target.value)}
            className={styles['form-control']}
            placeholder="Digite o nome completo"
          />
        </div>
      </div>
      <button onClick={handleAdicionarAluno} className={styles['btn-primary']}>Adicionar Aluno</button>
    </div>
  );
}

export default AdicionarAluno;