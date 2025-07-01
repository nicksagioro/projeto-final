import style from "./page.module.css";
import SistemaNotas from '../components/SistemaNotas';

export default function Home() {
  return (
    <div>
      <h1>Sistema de Notas</h1>
      <SistemaNotas />
    </div>
  );
}