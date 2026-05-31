import { useState, useEffect } from 'react'
import useFadeUp from '../hooks/useFadeUp'
import { enviarContacto } from '../api'

const INITIAL = { nombre: '', email: '', telefono: '', asunto: '', mensaje: '' }

export default function Contactos() {
  useFadeUp()
  const [form,    setForm]    = useState(INITIAL)
  const [status,  setStatus]  = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [errores, setErrores] = useState({})

  useEffect(() => { document.title = 'Contacto — Horus Group SRL' }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errores[name]) setErrores(p => { const n = { ...p }; delete n[name]; return n })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const e2 = {}
    if (!form.nombre.trim())   e2.nombre   = 'Ingresa tu nombre'
    if (!form.email.trim())    e2.email    = 'Ingresa tu correo'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e2.email = 'Correo inválido'
    if (!form.telefono.trim()) e2.telefono = 'Ingresa tu teléfono'
    else if (!/^\d{9}$/.test(form.telefono)) e2.telefono = 'El teléfono debe tener exactamente 9 dígitos'
    if (!form.asunto.trim())   e2.asunto   = 'Ingresa el asunto'
    if (!form.mensaje.trim())  e2.mensaje  = 'Escribe tu mensaje'
    if (Object.keys(e2).length) { setErrores(e2); return }

    setStatus('loading')
    try {
      const res = await enviarContacto(form)
      if (res.ok) {
        setStatus('ok')
        setForm(INITIAL)
        setErrores({})
        setTimeout(() => setStatus(null), 6000)
      } else {
        setStatus('error')
        setMensaje(res.mensaje || 'Error al enviar el mensaje.')
      }
    } catch {
      setStatus('error')
      setMensaje('No se pudo conectar con el servidor.')
    }
  }

  return (
    <main>
      <section className="ct-hero">
        <div className="container">
          <div className="ct-hero-inner">

            <div className="ct-hero-text fade-up">
              <div className="eyebrow"><i className="fas fa-headset" /> Estamos aquí para ti</div>
              <h1>Hablemos de tu<br /><span>próximo proyecto</span></h1>
              <p>Cuéntanos qué necesitas. Nuestro equipo responde en menos de 24 horas y estamos disponibles por WhatsApp para consultas rápidas.</p>

              <div className="ct-channels">
                <a href="tel:+51927582305" className="ct-channel">
                  <div className="ct-channel-icon ct-icon-coral"><i className="fas fa-phone" /></div>
                  <div className="ct-channel-info"><strong>+51 927 582 305</strong><span>Llamada directa</span></div>
                  <i className="fas fa-chevron-right ct-channel-arrow" />
                </a>
                <a href="https://wa.me/51927582305" target="_blank" rel="noreferrer" className="ct-channel">
                  <div className="ct-channel-icon ct-icon-green"><i className="fab fa-whatsapp" /></div>
                  <div className="ct-channel-info"><strong>WhatsApp</strong><span>Respuesta inmediata</span></div>
                  <i className="fas fa-chevron-right ct-channel-arrow" />
                </a>
                <a href="mailto:horusgroupcajamarca@gmail.com" className="ct-channel">
                  <div className="ct-channel-icon ct-icon-indigo"><i className="fas fa-envelope" /></div>
                  <div className="ct-channel-info"><strong>horusgroupcajamarca@gmail.com</strong><span>Correo electrónico</span></div>
                  <i className="fas fa-chevron-right ct-channel-arrow" />
                </a>
              </div>

              <div className="ct-schedule">
                <div className="ct-schedule-dot" />
                <span><strong>Lun – Vie</strong> 8:00 am – 6:00 pm &nbsp;·&nbsp; <strong>Sab</strong> 9:00 am – 1:00 pm</span>
              </div>
            </div>

            <div className="ct-form-wrap fade-up">
              <div className="ct-form-card">
                <div className="ct-form-header">
                  <div className="ct-form-header-icon"><i className="fas fa-paper-plane" /></div>
                  <div>
                    <h2>Envíanos un mensaje</h2>
                    <p>Te respondemos en menos de 24 horas</p>
                  </div>
                </div>

                {status === 'ok' && (
                  <div style={{ background: '#ECFDF5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-check-circle" /> Mensaje enviado. Te contactaremos pronto.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #fca5a5', color: '#991b1b', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fas fa-exclamation-circle" /> {mensaje}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="ct-form-row">
                    <div className="ct-form-group">
                      <label htmlFor="nombre">Nombre <span>*</span></label>
                      <div className={`ct-input-wrap${errores.nombre ? ' ct-input-err' : ''}`}>
                        <i className="fas fa-user" />
                        <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre completo" />
                      </div>
                      {errores.nombre && <span className="ct-err-msg"><i className="fas fa-exclamation-circle" /> {errores.nombre}</span>}
                    </div>
                    <div className="ct-form-group">
                      <label htmlFor="email">Correo <span>*</span></label>
                      <div className={`ct-input-wrap${errores.email ? ' ct-input-err' : ''}`}>
                        <i className="fas fa-envelope" />
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
                      </div>
                      {errores.email && <span className="ct-err-msg"><i className="fas fa-exclamation-circle" /> {errores.email}</span>}
                    </div>
                  </div>
                  <div className="ct-form-row">
                    <div className="ct-form-group">
                      <label htmlFor="telefono">Teléfono <span>*</span></label>
                      <div className={`ct-input-wrap${errores.telefono ? ' ct-input-err' : ''}`}>
                        <i className="fas fa-phone" />
                        <input type="tel" id="telefono" name="telefono" value={form.telefono} onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 9); setForm(p => ({ ...p, telefono: v })); if (errores.telefono) setErrores(p => { const n = { ...p }; delete n.telefono; return n }) }} placeholder="987654321" maxLength={9} />
                      </div>
                      {errores.telefono && <span className="ct-err-msg"><i className="fas fa-exclamation-circle" /> {errores.telefono}</span>}
                    </div>
                    <div className="ct-form-group">
                      <label htmlFor="asunto">Asunto <span>*</span></label>
                      <div className={`ct-input-wrap${errores.asunto ? ' ct-input-err' : ''}`}>
                        <i className="fas fa-tag" />
                        <input type="text" id="asunto" name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" />
                      </div>
                      {errores.asunto && <span className="ct-err-msg"><i className="fas fa-exclamation-circle" /> {errores.asunto}</span>}
                    </div>
                  </div>
                  <div className="ct-form-group">
                    <label htmlFor="mensaje">Mensaje <span>*</span></label>
                    <textarea id="mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Cuéntanos más sobre tu consulta o proyecto..." className={errores.mensaje ? 'ct-input-err' : ''} />
                    {errores.mensaje && <span className="ct-err-msg"><i className="fas fa-exclamation-circle" /> {errores.mensaje}</span>}
                  </div>
                  <button type="submit" className="ct-submit" disabled={status === 'loading'}>
                    {status === 'loading'
                      ? <><i className="fas fa-spinner fa-spin" /> Enviando...</>
                      : <><i className="fas fa-paper-plane" /> Enviar mensaje</>
                    }
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ct-info">
        <div className="container">
          <div className="ct-info-grid">
            <div className="ct-info-card fade-up">
              <div className="ct-info-card-icon"><i className="fas fa-map-marker-alt" /></div>
              <h3>Dónde estamos</h3>
              <p>Jr. Jose Gálvez #322<br />Cajamarca, Perú</p>
              <a href="https://maps.google.com/?q=Jr.+Jose+Galvez+322+Cajamarca+Peru" target="_blank" rel="noreferrer" className="ct-info-link">
                Ver en Google Maps <i className="fas fa-external-link-alt" />
              </a>
            </div>
            <div className="ct-info-card fade-up">
              <div className="ct-info-card-icon ct-info-icon-coral"><i className="fas fa-clock" /></div>
              <h3>Horario de atención</h3>
              <p>Lunes a Viernes<br /><strong>8:00 am – 6:00 pm</strong></p>
              <p>Sábado<br /><strong>9:00 am – 1:00 pm</strong></p>
            </div>
            <div className="ct-info-card fade-up">
              <div className="ct-info-card-icon ct-info-icon-green"><i className="fab fa-whatsapp" /></div>
              <h3>WhatsApp directo</h3>
              <p>Para consultas rápidas y cotizaciones. Respondemos en minutos.</p>
              <a href="https://wa.me/51927582305" target="_blank" rel="noreferrer" className="ct-info-link ct-info-link-green">
                Abrir WhatsApp <i className="fas fa-external-link-alt" />
              </a>
            </div>
            <div className="ct-map-wrap fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d989.6682159535815!2d-78.5107197!3d-7.1637652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b25b809bf9b7e3%3A0x70d5a58b14aa7eff!2sPlazuela%20Bolognesi!5e0!3m2!1ses-419!2spe!4v1772667902105!5m2!1ses-419!2spe"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Horus Group SRL"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
