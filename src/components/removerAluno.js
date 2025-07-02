import React from 'react';
import styles from '../app/page.module.css';

function RemoverAluno({
  formData,
  turmas,
  notas,
  setTurmas,
  setNotas,
  setOutput,
  handleInputChange,
  materias,
  getAlunosOptions
}) {
  const removerAluno = () => {
    const { materia, alunoIndex } = formData;
    if (turmas[materia][alunoIndex] === 'VAGA') {
      setOutput('Aluno inválido!');
      return;
    }
    const nomeAluno = turmas[materia][alunoIndex];
    const newTurmas = {
      ...turmas,
      [materia]: [...turmas[materia]]
    };
    newTurmas[materia][alunoIndex] = 'VAGA';

    // Cópia profunda dos arrays internos
    const newNotas = {
      ...notas,
      nota1: notas.nota1.map(arr => [...arr]),
      nota2: notas.nota2.map(arr => [...arr]),
      recuperacao: notas.recuperacao.map(arr => [...arr]),
      mediaInicial: notas.mediaInicial.map(arr => [...arr]),
      mediaFinal: notas.mediaFinal.map(arr => [...arr]),
    };
    newNotas.nota1[materia][alunoIndex] = -1;
    newNotas.nota2[materia][alunoIndex] = -1;
    newNotas.recuperacao[materia][alunoIndex] = -1;
    newNotas.mediaInicial[materia][alunoIndex] = -1;
    newNotas.mediaFinal[materia][alunoIndex] = -1;

    setTurmas(newTurmas);
    setNotas(newNotas);
    setOutput(`Aluno ${nomeAluno} removido da turma.`);
  };

  return (
    <div className={styles['form-section'] + ' ' + styles.active}>
      <h3 className={styles['form-title']}>❌ Remover Aluno</h3>
      <div className={styles['form-grid']}>
        <div className={styles['form-group']}>
          <label htmlFor="materia-remover">Matéria:</label>
          <select
            id="materia-remover"
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
          <label htmlFor="aluno-remover">Aluno:</label>
          <select
            id="aluno-remover"
            value={formData.alunoIndex}
            onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
            className={styles['form-control']}
          >
            {getAlunosOptions(formData.materia).map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={removerAluno} className={`${styles['btn-primary']} ${styles['btn-danger']}`}>Remover Aluno</button>
    </div>
  );
}

export default RemoverAluno;