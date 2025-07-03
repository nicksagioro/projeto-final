import React, { useState } from 'react';
import './sistemaNotas.module.css';


function Client() {
return ( 
  <client.js/>
);
}

function Boletim() {
return (
  <boletim.js/>
);
}
function AdicionarAluno() {
return (
  <adicionarAluno.js/>
);
}

function RemoverAluno() {
return (
  <removerAluno.js/>
);
}

function MostrarVagas() {
  return (
    <mostrarVagas.js/>
  );
}

function notaAluno() {
  return (
    <notaAluno.js/>
  );
}

function mediaTurma() {
  return (
    <mediaTurma.js/>
  );
}

function header() {
  return (    
    <header.js/>
  );  

}
function menu() {
  return (
    <menu.js/>
  );
}
function mainContent() {
  return (
    <mainContent.js/>
  );
}
function formulario() {
  return (
    <formulario.js/>
  );
}
function outputArea() {
  return (
    <outputArea.js/>
  );
}
function App() {
  const [opcaoAtiva, setOpcaoAtiva] = useState(1);
  const [output, setOutput] = useState('');
  const [formData, setFormData] = useState({
    materia: 0,
    nomeAluno: '',
    notas: Array(4).fill(''),
    aluno: '',
    media: 0
  });

  const clearForm = () => {
    setFormData({
      materia: 0,
      nomeAluno: '',
      notas: Array(4).fill(''),
      aluno: '',
      media: 0
    });
  };

  return (
    <div className="App">
      <header/>
      <menu opcaoAtiva={opcaoAtiva} setOpcaoAtiva={setOpcaoAtiva} />
      <mainContent />
      <formulario formData={formData} setFormData={setFormData} opcaoAtiva={opcaoAtiva} />
      <outputArea output={output} />
    </div>
  );
}

export default App;