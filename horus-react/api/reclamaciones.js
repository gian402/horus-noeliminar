import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function sanitize(str) {
  return typeof str === 'string' ? str.trim().slice(0, 1000) : ''
}

function generarNumeroReclamo() {
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `HG-${fecha}-${rand}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, mensaje: 'Método no permitido' })
  }

  const {
    nombres, apellidos, tipo_doc, num_doc, email, telefono,
    direccion, tipo_registro, area, fecha_incidente,
    descripcion_bien, detalle_reclamo, acepta_comunicaciones,
  } = req.body ?? {}

  if (!nombres || !apellidos || !email || !tipo_registro || !detalle_reclamo) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan campos obligatorios' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, mensaje: 'Correo inválido' })
  }
  if (!['reclamo', 'queja'].includes(tipo_registro)) {
    return res.status(400).json({ ok: false, mensaje: 'Tipo de registro inválido' })
  }
  if (telefono && !/^\d{9}$/.test(telefono.trim())) {
    return res.status(400).json({ ok: false, mensaje: 'Teléfono inválido' })
  }

  const numero_reclamo = generarNumeroReclamo()

  const { error } = await supabase.from('reclamaciones').insert({
    numero_reclamo,
    nombres:               sanitize(nombres),
    apellidos:             sanitize(apellidos),
    tipo_doc:              sanitize(tipo_doc),
    num_doc:               sanitize(num_doc),
    email:                 sanitize(email),
    telefono:              sanitize(telefono),
    direccion:             sanitize(direccion),
    tipo_registro,
    area:                  sanitize(area),
    fecha_incidente:       fecha_incidente || null,
    descripcion_bien:      sanitize(descripcion_bien),
    detalle_reclamo:       sanitize(detalle_reclamo),
    acepta_comunicaciones: !!acepta_comunicaciones,
  })

  if (error) {
    console.error('Supabase error:', error.message)
    return res.status(500).json({ ok: false, mensaje: 'Error al registrar el reclamo' })
  }

  await transporter.sendMail({
    from: `"Horus Group Web" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `Nuevo ${tipo_registro} #${numero_reclamo}`,
    html: `
      <h2>Nuevo ${tipo_registro} recibido</h2>
      <p><strong>N°:</strong> ${numero_reclamo}</p>
      <p><strong>Nombre:</strong> ${sanitize(nombres)} ${sanitize(apellidos)}</p>
      <p><strong>Email:</strong> ${sanitize(email)}</p>
      <p><strong>Teléfono:</strong> ${sanitize(telefono)}</p>
      <p><strong>Tipo doc:</strong> ${sanitize(tipo_doc)} - ${sanitize(num_doc)}</p>
      <p><strong>Área:</strong> ${sanitize(area)}</p>
      <p><strong>Detalle:</strong><br>${sanitize(detalle_reclamo)}</p>
    `,
  })

  return res.status(200).json({ ok: true, numero_reclamo })
}
