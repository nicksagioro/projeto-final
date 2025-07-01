'use client';
import React, { useState } from 'react';
import './components/page.module.css'; 

const TOTAL_ALUNOS = 15;
const TOTAL_MATERIAS = 3;
const materias = ["Matemática", "Português", "Ciências"];

const App = () => {
  const [turmas, setTurmas] = useState({
    0: ["Ana", "Bruno", "Camila", "Diego", "Eduarda", "Felipe", "Gabriela", "Henrique", "Isabela", "João", "VAGA", "VAGA", "VAGA", "VAGA", "VAGA"],
    1: ["Lucas", "Marina", "Nina", "Otávio", "Patrícia", "Quirino", "Rafael", "Sofia", "Tiago", "Ursula", "VAGA", "VAGA", "VAGA", "VAGA", "VAGA"],
    2: ["Valéria", "William", "Xuxa", "Yara", "Zeca", "Alex", "Bia", "Carlos", "Dora", "Elena", "VAGA", "VAGA", "VAGA", "VAGA", "VAGA"]
  });

  const [notas, setNotas] = useState({
    nota1: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    nota2: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    recuperacao: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    mediaInicial: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    mediaFinal: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1))
  });

  const [opcaoAtiva, setOpcaoAtiva] = useState(null);
  const [output, setOutput] = useState('');
  const [mostrarRecuperacao, setMostrarRecuperacao] = useState(false);

  const [formData, setFormData] = useState({
    materia: 0,
    alunoIndex: 0,
    nota1: '',
    nota2: '',
    recuperacao: '',
    nomeAluno: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearForm = () => {
    setFormData({
      materia: 0,
      alunoIndex: 0,
      nota1: '',
      nota2: '',
      recuperacao: '',
      nomeAluno: ''
    });
    setMostrarRecuperacao(false);
  };

  const getAlunosOptions = (materia) => {
    return turmas[materia]
      .map((nome, index) => nome !== 'VAGA' ? { value: index, label: `${index} - ${nome}` } : null)
      .filter(option => option !== null);
  };

  const getAlunosComNotasOptions = (materia) => {
    return turmas[materia]
      .map((nome, index) => {
        if (nome !== 'VAGA' && notas.nota1[materia][index] >= 0) {
          return { value: index, label: `${index} - ${nome}` };
        }
        return null;
      })
      .filter(option => option !== null);
  };

  const inserirNotas = () => {
    const { materia, alunoIndex, nota1, nota2, recuperacao } = formData;
    const nota1Val = parseFloat(nota1);
    const nota2Val = parseFloat(nota2);

    // Validação de notas
    if (
      isNaN(nota1Val) || isNaN(nota2Val) ||
      nota1Val < 0 || nota1Val > 10 ||
      nota2Val < 0 || nota2Val > 10
    ) {
      setOutput('Por favor, insira notas entre 0 e 10.');
      return;
    }

    // Cópia profunda dos arrays internos
    const newNotas = {
      ...notas,
      nota1: notas.nota1.map(arr => [...arr]),
      nota2: notas.nota2.map(arr => [...arr]),
      recuperacao: notas.recuperacao.map(arr => [...arr]),
      mediaInicial: notas.mediaInicial.map(arr => [...arr]),
      mediaFinal: notas.mediaFinal.map(arr => [...arr]),
    };

    newNotas.nota1[materia][alunoIndex] = nota1Val;
    newNotas.nota2[materia][alunoIndex] = nota2Val;
    const mediaInicial = (nota1Val + nota2Val) / 2;
    newNotas.mediaInicial[materia][alunoIndex] = mediaInicial;

    if (mediaInicial < 7) {
      if (recuperacao && !isNaN(parseFloat(recuperacao)) && parseFloat(recuperacao) >= 0 && parseFloat(recuperacao) <= 10) {
        const recuperacaoVal = parseFloat(recuperacao);
        newNotas.recuperacao[materia][alunoIndex] = recuperacaoVal;
        const mediaFinal = (mediaInicial + recuperacaoVal) / 2;
        newNotas.mediaFinal[materia][alunoIndex] = mediaFinal;
        setNotas(newNotas);
        setOutput(`Notas inseridas com sucesso!\nMédia inicial: ${mediaInicial.toFixed(2)}\nMédia final: ${mediaFinal.toFixed(2)}`);
        setMostrarRecuperacao(false);
        clearForm();
      } else {
        setNotas(newNotas);
        setOutput(`Média inicial: ${mediaInicial.toFixed(2)}\nAluno precisa de recuperação. Digite a nota de recuperação e clique em "Inserir Notas" novamente.`);
        setMostrarRecuperacao(true);
      }
    } else {
      newNotas.mediaFinal[materia][alunoIndex] = mediaInicial;
      setNotas(newNotas);
      setOutput(`Notas inseridas com sucesso!\nMédia final: ${mediaInicial.toFixed(2)}`);
      clearForm();
    }
  };

  const imprimirBoletim = () => {
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

  const mostrarMediaTurma = () => {
    const { materia } = formData;
    let soma = 0;
    let contador = 0;
    for (let i = 0; i < TOTAL_ALUNOS; i++) {
      if (notas.mediaFinal[materia][i] >= 0) {
        soma += notas.mediaFinal[materia][i];
        contador++;
      }
    }
    if (contador > 0) {
      setOutput(`Média da turma de ${materias[materia]}: ${(soma / contador).toFixed(2)}`);
    } else {
      setOutput(`Ainda não há médias lançadas para a turma de ${materias[materia]}.`);
    }
  };

  const adicionarAluno = () => {
    const { materia, nomeAluno } = formData;
    if (!nomeAluno.trim()) {
      setOutput('Por favor, digite um nome válido.');
      return;
    }
    // Cópia do array interno
    const newTurmas = {
      ...turmas,
      [materia]: [...turmas[materia]]
    };
    for (let i = 0; i < TOTAL_ALUNOS; i++) {
      if (newTurmas[materia][i] === 'VAGA') {
        newTurmas[materia][i] = nomeAluno.trim();
        setTurmas(newTurmas);
        setOutput(`Aluno ${nomeAluno} adicionado na posição ${i}`);
        clearForm();
        return;
      }
    }
    setOutput('Não há vagas disponíveis nessa turma!');
  };

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

  const mostrarVagas = () => {
    const { materia } = formData;
    const vagas = turmas[materia].filter(nome => nome === 'VAGA').length;
    setOutput(`Vagas disponíveis na turma de ${materias[materia]}: ${vagas}/${TOTAL_ALUNOS}`);
  };

  const renderForm = () => {
    switch (opcaoAtiva) {
      case 1:
        return (
          <div className="form-section active">
            <h3 className="form-title">📝 Inserir Notas de Aluno</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="materia-nota">Matéria:</label>
                <select
                  id="materia-nota"
                  value={formData.materia}
                  onChange={e => handleInputChange('materia', Number(e.target.value))}
                  className="form-control"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="aluno-nota">Aluno:</label>
                <select
                  id="aluno-nota"
                  value={formData.alunoIndex}
                  onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
                  className="form-control"
                >
                  {getAlunosOptions(formData.materia).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nota1">Nota 1:</label>
                <input
                  id="nota1"
                  type="number"
                  value={formData.nota1}
                  onChange={e => handleInputChange('nota1', e.target.value)}
                  className="form-control"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nota2">Nota 2:</label>
                <input
                  id="nota2"
                  type="number"
                  value={formData.nota2}
                  onChange={e => handleInputChange('nota2', e.target.value)}
                  className="form-control"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
              {mostrarRecuperacao && (
                <div className="form-group">
                  <label htmlFor="recuperacao">Nota de Recuperação:</label>
                  <input
                    id="recuperacao"
                    type="number"
                    value={formData.recuperacao}
                    onChange={e => handleInputChange('recuperacao', e.target.value)}
                    className="form-control"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>
              )}
            </div>
            <button onClick={inserirNotas} className="btn-primary">Inserir Notas</button>
          </div>
        );
      case 2:
        return (
          <div className="form-section active">
            <h3 className="form-title">📊 Imprimir Boletim</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="materia-boletim">Matéria:</label>
                <select
                  id="materia-boletim"
                  value={formData.materia}
                  onChange={e => handleInputChange('materia', Number(e.target.value))}
                  className="form-control"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="aluno-boletim">Aluno:</label>
                <select
                  id="aluno-boletim"
                  value={formData.alunoIndex}
                  onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
                  className="form-control"
                >
                  {getAlunosComNotasOptions(formData.materia).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={imprimirBoletim} className="btn-primary">Imprimir Boletim</button>
          </div>
        );
      case 3:
        return (
          <div className="form-section active">
            <h3 className="form-title">📈 Média da Turma</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="materia-media">Matéria:</label>
                <select
                  id="materia-media"
                  value={formData.materia}
                  onChange={e => handleInputChange('materia', Number(e.target.value))}
                  className="form-control"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={mostrarMediaTurma} className="btn-primary">Ver Média</button>
          </div>
        );
      case 4:
        return (
          <div className="form-section active">
            <h3 className="form-title">👤 Adicionar Aluno</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="materia-add">Matéria:</label>
                <select
                  id="materia-add"
                  value={formData.materia}
                  onChange={e => handleInputChange('materia', Number(e.target.value))}
                  className="form-control"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nomeAluno">Nome do Aluno:</label>
                <input
                  id="nomeAluno"
                  type="text"
                  value={formData.nomeAluno}
                  onChange={e => handleInputChange('nomeAluno', e.target.value)}
                  className="form-control"
                  placeholder="Digite o nome completo"
                />
              </div>
            </div>
            <button onClick={adicionarAluno} className="btn-primary">Adicionar Aluno</button>
          </div>
        );
      case 5:
        return (
          <div className="form-section active">
            <h3 className="form-title">❌ Remover Aluno</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="materia-remover">Matéria:</label>
                <select
                  id="materia-remover"
                  value={formData.materia}
                  onChange={e => handleInputChange('materia', Number(e.target.value))}
                  className="form-control"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="aluno-remover">Aluno:</label>
                <select
                  id="aluno-remover"
                  value={formData.alunoIndex}
                  onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
                  className="form-control"
                >
                  {getAlunosOptions(formData.materia).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={removerAluno} className="btn-primary btn-danger">Remover Aluno</button>
          </div>
        );
      case 6:
        return (
          <div className="form-section active">
            <h3 className="form-title">📋 Ver Vagas Disponíveis</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="materia-vagas">Matéria:</label>
                <select
                  id="materia-vagas"
                  value={formData.materia}
                  onChange={e => handleInputChange('materia', Number(e.target.value))}
                  className="form-control"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={mostrarVagas} className="btn-primary">Ver Vagas</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <img className="senai" src="../imagem/senai-logo.png" ></img>
          </div>
          <div className="header-content">
            <p className="subtitle">SENAI - Serviço Nacional de Aprendizagem Industrial</p>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="main-container">
        <div className="system-card">
          <div className="card-header">
            <h2>Sistema de Notas e Alunos</h2>
            <p>Gerencie turmas, alunos e avaliações de forma integrada</p>
          </div>
          {/* Menu Principal */}
          <section className="menu-section">
            <h3 className="section-title">Menu Principal</h3>
            <div className="menu-grid">
              <button className={`menu-btn ${opcaoAtiva === 1 ? 'active' : ''}`}
                onClick={() => { setOpcaoAtiva(1); setOutput(''); clearForm(); }}>
                <div className="btn-icon">📝</div>
                <div className="btn-content">
                  <span className="btn-title">Inserir Notas</span>
                  <span className="btn-desc">Lançar notas dos alunos</span>
                </div>
              </button>
              <button className={`menu-btn ${opcaoAtiva === 2 ? 'active' : ''}`}
                onClick={() => { setOpcaoAtiva(2); setOutput(''); clearForm(); }}>
                <div className="btn-icon">📊</div>
                <div className="btn-content">
                  <span className="btn-title">Boletim</span>
                  <span className="btn-desc">Imprimir boletim individual</span>
                </div>
              </button>
              <button className={`menu-btn ${opcaoAtiva === 3 ? 'active' : ''}`}
                onClick={() => { setOpcaoAtiva(3); setOutput(''); clearForm(); }}>
                <div className="btn-icon">📈</div>
                <div className="btn-content">
                  <span className="btn-title">Média da Turma</span>
                  <span className="btn-desc">Ver desempenho geral</span>
                </div>
              </button>
              <button className={`menu-btn ${opcaoAtiva === 4 ? 'active' : ''}`}
                onClick={() => { setOpcaoAtiva(4); setOutput(''); clearForm(); }}>
                <div className="btn-icon">👤</div>
                <div className="btn-content">
                  <span className="btn-title">Adicionar Aluno</span>
                  <span className="btn-desc">Matricular novo aluno</span>
                </div>
              </button>
              <button className={`menu-btn ${opcaoAtiva === 5 ? 'active' : ''}`}
                onClick={() => { setOpcaoAtiva(5); setOutput(''); clearForm(); }}>
                <div className="btn-icon">❌</div>
                <div className="btn-content">
                  <span className="btn-title">Remover Aluno</span>
                  <span className="btn-desc">Cancelar matrícula</span>
                </div>
              </button>
              <button className={`menu-btn ${opcaoAtiva === 6 ? 'active' : ''}`}
                onClick={() => { setOpcaoAtiva(6); setOutput(''); clearForm(); }}>
                <div className="btn-icon">📋</div>
                <div className="btn-content">
                  <span className="btn-title">Ver Vagas</span>
                  <span className="btn-desc">Consultar disponibilidade</span>
                </div>
              </button>
            </div>
          </section>
          {/* Formulários */}
          <div className="form-container">
            {renderForm()}
          </div>
          {/* Output Area */}
          <div className={`output-area ${output ? 'has-content' : ''}`}>
            {output && <pre>{output}</pre>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
