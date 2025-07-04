function Menu({ opcaoAtiva, setOpcaoAtiva, setOutput, clearForm }) {

    const handleClick = (opcao) => {
      // Verifica se setOpcaoAtiva é uma função antes de chamá-la
      if (typeof setOpcaoAtiva === 'function') {
        setOpcaoAtiva(opcao);
      }
      
      // Verifica se setOutput é uma função antes de chamá-la
      if (typeof setOutput === 'function') {
        setOutput('');
      }
      
      // Verifica se clearForm é uma função antes de chamá-la
      if (typeof clearForm === 'function') {
        clearForm();
      }
    };
  
    const menuOptions = [
      { id: 1, icon: '📝', title: 'Inserir Notas', desc: 'Lançar notas dos alunos' },
      { id: 2, icon: '📊', title: 'Boletim', desc: 'Imprimir boletim individual' },
      { id: 3, icon: '📈', title: 'Média da Turma', desc: 'Ver desempenho geral' },
      { id: 4, icon: '👤', title: 'Adicionar Aluno', desc: 'Matricular novo aluno' },
      { id: 5, icon: '❌', title: 'Remover Aluno', desc: 'Cancelar matrícula' },
      { id: 6, icon: '📋', title: 'Ver Vagas', desc: 'Consultar disponibilidade' }
    ];
}