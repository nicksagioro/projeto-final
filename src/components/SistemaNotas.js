import React, { useState, useEffect } from 'react';

const SistemaEscolar = () => {
  // Constantes
  const TOTAL_ALUNOS = 15;
  const TOTAL_MATERIAS = 3;
  const materias = ["Matemática", "Português", "Ciências"];

  // Estado inicial das turmas
  const [turmas, setTurmas] = useState({
    0: [ // Matemática
      "Ana", "Bruno", "Camila", "Diego", "Eduarda", 
      "Felipe", "Gabriela", "Henrique", "Isabela", "João",
      "VAGA", "VAGA", "VAGA", "VAGA", "VAGA"
    ],
    1: [ // Português
      "Lucas", "Marina", "Nina", "Otávio", "Patrícia", 
      "Quirino", "Rafael", "Sofia", "Tiago", "Ursula",
      "VAGA", "VAGA", "VAGA", "VAGA", "VAGA"
    ],
    2: [ // Ciências
      "Valéria", "William", "Xuxa", "Yara", "Zeca", 
      "Alex", "Bia", "Carlos", "Dora", "Elena",
      "VAGA", "VAGA", "VAGA", "VAGA", "VAGA"
    ]
  });

  // Estados para notas
  const [notas, setNotas] = useState({
    nota1: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    nota2: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    recuperacao: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    mediaInicial: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1)),
    mediaFinal: Array(TOTAL_MATERIAS).fill().map(() => Array(TOTAL_ALUNOS).fill(-1))
  });

  // Estados da interface
  const [opcaoAtiva, setOpcaoAtiva] = useState(null);
  const [output, setOutput] = useState('Sistema Escolar iniciado. Selecione uma opção no menu.');
  const [mostrarRecuperacao, setMostrarRecuperacao] = useState(false);

  // Estados dos formulários
  const [formData, setFormData] = useState({
    materia: 0,
    aluno: 0,
    nota1: '',
    nota2: '',
    recuperacao: '',
    nomeAluno: ''
  });

  // Função para calcular médias
  const calcularMedias = (materia, aluno, nota1Val, nota2Val, recuperacaoVal = -1) => {
    const mediaInic = (nota1Val + nota2Val) / 2;
    let mediaFin = mediaInic;
    
    if (mediaInic < 7 && recuperacaoVal >= 0) {
      mediaFin = (mediaInic + recuperacaoVal) / 2;
    }
    
    setNotas(prev => {
      const newNotas = { ...prev };
      newNotas.mediaInicial[materia][aluno] = mediaInic;
      newNotas.mediaFinal[materia][aluno] = mediaFin;
      return newNotas;
    });
    
    return { mediaInicial: mediaInic, mediaFinal: mediaFin };
  };

  // Função para obter alunos válidos de uma matéria
  const getAlunosValidos = (materia, apenasComNotas = false) => {
    return turmas[materia]
      .map((nome, index) => ({ nome, index }))
      .filter(({ nome, index }) => {
        if (nome === 'VAGA') return false;
        if (apenasComNotas) return notas.nota1[materia][index] >= 0;
        return true;
      });
  };

  // Handlers dos formulários
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Opção 1: Inserir notas
  const inserirNotas = () => {
    const { materia, aluno, nota1: n1, nota2: n2, recuperacao: rec } = formData;
    
    if (!n1 || !n2 || isNaN(n1) || isNaN(n2)) {
      setOutput('Por favor, insira valores válidos para as notas.');
      return;
    }
    
    const nota1Val = parseFloat(n1);
    const nota2Val = parseFloat(n2);
    
    setNotas(prev => {
      const newNotas = { ...prev };
      newNotas.nota1[materia][aluno] = nota1Val;
      newNotas.nota2[materia][aluno] = nota2Val;
      return newNotas;
    });
    
    const { mediaInicial, mediaFinal } = calcularMedias(materia, aluno, nota1Val, nota2Val);
    
    if (mediaInicial < 7) {
      setMostrarRecuperacao(true);
      setOutput(`Média inicial: ${mediaInicial.toFixed(2)}\nAluno precisa de recuperação. Digite a nota de recuperação.`);
    } else {
      setMostrarRecuperacao(false);
      setOutput(`Notas inseridas com sucesso!\nMédia final: ${mediaFinal.toFixed(2)}`);
    }
  };

  const aplicarRecuperacao = () => {
    const { materia, aluno, nota1: n1, nota2: n2, recuperacao: rec } = formData;
    
    if (!rec || isNaN(rec)) return;
    
    const recuperacaoVal = parseFloat(rec);
    const nota1Val = parseFloat(n1);
    const nota2Val = parseFloat(n2);
    
    setNotas(prev => {
      const newNotas = { ...prev };
      newNotas.recuperacao[materia][aluno] = recuperacaoVal;
      return newNotas;
    });
    
    const { mediaFinal } = calcularMedias(materia, aluno, nota1Val, nota2Val, recuperacaoVal);
    setOutput(`Notas inseridas com sucesso!\nMédia final: ${mediaFinal.toFixed(2)}`);
  };

  // Opção 2: Imprimir boletim
  const imprimirBoletim = () => {
    const { materia, aluno } = formData;
    
    if (notas.nota1[materia][aluno] < 0) {
      setOutput('Aluno inválido ou sem notas lançadas!');
      return;
    }
    
    const nomeAluno = turmas[materia][aluno];
    let boletim = `--- Boletim do aluno: ${nomeAluno} - ${materias[materia]} ---\n`;
    boletim += `Nota 1: ${notas.nota1[materia][aluno]}\n`;
    boletim += `Nota 2: ${notas.nota2[materia][aluno]}\n`;
    boletim += `Média Inicial: ${notas.mediaInicial[materia][aluno].toFixed(2)}\n`;
    
    if (notas.mediaInicial[materia][aluno] < 7) {
      boletim += `Nota Recuperação: ${notas.recuperacao[materia][aluno]}\n`;
    }
    
    boletim += `Média Final: ${notas.mediaFinal[materia][aluno].toFixed(2)}\n`;
    setOutput(boletim);
  };

  // Opção 3: Média da turma
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

  // Opção 4: Adicionar aluno
  const adicionarAluno = () => {
    const { materia, nomeAluno } = formData;
    
    if (!nomeAluno.trim()) {
      setOutput('Por favor, digite um nome válido.');
      return;
    }
    
    for (let i = 0; i < TOTAL_ALUNOS; i++) {
      if (turmas[materia][i] === 'VAGA') {
        setTurmas(prev => {
          const newTurmas = { ...prev };
          newTurmas[materia][i] = nomeAluno.trim();
          return newTurmas;
        });
        setOutput(`Aluno ${nomeAluno} adicionado na posição ${i}`);
        setFormData(prev => ({ ...prev, nomeAluno: '' }));
        return;
      }
    }
    
    setOutput('Não há vagas disponíveis nessa turma!');
  };

  // Opção 5: Remover aluno
  const removerAluno = () => {
    const { materia, aluno } = formData;
    
    if (turmas[materia][aluno] === 'VAGA') {
      setOutput('Aluno inválido!');
      return;
    }
    
    const nomeAluno = turmas[materia][aluno];
    
    setTurmas(prev => {
      const newTurmas = { ...prev };
      newTurmas[materia][aluno] = 'VAGA';
      return newTurmas;
    });
    
    // Resetar notas
    setNotas(prev => {
      const newNotas = { ...prev };
      newNotas.nota1[materia][aluno] = -1;
      newNotas.nota2[materia][aluno] = -1;
      newNotas.recuperacao[materia][aluno] = -1;
      newNotas.mediaInicial[materia][aluno] = -1;
      newNotas.mediaFinal[materia][aluno] = -1;
      return newNotas;
    });
    
    setOutput(`Aluno ${nomeAluno} removido da turma.`);
  };

  // Opção 6: Mostrar vagas
  const mostrarVagas = () => {
    const { materia } = formData;
    const vagas = turmas[materia].filter(nome => nome === 'VAGA').length;
    setOutput(`Vagas disponíveis na turma de ${materias[materia]}: ${vagas}/${TOTAL_ALUNOS}`);
  };

  // Reset da recuperação quando muda opção
  useEffect(() => {
    setMostrarRecuperacao(false);
    setFormData(prev => ({ ...prev, recuperacao: '' }));
  }, [opcaoAtiva]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Sistema Escolar</h1>
        
        {/* Menu Principal */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Menu Principal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 1, texto: '1 - Inserir notas de aluno' },
              { id: 2, texto: '2 - Imprimir boletim de aluno' },
              { id: 3, texto: '3 - Ver média da turma por matéria' },
              { id: 4, texto: '4 - Adicionar aluno em uma turma' },
              { id: 5, texto: '5 - Remover aluno de uma turma' },
              { id: 6, texto: '6 - Ver vagas disponíveis' }
            ].map(opcao => (
              <button
                key={opcao.id}
                onClick={() => {
                  setOpcaoAtiva(opcao.id);
                  setOutput('');
                }}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-left"
              >
                {opcao.texto}
              </button>
            ))}
          </div>
        </div>

        {/* Opção 1: Inserir Notas */}
        {opcaoAtiva === 1 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Inserir Notas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Matéria:</label>
                <select 
                  value={formData.materia} 
                  onChange={(e) => handleInputChange('materia', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Aluno:</label>
                <select 
                  value={formData.aluno} 
                  onChange={(e) => handleInputChange('aluno', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {getAlunosValidos(formData.materia).map(({ nome, index }) => (
                    <option key={index} value={index}>{index} - {nome}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nota 1:</label>
                <input 
                  type="number" 
                  min="0" 
                  max="10" 
                  step="0.1"
                  value={formData.nota1}
                  onChange={(e) => handleInputChange('nota1', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nota 2:</label>
                <input 
                  type="number" 
                  min="0" 
                  max="10" 
                  step="0.1"
                  value={formData.nota2}
                  onChange={(e) => handleInputChange('nota2', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              {mostrarRecuperacao && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Nota de Recuperação:</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="10" 
                    step="0.1"
                    value={formData.recuperacao}
                    onChange={(e) => {
                      handleInputChange('recuperacao', e.target.value);
                      if (e.target.value) aplicarRecuperacao();
                    }}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              )}
            </div>
            
            <button 
              onClick={inserirNotas}
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Inserir Notas
            </button>
          </div>
        )}

        {/* Opção 2: Imprimir Boletim */}
        {opcaoAtiva === 2 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Imprimir Boletim</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Matéria:</label>
                <select 
                  value={formData.materia} 
                  onChange={(e) => handleInputChange('materia', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Aluno:</label>
                <select 
                  value={formData.aluno} 
                  onChange={(e) => handleInputChange('aluno', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {getAlunosValidos(formData.materia, true).map(({ nome, index }) => (
                    <option key={index} value={index}>{index} - {nome}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={imprimirBoletim}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Imprimir Boletim
            </button>
          </div>
        )}

        {/* Opção 3: Média da Turma */}
        {opcaoAtiva === 3 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Média da Turma</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Matéria:</label>
              <select 
                value={formData.materia} 
                onChange={(e) => handleInputChange('materia', parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg max-w-md"
              >
                {materias.map((mat, idx) => (
                  <option key={idx} value={idx}>{mat}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={mostrarMediaTurma}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Ver Média
            </button>
          </div>
        )}

        {/* Opção 4: Adicionar Aluno */}
        {opcaoAtiva === 4 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Adicionar Aluno</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Matéria:</label>
                <select 
                  value={formData.materia} 
                  onChange={(e) => handleInputChange('materia', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Aluno:</label>
                <input 
                  type="text" 
                  value={formData.nomeAluno}
                  onChange={(e) => handleInputChange('nomeAluno', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            
            <button 
              onClick={adicionarAluno}
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Adicionar
            </button>
          </div>
        )}

        {/* Opção 5: Remover Aluno */}
        {opcaoAtiva === 5 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Remover Aluno</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Matéria:</label>
                <select 
                  value={formData.materia} 
                  onChange={(e) => handleInputChange('materia', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {materias.map((mat, idx) => (
                    <option key={idx} value={idx}>{mat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Aluno:</label>
                <select 
                  value={formData.aluno} 
                  onChange={(e) => handleInputChange('aluno', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  {getAlunosValidos(formData.materia).map(({ nome, index }) => (
                    <option key={index} value={index}>{index} - {nome}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={removerAluno}
              className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Remover
            </button>
          </div>
        )}

        {/* Opção 6: Ver Vagas */}
        {opcaoAtiva === 6 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Vagas Disponíveis</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Matéria:</label>
              <select 
                value={formData.materia} 
                onChange={(e) => handleInputChange('materia', parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg max-w-md"
              >
                {materias.map((mat, idx) => (
                  <option key={idx} value={idx}>{mat}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={mostrarVagas}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              Ver Vagas
            </button>
          </div>
        )}

        {/* Área de Output */}
        {output && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Resultado:</h4>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SistemaEscolar;