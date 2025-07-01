 const mostrarVagas = () => {
    const { materia } = formData;
    const vagas = turmas[materia].filter(nome => nome === 'VAGA').length;
    setOutput(`Vagas disponíveis na turma de ${materias[materia]}: ${vagas}/${TOTAL_ALUNOS}`);
  };
