import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFadeUp from '../../hooks/useFadeUp'
import { registrarReclamo } from '../../api'

const INITIAL = {
  nombres:'', apellidos:'', tipoDoc:'', numDoc:'', email:'', telefono:'', direccion:'',
  tipoRegistro:'', area:'', fechaIncidente:'', descripcionBien:'', detalleReclamo:'',
  aceptaTerminos: false, aceptaComunicaciones: false,
}

function validarPaso1(f) {
  const e = {}
  if (!f.nombres.trim())    e.nombres   = 'Ingresa tus nombres'
  if (!f.apellidos.trim())  e.apellidos = 'Ingresa tus apellidos'
  if (!f.email.trim())      e.email     = 'Ingresa tu correo'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Correo inválido'
  if (!f.telefono.trim())   e.telefono  = 'Ingresa tu teléfono'
  else if (!/^\d{9}$/.test(f.telefono)) e.telefono = 'El teléfono debe tener 9 dígitos'
  if (!f.tipoDoc)           e.tipoDoc   = 'Selecciona el tipo de documento'
  if (!f.numDoc.trim())     e.numDoc    = 'Ingresa el número de documento'
  else { const lim = {dni:8,ce:12,pasaporte:12,ruc:11}[f.tipoDoc]; if(lim && f.numDoc.length !== lim) e.numDoc = `El ${f.tipoDoc.toUpperCase()} debe tener ${lim} dígitos` }
  return e
}

function validarPaso2(f) {
  const e = {}
  if (!f.tipoRegistro)          e.tipoRegistro    = 'Selecciona el tipo de registro'
  if (!f.area)                  e.area            = 'Selecciona el área'
  if (!f.fechaIncidente)        e.fechaIncidente  = 'Indica la fecha del incidente'
  if (!f.descripcionBien.trim()) e.descripcionBien = 'Describe el bien o servicio'
  if (!f.detalleReclamo.trim()) e.detalleReclamo  = 'Detalla tu reclamo o queja'
  return e
}

function Campo({ id, label, required, children, full, error }) {
  return (
    <div className={`lr-field${full ? ' lr-field-full' : ''}`}>
      <label htmlFor={id}>{label} {required && <span className="lr-req">*</span>}</label>
      {children}
      {error && <span className="lr-field-error"><i className="fas fa-exclamation-circle" /> {error}</span>}
    </div>
  )
}

export default function LibroReclamaciones() {
  useFadeUp()
  const [paso,    setPaso]    = useState(1)
  const [form,    setForm]    = useState(INITIAL)
  const [errores, setErrores] = useState({})
  const [exito,   setExito]   = useState(false)
  const [numRec,  setNumRec]  = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const docLimits = { dni: 8, ce: 12, pasaporte: 12, ruc: 11 }
  const docLimit = docLimits[form.tipoDoc] || 15
  const chars = form.detalleReclamo.length

  useEffect(() => { document.title = 'Libro de Reclamaciones — Horus Group SRL' }, [])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    if (errores[name]) setErrores(p => { const n = { ...p }; delete n[name]; return n })
  }

  const irPaso2 = () => {
    const e = validarPaso1(form)
    if (Object.keys(e).length) { setErrores(e); return }
    setErrores({})
    setPaso(2)
  }

  const irPaso3 = () => {
    const e = validarPaso2(form)
    if (Object.keys(e).length) { setErrores(e); return }
    setErrores({})
    setPaso(3)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.aceptaTerminos) return
    setLoading(true)
    setError('')
    try {
      const res = await registrarReclamo({
        nombres:               form.nombres,
        apellidos:             form.apellidos,
        tipo_doc:              form.tipoDoc,
        num_doc:               form.numDoc,
        email:                 form.email,
        telefono:              form.telefono,
        direccion:             form.direccion,
        tipo_registro:         form.tipoRegistro,
        area:                  form.area,
        fecha_incidente:       form.fechaIncidente,
        descripcion_bien:      form.descripcionBien,
        detalle_reclamo:       form.detalleReclamo,
        acepta_comunicaciones: form.aceptaComunicaciones,
      })
      if (res.ok) { setNumRec(res.numero_reclamo); setExito(true) }
      else setError(res.mensaje || 'Error al registrar el reclamo.')
    } catch {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }



  if (exito) return (
    <main>
      <section className="lr-hero"><div className="container"><div className="lr-hero-inner">
        <div className="lr-hero-badge"><i className="fas fa-book-open" /> Ley N° 29571 — INDECOPI</div>
        <h1>Libro de<br /><span>Reclamaciones</span></h1>
      </div></div></section>
      <section className="lr-main"><div className="container">
        <div className="lr-exito">
          <div className="lr-exito-icon"><i className="fas fa-check-circle" /></div>
          <h2>Reclamo Registrado</h2>
          <p>Tu reclamo ha sido recibido correctamente. Te responderemos en un plazo máximo de <strong>15 días hábiles</strong>.</p>
          <div className="lr-exito-num">
            <span>Número de Reclamo</span>
            <strong>{numRec}</strong>
          </div>
          <Link to="/" className="lr-btn lr-btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
            <i className="fas fa-home" /> Volver al Inicio
          </Link>
        </div>
      </div></section>
    </main>
  )

  return (
    <main>
      <section className="lr-hero">
        <div className="container">
          <div className="lr-hero-inner">
            <div className="lr-hero-badge"><i className="fas fa-book-open" /> Ley N° 29571 — INDECOPI</div>
            <h1>Libro de<br /><span>Reclamaciones</span></h1>
            <p>Tu opinión es importante para nosotros. Registra tu queja o reclamo y te responderemos en un plazo máximo de <strong>15 días hábiles</strong>.</p>
            <div className="lr-hero-stats">
              <div className="lr-stat"><i className="fas fa-clock" /><div><strong>15 días</strong><span>Plazo de respuesta</span></div></div>
              <div className="lr-stat-sep" />
              <div className="lr-stat"><i className="fas fa-shield-alt" /><div><strong>Protegido</strong><span>Por ley del consumidor</span></div></div>
              <div className="lr-stat-sep" />
              <div className="lr-stat"><i className="fas fa-lock" /><div><strong>Confidencial</strong><span>Datos protegidos</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="lr-main">
        <div className="container">
          <div className="lr-aviso fade-up">
            <div className="lr-aviso-icon"><i className="fas fa-info-circle" /></div>
            <p>La formulación de un reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI. Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571).</p>
          </div>

          <div className="lr-layout">
            <div className="lr-sidebar fade-up">
              <h3 className="lr-sidebar-title">Tipo de registro</h3>
              {[
                { tipo:'reclamo', icon:'fa-file-alt',    iconCls:'',                   title:'Reclamo', desc:'Disconformidad con los productos o servicios adquiridos.' },
                { tipo:'queja',   icon:'fa-comment-alt', iconCls:'lr-tipo-icon-coral',  title:'Queja',   desc:'Disconformidad con la atención al cliente o el trato recibido.' },
              ].map(t => (
                <div
                  key={t.tipo}
                  className={`lr-tipo-card${form.tipoRegistro === t.tipo ? ' selected' : ''}`}
                  onClick={() => { setForm(p => ({ ...p, tipoRegistro: t.tipo })); setErrores(p => { const n={...p}; delete n.tipoRegistro; return n }) }}
                >
                  <div className={`lr-tipo-icon ${t.iconCls}`}><i className={`fas ${t.icon}`} /></div>
                  <div className="lr-tipo-body"><h4>{t.title}</h4><p>{t.desc}</p></div>
                  <div className="lr-tipo-check"><i className="fas fa-check" /></div>
                </div>
              ))}
              {errores.tipoRegistro && <span className="lr-field-error"><i className="fas fa-exclamation-circle" /> {errores.tipoRegistro}</span>}
              <div className="lr-sidebar-info">
                <div className="lr-si-item"><i className="fas fa-phone" /><span>+51 927 582 305</span></div>
                <div className="lr-si-item"><i className="fas fa-envelope" /><span>horusgroupcajamarca@gmail.com</span></div>
                <div className="lr-si-item"><i className="fas fa-map-marker-alt" /><span>Jr. Jose Gálvez #322, Cajamarca</span></div>
              </div>
            </div>
            <div className="lr-form-wrap fade-up">
              <div className="lr-steps">
                {[['1','Datos personales'],['2','Detalle del reclamo'],['3','Confirmación']].map(([n, label], i) => (
                  <>
                    {i > 0 && <div key={`line-${n}`} className={`lr-step-line${paso > i ? ' done' : ''}`} />}
                    <div key={n} className={`lr-step${paso >= +n ? ' active' : ''}${paso > +n ? ' done' : ''}`}>
                      <div className="lr-step-num">{paso > +n ? <i className="fas fa-check" style={{fontSize:'.7rem'}} /> : n}</div>
                      <span>{label}</span>
                    </div>
                  </>
                ))}
              </div>

              <form className="lr-form" onSubmit={handleSubmit} noValidate>
                {paso === 1 && (
                  <div className="lr-paso active">
                    <div className="lr-paso-header">
                      <div className="lr-paso-icon"><i className="fas fa-user" /></div>
                      <div><h2>Datos del Consumidor</h2><p>Ingresa tu información personal para poder contactarte.</p></div>
                    </div>
                    <div className="lr-grid">
                      <Campo id="nombres" label="Nombres" required error={errores.nombres}>
                        <input type="text" id="nombres" name="nombres" value={form.nombres} onChange={handleChange} placeholder="Tus nombres" className={errores.nombres ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="apellidos" label="Apellidos" required error={errores.apellidos}>
                        <input type="text" id="apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Tus apellidos" className={errores.apellidos ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="email" label="Correo Electrónico" required error={errores.email}>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" className={errores.email ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="telefono" label="Teléfono" required error={errores.telefono}>
                        <input type="tel" id="telefono" name="telefono" value={form.telefono} onChange={e => { const v = e.target.value.replace(/\D/g,'').slice(0,9); setForm(p=>({...p,telefono:v})); if(errores.telefono) setErrores(p=>{const n={...p};delete n.telefono;return n}) }} placeholder="987654321" maxLength={9} className={errores.telefono ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="tipoDoc" label="Tipo de Documento" required error={errores.tipoDoc}>
                        <select id="tipoDoc" name="tipoDoc" value={form.tipoDoc} onChange={handleChange} className={errores.tipoDoc ? 'lr-input-error' : ''}>
                          <option value="">Selecciona tipo</option>
                          <option value="dni">DNI</option>
                          <option value="ce">Carnet de Extranjería</option>
                          <option value="pasaporte">Pasaporte</option>
                          <option value="ruc">RUC</option>
                        </select>
                      </Campo>
                      <Campo id="numDoc" label="Número de Documento" required error={errores.numDoc}>
                        <input type="text" id="numDoc" name="numDoc" value={form.numDoc} onChange={e => { const v = e.target.value.replace(/\D/g,'').slice(0, docLimit); setForm(p=>({...p,numDoc:v})); if(errores.numDoc) setErrores(p=>{const n={...p};delete n.numDoc;return n}) }} placeholder={`Ej: ${'0'.repeat(docLimit)}`} maxLength={docLimit} className={errores.numDoc ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="direccion" label="Dirección" full>
                        <input type="text" id="direccion" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle, número, distrito, ciudad" />
                      </Campo>
                    </div>
                    <div className="lr-nav">
                      <div />
                      <button type="button" className="lr-btn lr-btn-primary" onClick={irPaso2}>
                        Siguiente <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                )}
                {paso === 2 && (
                  <div className="lr-paso active">
                    <div className="lr-paso-header">
                      <div className="lr-paso-icon"><i className="fas fa-clipboard-list" /></div>
                      <div><h2>Detalle del Reclamo / Queja</h2><p>Describe con precisión lo ocurrido.</p></div>
                    </div>
                    <div className="lr-grid">
                      <Campo id="tipoRegistro" label="Tipo de Registro" required error={errores.tipoRegistro}>
                        <select id="tipoRegistro" name="tipoRegistro" value={form.tipoRegistro} onChange={handleChange} className={errores.tipoRegistro ? 'lr-input-error' : ''}>
                          <option value="">Selecciona tipo</option>
                          <option value="reclamo">Reclamo</option>
                          <option value="queja">Queja</option>
                        </select>
                      </Campo>
                      <Campo id="area" label="Área / Servicio" required error={errores.area}>
                        <select id="area" name="area" value={form.area} onChange={handleChange} className={errores.area ? 'lr-input-error' : ''}>
                          <option value="">Selecciona área</option>
                          <option value="cableado">Cableado Estructurado</option>
                          <option value="camaras">Cámaras de Seguridad</option>
                          <option value="soporte">Soporte y Mantenimiento</option>
                          <option value="asesoramiento">Asesoramiento</option>
                          <option value="capacitaciones">Capacitaciones</option>
                          <option value="cursos">Cursos</option>
                          <option value="atencion">Atención al Cliente</option>
                          <option value="otro">Otro</option>
                        </select>
                      </Campo>
                      <Campo id="fechaIncidente" label="Fecha del Incidente" required error={errores.fechaIncidente}>
                        <input type="date" id="fechaIncidente" name="fechaIncidente" value={form.fechaIncidente} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className={errores.fechaIncidente ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="descripcionBien" label="Descripción del Bien / Servicio" required full error={errores.descripcionBien}>
                        <textarea id="descripcionBien" name="descripcionBien" value={form.descripcionBien} onChange={handleChange} rows={3} placeholder="Describe el producto o servicio adquirido..." className={errores.descripcionBien ? 'lr-input-error' : ''} />
                      </Campo>
                      <Campo id="detalleReclamo" label="Detalle del Reclamo / Queja" required full error={errores.detalleReclamo}>
                        <textarea id="detalleReclamo" name="detalleReclamo" value={form.detalleReclamo} onChange={handleChange} rows={5} placeholder="Describe detalladamente lo ocurrido..." maxLength={1000} className={errores.detalleReclamo ? 'lr-input-error' : ''} />
                        <small className="lr-counter">{chars} / 1000 caracteres</small>
                      </Campo>
                    </div>
                    <div className="lr-nav">
                      <button type="button" className="lr-btn lr-btn-ghost" onClick={() => setPaso(1)}>
                        <i className="fas fa-arrow-left" /> Anterior
                      </button>
                      <button type="button" className="lr-btn lr-btn-primary" onClick={irPaso3}>
                        Siguiente <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                )}
                {paso === 3 && (
                  <div className="lr-paso active">
                    <div className="lr-paso-header">
                      <div className="lr-paso-icon lr-paso-icon-green"><i className="fas fa-check-double" /></div>
                      <div><h2>Confirmación y Envío</h2><p>Revisa tu información antes de enviar.</p></div>
                    </div>

                    <div className="lr-resumen">
                      <h4><i className="fas fa-user" /> Datos personales</h4>
                      <div className="lr-resumen-grid">
                        <div><span>Nombre</span><strong>{form.nombres} {form.apellidos}</strong></div>
                        <div><span>Documento</span><strong>{form.tipoDoc?.toUpperCase()} {form.numDoc}</strong></div>
                        <div><span>Email</span><strong>{form.email}</strong></div>
                        <div><span>Teléfono</span><strong>{form.telefono}</strong></div>
                      </div>
                    </div>
                    <div className="lr-resumen">
                      <h4><i className="fas fa-clipboard-list" /> Detalle del reclamo</h4>
                      <div className="lr-resumen-grid">
                        <div><span>Tipo</span><strong style={{ textTransform:'capitalize' }}>{form.tipoRegistro}</strong></div>
                        <div><span>Área</span><strong style={{ textTransform:'capitalize' }}>{form.area}</strong></div>
                        <div><span>Fecha</span><strong>{form.fechaIncidente}</strong></div>
                      </div>
                      {form.descripcionBien && <p style={{ marginTop:10, fontSize:'.85rem', color:'var(--gray-600)', lineHeight:1.6 }}><strong>Bien/Servicio:</strong> {form.descripcionBien}</p>}
                      {form.detalleReclamo  && <p style={{ marginTop:8,  fontSize:'.85rem', color:'var(--gray-600)', lineHeight:1.6 }}>{form.detalleReclamo}</p>}
                    </div>

                    <div className="lr-terminos">
                      <label className="lr-check-label">
                        <input type="checkbox" name="aceptaTerminos" checked={form.aceptaTerminos} onChange={handleChange} />
                        <span>Declaro que la información es verídica y acepto que Horus Group SRL procese mis datos conforme a su <Link to="/politicas/privacidad" target="_blank">Política de Privacidad</Link>. <span className="lr-req">*</span></span>
                      </label>
                      <label className="lr-check-label">
                        <input type="checkbox" name="aceptaComunicaciones" checked={form.aceptaComunicaciones} onChange={handleChange} />
                        <span>Acepto recibir comunicaciones sobre el seguimiento de mi reclamo por correo electrónico.</span>
                      </label>
                    </div>

                    {!form.aceptaTerminos && (
                      <p style={{ fontSize:'.82rem', color:'var(--coral)', marginBottom:12 }}>
                        <i className="fas fa-exclamation-circle" /> Debes aceptar los términos para enviar el reclamo.
                      </p>
                    )}

                    {error && (
                      <div style={{ background:'#FEF2F2', border:'1px solid #fca5a5', color:'#991b1b', padding:'12px 16px', borderRadius:10, marginBottom:12, fontWeight:600, display:'flex', alignItems:'center', gap:8 }}>
                        <i className="fas fa-exclamation-circle" /> {error}
                      </div>
                    )}

                    <div className="lr-nav">
                      <button type="button" className="lr-btn lr-btn-ghost" onClick={() => setPaso(2)}>
                        <i className="fas fa-arrow-left" /> Anterior
                      </button>
                      <button type="submit" className="lr-btn lr-btn-primary" disabled={!form.aceptaTerminos || loading}>
                        {loading
                          ? <><i className="fas fa-spinner fa-spin" /> Enviando...</>
                          : <><i className="fas fa-paper-plane" /> Enviar Reclamo</>
                        }
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
