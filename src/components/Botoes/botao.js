// Configuração dos botões do menu
export const menuOptions = [
  { id: 1, icon: '📝', title: 'Inserir notas dos alunos' },
  { id: 2, icon: '📊', title: 'Boletim' },
  { id: 3, icon: '📈', title: 'Média da Turma' },
  { id: 4, icon: '👤', title: 'Adicionar Aluno'},
  { id: 5, icon: '❌', title: 'Remover Aluno' },
  { id: 6, icon: '📋', title: 'Ver Vagas' }
];

// Função para renderizar o conteúdo baseado na opção ativa
export const renderContent = (opcaoAtiva, props) => {
  const {
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
  } = props;

  switch (opcaoAtiva) {
    case 1:
      return (
        <NotaAluno
          formData={formData}
          turmas={turmas}
          notas={notas}
          setNotas={setNotas}
          handleInputChange={handleInputChange}
          inserirNotas={inserirNotas}
          mostrarRecuperacao={mostrarRecuperacao}
        />
      );
    case 2:
      return (
        <Boletim
          formData={formData}
          setOutput={setOutput}
          turmas={turmas}
          materias={materias}
          notas={notas}
          handleInputChange={handleInputChange}
          getAlunosComNotasOptions={getAlunosComNotasOptions}
        />
      );
    case 3:
      return (
        <MediaTurma
          turmas={turmas}
          notas={notas}
        />
      );
    case 4:
      return (
        <AdicionarAluno
          materias={materias}
          adicionarAluno={adicionarAluno}
        />
      );
    case 5:
      return (
        <RemoverAluno
          materias={materias}
          turmas={turmas}
          removerAluno={removerAluno}
        />
      );
    case 6:
      return (
        <MostrarVagas
          turmas={turmas}
        />
      );
    default:
      return null;
  }
};