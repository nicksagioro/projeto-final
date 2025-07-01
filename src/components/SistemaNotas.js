import React, { useState } from 'react';
import './page.module.css';

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

function NotaAluno() {
  return (
    <notaAluno.js/>
  );
}

function MédiaTurma() {
  return (
    <mediaTurma.js/>
  );
}

function Header() {
  return (    
    <header.js/>
  );  

}
function Menu() {
  return (
    <menu.js/>
  );
}
function MainContent() {
  return (
    <mainContent.js/>
  );
}
function Formulario() {
  return (
    <formulario.js/>
  );
}
function OutputArea() {
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
      <Header />
      <Menu opcaoAtiva={opcaoAtiva} setOpcaoAtiva={setOpcaoAtiva} />
      <MainContent />
      <Formulario formData={formData} setFormData={setFormData} opcaoAtiva={opcaoAtiva} />
      <OutputArea output={output} />
    </div>
  );
}

export default App;
