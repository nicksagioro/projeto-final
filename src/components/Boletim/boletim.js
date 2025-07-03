import React from 'react';
import styles from '../components/boletim.module.css';

function Boletim({
  formData,
  setOutput,
  turmas,
  materias,
  notas,
  handleInputChange,
  getAlunosComNotasOptions
}) {
  const gerarBoletim = () => {
    const { materia, alunoIndex } = formData;
    if (notas.nota1[materia][alunoIndex] < 0) {
      setOutput('Aluno inválido ou sem notas lançadas!');
      return;
    }
    const nomeAluno = turmas[materia][alunoIndex];
    let boletim = `--- Boletim do aluno: ${nomeAluno} - ${materias[materia]} ---\n`;
    boletim += `Nota 1: ${notas.nota1[materia][alunoIndex]}\n`;
    boletim += `Nota 2: ${notas.nota2[materia][alunoIndex]}\n`;
    boletim += `Média Inicial: ${notas.mediaInicial[materia][alunoIndex].toFixed(2)}\n`;
    if (notas.mediaInicial[materia][alunoIndex] < 7) {
      boletim += `Nota Recuperação: ${notas.recuperacao[materia][alunoIndex]}\n`;
    }
    boletim += `Média Final: ${notas.mediaFinal[materia][alunoIndex].toFixed(2)}\n`;
    setOutput(boletim);
  };

  return (
    <div className={styles['form-section'] + ' ' + (styles.active || '')}>
      <h3 className={styles['form-title']}>📊 Imprimir Boletim</h3>
      <div className={styles['form-grid']}>
        <div className={styles['form-group']}>
          <label htmlFor="materia-boletim">Matéria:</label>
          <select
            id="materia-boletim"
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
          <label htmlFor="aluno-boletim">Aluno:</label>
          <select
            id="aluno-boletim"
            value={formData.alunoIndex}
            onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
            className={styles['form-control']}
          >
            {getAlunosComNotasOptions(formData.materia).map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={gerarBoletim} className={styles['btn-primary']}>Imprimir Boletim</button>
    </div>
  );
}

export default Boletim;
