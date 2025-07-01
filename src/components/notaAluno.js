
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

    }
}