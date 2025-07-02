import React, { useState } from 'react';
import styles from '../app/page.module.css';
import Header from './header';
import Menu from './menu';
import MainContent from './mainContent';
import Formulario from './formulario';
import OutputArea from './outputArea';
import NotaAluno from './notaAluno';
import MediaTurma from './mediaTurma';
import AdicionarAluno from './adicionarAluno';
import RemoverAluno from './removerAluno';
import MostrarVagas from './mostrarVagas';
import Client from './client';

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
    <div className={styles.App}>
      <Header />
      <Menu
        opcaoAtiva={opcaoAtiva}
        setOpcaoAtiva={setOpcaoAtiva}
        setOutput={setOutput}
        clearForm={clearForm}
      />
      <MainContent />
      <Formulario formData={formData} setFormData={setFormData} opcaoAtiva={opcaoAtiva} />
      <OutputArea output={output} />
      {opcaoAtiva === 1 && <NotaAluno />}
      {opcaoAtiva === 2 && <MediaTurma />}
      {opcaoAtiva === 3 && <AdicionarAluno />}
      {opcaoAtiva === 4 && <RemoverAluno />}
      {opcaoAtiva === 5 && <MostrarVagas />}
      <Client />
    </div>
  );
}

export default App;
