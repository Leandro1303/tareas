import './App.css';
import freeCodeCampLogo from './imagenes/freecodecamp-logo.png';
import { useEffect, useState } from 'react';
import TareaFormulario from './componentes/TareaFormulario';
import Tarea from './componentes/Tarea';

function App() {
  const [tareas, setTareas] = useState([]);

  const recuperarTareas = () => {
    const tareas = JSON.parse(localStorage.getItem('tareas'));
    if (tareas) {
      setTareas(tareas);
    }
  }

  useEffect(() => {
    recuperarTareas();
  }, []);
  
  const agregarTarea = tarea => {
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim();
      const tareasActualizadas = [tarea, ...tareas];
      setTareas(tareasActualizadas);
      
      let tareasToAdd = JSON.parse(localStorage.getItem('tareas'));
      if (tareasToAdd === null) {
        tareasToAdd = [];
      }
      tareasToAdd.push(tarea);
      localStorage.setItem('tareas', JSON.stringify(tareasToAdd));
    }
  }
  
  const eliminarTarea = id => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasActualizadas);
    let tareasLocalStorage = JSON.parse(localStorage.getItem('tareas'));
    if (tareasLocalStorage) {
      const tareasLocalStorageActualizadas = tareasLocalStorage.filter(tarea => tarea.id !== id);
      localStorage.setItem('tareas', JSON.stringify(tareasLocalStorageActualizadas));
    }
  }

  const completarTarea = id => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  }
  
  return (
    <div className='aplicacion-tareas'>
      <div className='freecodecamp-logo-contenedor'>
        <img 
          src={freeCodeCampLogo} 
          className='freecodecamp-logo'
          alt=''
        />
      </div>
      <div className='tareas-lista-principal'>
        <h1>Mis Tareas</h1>
        <TareaFormulario onSubmit={agregarTarea} />
        <div className='tareas-lista-contenedor'>
          {
            tareas.map((tarea) =>
              <Tarea
                key={tarea.id}
                id={tarea.id} 
                texto={tarea.texto}
                completada={tarea.completada}
                completarTarea={completarTarea}
                eliminarTarea={eliminarTarea}
              />
            ) 
          }
        </div>
      </div>
    </div>
  );
}

export default App;