import React, { useState } from 'react';
import Menu from '../Menu/menu.js';
import NotaAluno from '../NotaAluno/notaAluno.js';
import Boletim from '../Boletim/boletim.js';
import MediaTurma from '../MediaTurma/mediaTurma.js';
import AdicionarAluno from '../AdicionarAluno/adicionarAluno.js';
import RemoverAluno from '../RemoverAluno/removerAluno.js';
import MostrarVagas from '../MostrarVagas/mostrarVagas.js';
import OutputArea from '../Output/outputArea.js';
import Header from '../Header/header.js'
import Footer from '../Footer/footer.js';

// Importando as configurações dos botões
import { menuOptions, renderContent } from '../Botoes/botao.js';

// Styles
import styles from './SistemaNotas.module.css';

// Constantes e variáveis
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

  const calcularVagas = () => {
    const { materia } = formData;
    const vagas = turmas[materia].filter(nome => nome === 'VAGA').length;
    setOutput(`Vagas disponíveis na turma de ${materias[materia]}: ${vagas}/${TOTAL_ALUNOS}`);
  };

  const adicionarAluno = (materiaIndex, nomeAluno) => {
    const turmaAtual = turmas[materiaIndex];
    const vagaIndex = turmaAtual.findIndex(nome => nome === 'VAGA');

    if (vagaIndex === -1) {
      setOutput('Turma lotada! Não há vagas disponíveis.');
      return;
    }

    const novasTurmas = {
      ...turmas,
      [materiaIndex]: turmaAtual.map((nome, idx) =>
        idx === vagaIndex ? nomeAluno : nome
      )
    };

    setTurmas(novasTurmas);
    setOutput(`Aluno ${nomeAluno} adicionado com sucesso na turma de ${materias[materiaIndex]}!`);
  };

  const removerAluno = (materiaIndex, alunoIndex) => {
    const turmaAtual = turmas[materiaIndex];

    if (turmaAtual[alunoIndex] === 'VAGA') {
      setOutput('Não é possível remover uma vaga.');
      return;
    }

    const nomeAluno = turmaAtual[alunoIndex];
    const novasTurmas = {
      ...turmas,
      [materiaIndex]: turmaAtual.map((nome, idx) =>
        idx === alunoIndex ? 'VAGA' : nome
      )
    };

    // Limpar as notas do aluno removido
    const newNotas = {
      ...notas,
      nota1: notas.nota1.map((arr, idx) =>
        idx === materiaIndex ? arr.map((nota, i) => i === alunoIndex ? -1 : nota) : arr
      ),
      nota2: notas.nota2.map((arr, idx) =>
        idx === materiaIndex ? arr.map((nota, i) => i === alunoIndex ? -1 : nota) : arr
      ),
      recuperacao: notas.recuperacao.map((arr, idx) =>
        idx === materiaIndex ? arr.map((nota, i) => i === alunoIndex ? -1 : nota) : arr
      ),
      mediaInicial: notas.mediaInicial.map((arr, idx) =>
        idx === materiaIndex ? arr.map((nota, i) => i === alunoIndex ? -1 : nota) : arr
      ),
      mediaFinal: notas.mediaFinal.map((arr, idx) =>
        idx === materiaIndex ? arr.map((nota, i) => i === alunoIndex ? -1 : nota) : arr
      )
    };

    setTurmas(novasTurmas);
    setNotas(newNotas);
    setOutput(`Aluno ${nomeAluno} removido com sucesso da turma de ${materias[materiaIndex]}!`);
  };

  const handleClick = (opcao) => {
    setOpcaoAtiva(opcao);
    setOutput('');
    clearForm();
  };

  // Função para renderizar o conteúdo usando a função importada
  const renderContentWrapper = () => {
    return renderContent(opcaoAtiva, {
      formData,
      turmas,
      notas,
      setNotas,
      handleInputChange,
      inserirNotas,
      mostrarRecuperacao,
      setOutput,
      materias,
      getAlunosComNotasOptions,
      adicionarAluno,
      removerAluno,
      NotaAluno,
      Boletim,
      MediaTurma,
      AdicionarAluno,
      RemoverAluno,
      MostrarVagas
    });
  };

    return (
    <div className={styles.App}>
      <Header />

      <main className={styles.main}>
        <Menu
          menuOptions={menuOptions}
          opcaoAtiva={opcaoAtiva}
          handleClick={handleClick}
        />

        {renderContentWrapper()}

        <OutputArea output={output} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
