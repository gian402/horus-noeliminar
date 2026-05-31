import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import Home            from './pages/Home'
import QuienesSomos    from './pages/QuienesSomos'
import Galeria         from './pages/Galeria'
import Market          from './pages/Market'
import Contactos       from './pages/Contactos'

import CableadoEstructurado  from './pages/tecnologias/CableadoEstructurado'
import CamarasSeguridad      from './pages/tecnologias/CamarasSeguridad'
import SoporteMantenimiento  from './pages/tecnologias/SoporteMantenimiento'

import Asesoramiento   from './pages/educacion/Asesoramiento'
import Capacitaciones  from './pages/educacion/Capacitaciones'
import Cursos          from './pages/educacion/Cursos'

import PoliticasCookies    from './pages/politicas/PoliticasCookies'
import PoliticasDevolucion from './pages/politicas/PoliticasDevolucion'
import PoliticasPrivacidad from './pages/politicas/PoliticasPrivacidad'
import PreguntasFrecuentes from './pages/politicas/PreguntasFrecuentes'
import LibroReclamaciones  from './pages/politicas/LibroReclamaciones'

import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"                        element={<Home />} />
          <Route path="/quienes-somos"           element={<QuienesSomos />} />
          <Route path="/galeria"                 element={<Galeria />} />
          <Route path="/market"                  element={<Market />} />
          <Route path="/contactos"               element={<Contactos />} />

          <Route path="/tecnologias/cableado-estructurado"  element={<CableadoEstructurado />} />
          <Route path="/tecnologias/camaras-seguridad"      element={<CamarasSeguridad />} />
          <Route path="/tecnologias/soporte-mantenimiento"  element={<SoporteMantenimiento />} />

          <Route path="/educacion/asesoramiento"  element={<Asesoramiento />} />
          <Route path="/educacion/capacitaciones" element={<Capacitaciones />} />
          <Route path="/educacion/cursos"         element={<Cursos />} />

          <Route path="/politicas/cookies"           element={<PoliticasCookies />} />
          <Route path="/politicas/devolucion"        element={<PoliticasDevolucion />} />
          <Route path="/politicas/privacidad"        element={<PoliticasPrivacidad />} />
          <Route path="/preguntas-frecuentes"        element={<PreguntasFrecuentes />} />
          <Route path="/libro-reclamaciones"         element={<LibroReclamaciones />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
