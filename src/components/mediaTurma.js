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