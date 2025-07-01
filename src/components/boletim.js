const imprimirBoletim = () => {
    const { materia, alunoIndex } = formData;
    if (notas.nota1[materia][alunoIndex] < 0) {
        setOutput('Aluno inválido ou sem notas lançadas!');
        return;
    }
    const nomeAluno = turmas[materia][alunoIndex];
    let boletim = `--- Boletim do aluno: ${nomeAluno} - ${materias[materia]} ---\n`;
    boletim += `Nota 1: ${notas.nota1[materia][alunoIndex]}\n`;
    boletim += `Nota 2: ${notas.nota2[materia][alunoIndex]}\n`;
    boletim += `Média Inicial: ${notas.mediaInicial[materia][alunoIndex].toFixed(2)}\n`;
    if (notas.mediaInicial[materia][alunoIndex] < 7) {
        boletim += `Nota Recuperação: ${notas.recuperacao[materia][alunoIndex]}\n`;
    }
    boletim += `Média Final: ${notas.mediaFinal[materia][alunoIndex].toFixed(2)}\n`;
    setOutput(boletim);
};

const mostrarMediaTurma = () => {
    const { materia } = formData;
    let soma = 0;
    let contador = 0;
    for (let i = 0; i < TOTAL_ALUNOS; i++) {
        if (notas.mediaFinal[materia][i] >= 0) {
            soma += notas.mediaFinal[materia][i];
            contador++;
        }
    }
    if (contador > 0) {
        setOutput(`Média da turma de ${materias[materia]}: ${(soma / contador).toFixed(2)}`);
    } else {
        setOutput(`Ainda não há médias lançadas para a turma de ${materias[materia]}.`);
    }
};

const adicionarAluno = () => {
    const { materia, nomeAluno } = formData;
    if (!nomeAluno.trim()) {
        setOutput('Por favor, digite um nome válido.');
        return;
    }
    <div className="form-section active">
        <h3 className="form-title">📊 Imprimir Boletim</h3>
        <div className="form-grid">
            <div className="form-group">
                <label htmlFor="materia-boletim">Matéria:</label>
                <select
                    id="materia-boletim"
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
                <label htmlFor="aluno-boletim">Aluno:</label>
                <select
                    id="aluno-boletim"
                    value={formData.alunoIndex}
                    onChange={e => handleInputChange('alunoIndex', Number(e.target.value))}
                    className="form-control"
                >
                    {getAlunosComNotasOptions(formData.materia).map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
        <button onClick={imprimirBoletim} className="btn-primary">Imprimir Boletim</button>
    </div>
}
