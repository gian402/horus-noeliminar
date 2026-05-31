import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFadeUp from '../hooks/useFadeUp'

import slide0 from '../assets/images/galeria/capacitaciones/imagen 1.jpg'
import slide1 from '../assets/images/galeria/nuestro servicio tecnico/imagen 1.jpg'
import slide2 from '../assets/images/galeria/colegio de enfermeros/imagen 1.jpg'
import slide3 from '../assets/images/galeria/practicas de primeros auxilios/imagen 1.jpg'

import logoAbogados      from '../assets/images/logos/logo-convenio-abogados.png'
import logoAdministracion from '../assets/images/logos/logo-convenio-administracion.jpg'
import logoEconomistas   from '../assets/images/logos/logo-convenio-economistas.jpg'
import logoEnfermeros    from '../assets/images/logos/logo-convenio-enfermeros.png'
import logoObstetras     from '../assets/images/logos/logo-convenio-obstetras.jpg'
import logoIsam          from '../assets/images/logos/logo-convenio-isam.png'

import imgCableado       from '../assets/images/tecnologias/cableado.jpg'
import imgCapacitaciones from '../assets/images/capacitaciones/Capacítate.jpg'

const SLIDES = [slide0, slide1, slide2, slide3]

const CONVENIOS = [
  { img: logoAbogados,       sigla: 'ICAC',    nombre: 'Colegio de Abogados',       desc: 'Convenio para capacitaciones jurídicas y formación continua de abogados colegiados en Cajamarca.' },
  { img: logoAdministracion, sigla: 'CORLAD',  nombre: 'Colegio de Administradores', desc: 'Alianza para el desarrollo profesional de administradores con capacitaciones especializadas.' },
  { img: logoEconomistas,    sigla: 'CEC',     nombre: 'Colegio de Economistas',     desc: 'Convenio para la formación continua de economistas con certificaciones en gestión económica.' },
  { img: logoEnfermeros,     sigla: 'CR XIII', nombre: 'Colegio de Enfermeros',      desc: 'Alianza para capacitaciones en salud y gestión hospitalaria para el personal de enfermería.' },
  { img: logoObstetras,      sigla: 'CRO XIV', nombre: 'Colegio de Obstetras',       desc: 'Convenio para capacitaciones en obstetricia y salud materna con certificación oficial.' },
  { img: logoIsam,           sigla: 'ISAM',    nombre: 'Instituto ISAM',             desc: 'Alianza educativa con el ISAM para programas de formación y certificaciones de alto nivel.' },
]

const WHY_CARDS = [
  { num: '01', icon: 'fa-medal',          color: '#4F46E5', bg: '#EEF2FF', title: 'Experiencia comprobada',      desc: 'Más de 5 años brindando soluciones tecnológicas y educativas de calidad en Cajamarca, con cientos de clientes satisfechos.', lg: true },
  { num: '02', icon: 'fa-certificate',    color: '#FF6B47', bg: '#FFF1EE', title: 'Certificaciones oficiales',   desc: 'Programas avalados por colegios profesionales reconocidos a nivel nacional.' },
  { num: '03', icon: 'fa-headset',        color: '#059669', bg: '#ECFDF5', title: 'Soporte permanente',          desc: 'Atención personalizada antes, durante y después de cada proyecto o programa.' },
  { num: '04', icon: 'fa-map-marker-alt', color: '#7C3AED', bg: '#F5F3FF', title: 'Presencia local en Cajamarca', desc: 'Somos cajamarquinos. Conocemos las necesidades de la región y trabajamos para su desarrollo.', lg: true },
]

export default function Home() {
  useFadeUp()

  const [current, setCurrent] = useState(0)
  const [modal, setModal]     = useState(null)

  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  const prev = () => setCurrent(p => (p - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setCurrent(p => (p + 1) % SLIDES.length)

  return (
    <>
      <section className="ix-hero">
        <div className="ix-slides">
          {SLIDES.map((src, i) => (
            <div
              key={i}
              className={`hero-slide${i === current ? ' active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="ix-overlay" />

        <div className="container ix-hero-body">
          <div className="ix-hero-content fade-up">
            <div className="ix-tag">
              <span className="ix-dot" />
              Cajamarca, Perú — Tecnología y Educación
            </div>
            <h1 className="ix-title">
              Soluciones que<br />
              <span className="ix-accent">impulsan</span> tu<br />
              crecimiento
            </h1>
            <p className="ix-sub">
              Infraestructura tecnológica de primer nivel y formación profesional certificada.
              Más de 400 personas y decenas de empresas ya confían en nosotros.
            </p>
            <div className="ix-btns">
              <Link to="/contactos" className="btn-coral">
                <i className="fas fa-paper-plane" /> Solicitar información
              </Link>
              <a href="#ix-services" className="ix-ghost-btn">
                <i className="fas fa-arrow-down" /> Ver servicios
              </a>
            </div>
          </div>
        </div>

        <div className="ix-controls">
          <div className="ix-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`ix-dot-btn${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        <div className="ix-metrics">
          {[
            { num: '5+',  lbl: 'Años de experiencia' },
            { num: '400+', lbl: 'Profesionales formados' },
            { num: '6',   lbl: 'Convenios activos' },
            { num: '98%', lbl: 'Satisfacción' },
          ].map((m, i) => (
            <div key={i} className="ix-metric-wrap">
              {i > 0 && <div className="ix-msep" />}
              <div className="ix-metric">
                <span className="ix-mnum">{m.num}</span>
                <span className="ix-mlbl">{m.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ix-services" id="ix-services">
        <div className="container">
          <div className="ix-section-head fade-up">
            <span className="ix-eyebrow">Nuestros Servicios</span>
            <h2>Todo lo que necesitas<br />en un solo lugar</h2>
            <p>Tecnología e infraestructura para empresas, y formación profesional certificada para personas.</p>
          </div>
          <div className="ix-services-grid">
            <div className="ix-svc-card fade-up">
              <div className="ix-svc-img">
                <img src={imgCableado} alt="Tecnologías" />
                <div className="ix-svc-badge"><i className="fas fa-microchip" /> Tecnologías</div>
              </div>
              <div className="ix-svc-body">
                <div className="ix-svc-icon" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                  <i className="fas fa-network-wired" />
                </div>
                <h3>Soluciones Tecnológicas</h3>
                <p>Redes, cámaras de seguridad y soporte técnico especializado para empresas e instituciones de Cajamarca.</p>
                <div className="ix-svc-links">
                  <Link to="/tecnologias/cableado-estructurado"><i className="fas fa-chevron-right" /> Cableado Estructurado</Link>
                  <Link to="/tecnologias/camaras-seguridad"><i className="fas fa-chevron-right" /> Cámaras de Seguridad</Link>
                  <Link to="/tecnologias/soporte-mantenimiento"><i className="fas fa-chevron-right" /> Soporte Técnico</Link>
                </div>
              </div>
            </div>

            <div className="ix-svc-card fade-up">
              <div className="ix-svc-img">
                <img src={imgCapacitaciones} alt="Educación" />
                <div className="ix-svc-badge ix-svc-badge-coral"><i className="fas fa-graduation-cap" /> Educación</div>
              </div>
              <div className="ix-svc-body">
                <div className="ix-svc-icon" style={{ background: '#FFF1EE', color: '#FF6B47' }}>
                  <i className="fas fa-chalkboard-teacher" />
                </div>
                <h3>Formación Profesional</h3>
                <p>Capacitaciones, cursos y asesoramiento con certificación oficial de colegios profesionales reconocidos.</p>
                <div className="ix-svc-links">
                  <Link to="/educacion/asesoramiento"><i className="fas fa-chevron-right" /> Asesoramiento</Link>
                  <Link to="/educacion/capacitaciones"><i className="fas fa-chevron-right" /> Capacitaciones</Link>
                  <Link to="/educacion/cursos"><i className="fas fa-chevron-right" /> Cursos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ix-convenios">
        <div className="container">
          <div className="ix-section-head fade-up">
            <span className="ix-eyebrow">Alianzas</span>
            <h2>Convenios que respaldan<br />tu certificación</h2>
            <p>Trabajamos con los principales colegios profesionales de Cajamarca.</p>
          </div>
          <div className="ix-conv-grid">
            {CONVENIOS.map(c => (
              <div
                key={c.sigla}
                className="ix-conv-card fade-up"
                onClick={() => setModal(c)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ix-conv-logo"><img src={c.img} alt={c.sigla} /></div>
                <div className="ix-conv-sigla">{c.sigla}</div>
                <div className="ix-conv-name">{c.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modal && (
        <div id="convModal">
          <div id="convOverlay" onClick={() => setModal(null)} />
          <div className="conv-modal-box">
            <div className="conv-modal-header">
              <button id="convClose" onClick={() => setModal(null)}>
                <i className="fas fa-times" />
              </button>
              <div className="conv-modal-logo-wrap">
                <img src={modal.img} alt={modal.sigla} />
              </div>
              <div id="convSigla">{modal.sigla}</div>
              <div id="convNombre">{modal.nombre}</div>
            </div>
            <div className="conv-modal-body">
              <div className="conv-modal-divider">
                <span><i className="fas fa-handshake" /> Convenio activo</span>
              </div>
              <p id="convDesc">{modal.desc}</p>
            </div>
          </div>
        </div>
      )}

      <section className="ix-why">
        <div className="container">
          <div className="ix-section-head fade-up">
            <span className="ix-eyebrow">Por qué elegirnos</span>
            <h2>Lo que nos hace<br />diferentes</h2>
          </div>
          <div className="ix-why-bento">
            {WHY_CARDS.map(c => (
              <div
                key={c.num}
                className={`ix-why-card${c.lg ? ' ix-why-lg' : ''} fade-up`}
                style={{ '--wc': c.color, '--wcb': c.bg }}
              >
                <div className="ix-why-num">{c.num}</div>
                <div className="ix-why-icon"><i className={`fas ${c.icon}`} /></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ix-location">
        <div className="container">
          <div className="ix-location-grid">
            <div className="ix-location-info fade-up">
              <span className="ix-eyebrow">Dónde estamos</span>
              <h2>Visítanos en<br />Cajamarca</h2>
              <p>Estamos en el corazón de Cajamarca, listos para atenderte de lunes a sábado.</p>
              <div className="ix-loc-items">
                <div className="ix-loc-item">
                  <div className="ix-loc-icon"><i className="fas fa-map-marker-alt" /></div>
                  <div><strong>Dirección</strong><span>Jr. Jose Gálvez #322, Cajamarca</span></div>
                </div>
                <div className="ix-loc-item">
                  <div className="ix-loc-icon"><i className="fas fa-clock" /></div>
                  <div><strong>Horario</strong><span>Lun-Vie: 8am-6pm | Sab: 9am-1pm</span></div>
                </div>
                <div className="ix-loc-item">
                  <div className="ix-loc-icon"><i className="fas fa-phone" /></div>
                  <div><strong>Teléfono / WhatsApp</strong><span>+51 927 582 305</span></div>
                </div>
              </div>
              <Link to="/contactos" className="btn-coral" style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <i className="fas fa-paper-plane" /> Contáctanos
              </Link>
            </div>
            <div className="ix-location-map fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d989.6682159535815!2d-78.5107197!3d-7.1637652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b25b809bf9b7e3%3A0x70d5a58b14aa7eff!2sPlazuela%20Bolognesi!5e0!3m2!1ses-419!2spe!4v1772667902105!5m2!1ses-419!2spe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Horus Group"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
