'use client';
// Removed unused import for SistemaNotas
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
import React from 'react';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header title="Sistema de Notas" />
      <Menu />
      <MainContent />
      <NotaAluno />
      <MediaTurma />
      <Boletim />
      <AdicionarAluno />
      <RemoverAluno />
      <MostrarVagas />
      <Formulario />
    </div>
  );
}