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