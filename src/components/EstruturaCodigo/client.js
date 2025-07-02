'use client';
import React, { useState } from 'react';
import styles from '../app/page.module.css';
import Menu from '../Menu/menu';
import OutputArea from '../Output/outputArea';
import NotaAluno from '../Nota Aluno/notaAluno';
import Boletim from '../Boletim/boletim';
import MediaTurma from '../Media Turma/mediaTurma';
import AdicionarAluno from '../Adicionar Aluno/adicionarAluno';
import RemoverAluno from '../Remover Aluno/removerAluno';
import MostrarVagas from '../Mostrar Vagas/mostrarVagas';

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

  return (
    <div className={styles.App}>
      <Menu
        opcaoAtiva={opcaoAtiva}
        setOpcaoAtiva={setOpcaoAtiva}
        setOutput={setOutput}
        clearForm={clearForm}
      />

      {/* Renderização condicional dos formulários conforme o menu */}
      {opcaoAtiva === 1 && (
        <NotaAluno
          formData={formData}
          handleInputChange={handleInputChange}
          materias={materias}
          getAlunosOptions={getAlunosOptions}
          mostrarRecuperacao={mostrarRecuperacao}
          inserirNotas={inserirNotas}
        />
      )}

      {opcaoAtiva === 2 && (
        <Boletim
          formData={formData}
          setOutput={setOutput}
          turmas={turmas}
          materias={materias}
          notas={notas}
          handleInputChange={handleInputChange}
          getAlunosComNotasOptions={getAlunosComNotasOptions}
        />
      )}

      {opcaoAtiva === 3 && (
        <MediaTurma
          formData={formData}
          handleInputChange={handleInputChange}
          materias={materias}
          mostrarMediaTurma={() => {
            const { materia } = formData;
            const alunosValidos = turmas[materia].filter((nome, idx) => nome !== 'VAGA' && notas.mediaFinal[materia][idx] >= 0);
            if (alunosValidos.length === 0) {
              setOutput('Nenhum aluno com notas lançadas nesta turma.');
              return;
            }
            const soma = turmas[materia].reduce((acc, nome, idx) => {
              if (nome !== 'VAGA' && notas.mediaFinal[materia][idx] >= 0) {
                return acc + notas.mediaFinal[materia][idx];
              }
              return acc;
            }, 0);
            const media = soma / alunosValidos.length;
            setOutput(`Média da turma de ${materias[materia]}: ${media.toFixed(2)}`);
          }}
        />
      )}

      {opcaoAtiva === 4 && (
        <AdicionarAluno
          turmas={turmas}
          setTurmas={setTurmas}
          setOutput={setOutput}
          clearForm={clearForm}
          formData={formData}
          handleInputChange={handleInputChange}
          materias={materias}
          TOTAL_ALUNOS={TOTAL_ALUNOS}
        />
      )}

      {opcaoAtiva === 5 && (
        <RemoverAluno
          formData={formData}
          turmas={turmas}
          notas={notas}
          setTurmas={setTurmas}
          setNotas={setNotas}
          setOutput={setOutput}
          handleInputChange={handleInputChange}
          materias={materias}
          getAlunosOptions={getAlunosOptions}
        />
      )}

      {opcaoAtiva === 6 && (
        <MostrarVagas
          formData={formData}
          turmas={turmas}
          materias={materias}
          TOTAL_ALUNOS={TOTAL_ALUNOS}
          setOutput={() => {
            const { materia } = formData;
            const vagas = turmas[materia].filter(nome => nome === 'VAGA').length;
            setOutput(`Vagas disponíveis na turma de ${materias[materia]}: ${vagas}/${TOTAL_ALUNOS}`);
          }}
        />
      )}

      <OutputArea output={output} />
    </div>
  );
};

export default App;