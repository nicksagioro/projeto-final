switch (telaAtual) {
  case 'verVagas':
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