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
  return typeof str === 'string' ? str.trim().slice(0, 500) : ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, mensaje: 'Método no permitido' })
  }

  const { nombre, email, telefono, asunto, mensaje } = req.body ?? {}

  if (!nombre || !email || !telefono || !asunto || !mensaje) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan campos obligatorios' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, mensaje: 'Correo inválido' })
  }
  if (!/^\d{9}$/.test(telefono.trim())) {
    return res.status(400).json({ ok: false, mensaje: 'Teléfono inválido' })
  }

  const { error } = await supabase.from('contactos').insert({
    nombre:   sanitize(nombre),
    email:    sanitize(email),
    telefono: sanitize(telefono),
    asunto:   sanitize(asunto),
    mensaje:  sanitize(mensaje),
  })

  if (error) {
    console.error('Supabase error completo:', JSON.stringify(error))
    return res.status(500).json({ ok: false, mensaje: 'Error al guardar el mensaje' })
  }

  await transporter.sendMail({
    from: `"Horus Group Web" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `Nuevo contacto: ${sanitize(asunto)}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${sanitize(nombre)}</p>
      <p><strong>Email:</strong> ${sanitize(email)}</p>
      <p><strong>Teléfono:</strong> ${sanitize(telefono)}</p>
      <p><strong>Asunto:</strong> ${sanitize(asunto)}</p>
      <p><strong>Mensaje:</strong><br>${sanitize(mensaje)}</p>
    `,
  })

  return res.status(200).json({ ok: true })
}
