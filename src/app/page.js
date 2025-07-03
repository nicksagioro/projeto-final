'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";

import AdicionarAluno from '@/components/AdicionarAluno/adicionarAluno';
import Boletim from '@/components/Boletim/boletim';
import Header from '@/components/Header/header';
import MainContent from '@/components/Main/mainContent';
import Menu from '@/components/Menu/menu';
import NotaAluno from '@/components/NotaAluno/notaAluno';
import RemoverAluno from '@/components/RemoverAluno/removerAluno';
import MostrarVagas from '@/components/Mostrar Vagas/mostrarVagas';
import MediaTurma from '@/components/MediaTurma/mediaTurma';
import Formulario from '@/components/Formulario/formulario';

export default function Home() {
  const materias = ["Matemática", "Português", "Ciências"];

  const [turmas, setTurmas] = useState({
    0: ["Ana", "Bruno", "Carlos"],
    1: ["Daniela", "Eduardo", "Fernanda"],
    2: ["Gabriel", "Helena", "Igor"]
  });

  const [notas, setNotas] = useState({
    nota1: [
      [7, 8, 9],
      [6, 5, 7],
      [8, 7, 9]
    ],
    nota2: [
      [8, 7, 6],
      [7, 6, 5],
      [9, 8, 7]
    ],
    mediaInicial: [
      [7.5, 7.5, 7.5],
      [6.5, 5.5, 6.0],
      [8.5, 7.5, 8.0]
    ],
    recuperacao: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    mediaFinal: [
      [7.5, 7.5, 7.5],
      [6.5, 5.5, 6.0],
      [8.5, 7.5, 8.0]
    ]
  });

  const [formData, setFormData] = useState({
    materia: 0,
    alunoIndex: 0,
    nomeAluno: ''
  });

  const [output, setOutput] = useState('');

  // Atualiza formData ao alterar os selects
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função auxiliar para preencher as opções de alunos
  const getAlunosComNotasOptions = (materiaIndex) => {
    if (!turmas[materiaIndex]) return [];
    return turmas[materiaIndex].map((aluno, idx) => ({
      value: idx,
      label: aluno
    }));
  };

  // Função para adicionar aluno
  const adicionarAluno = (materiaIndex, nomeAluno) => {
    setTurmas(prev => ({
      ...prev,
      [materiaIndex]: [...prev[materiaIndex], nomeAluno]
    }));

    setNotas(prev => ({
      ...prev,
      nota1: prev.nota1.map((n, idx) => idx === materiaIndex ? [...n, -1] : n),
      nota2: prev.nota2.map((n, idx) => idx === materiaIndex ? [...n, -1] : n),
      mediaInicial: prev.mediaInicial.map((n, idx) => idx === materiaIndex ? [...n, 0] : n),
      recuperacao: prev.recuperacao.map((n, idx) => idx === materiaIndex ? [...n, 0] : n),
      mediaFinal: prev.mediaFinal.map((n, idx) => idx === materiaIndex ? [...n, 0] : n)
    }));
  };

  // Função para remover aluno
  const removerAluno = (materiaIndex, alunoIndex) => {
    setTurmas(prev => ({
      ...prev,
      [materiaIndex]: prev[materiaIndex].filter((_, idx) => idx !== alunoIndex)
    }));

    setNotas(prev => ({
      ...prev,
      nota1: prev.nota1.map((n, idx) => idx === materiaIndex ? n.filter((_, i) => i !== alunoIndex) : n),
      nota2: prev.nota2.map((n, idx) => idx === materiaIndex ? n.filter((_, i) => i !== alunoIndex) : n),
      mediaInicial: prev.mediaInicial.map((n, idx) => idx === materiaIndex ? n.filter((_, i) => i !== alunoIndex) : n),
      recuperacao: prev.recuperacao.map((n, idx) => idx === materiaIndex ? n.filter((_, i) => i !== alunoIndex) : n),
      mediaFinal: prev.mediaFinal.map((n, idx) => idx === materiaIndex ? n.filter((_, i) => i !== alunoIndex) : n)
    }));
  };

  const handleSubmitFormulario = (e) => {
    e.preventDefault();
    console.log('Nome do aluno:', formData.nomeAluno);
    // Faça o que quiser com esse dado (ex: adicionar aluno)
  };


  return (
    <div className={styles.container}>
      <Header title="Sistema de Notas" />
      <Menu/>
      <MainContent />
      <Formulario
        formData={formData}
        handleInputChange={handleInputChange}
        onSubmit={handleSubmitFormulario}
      />

    </div>
  );
}
