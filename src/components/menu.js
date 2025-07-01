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