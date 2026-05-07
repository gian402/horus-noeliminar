const CAT = {
  capacitaciones:     { cat: 'capacitaciones',     label: 'Capacitaciones' },
  'servicio-tecnico': { cat: 'servicio-tecnico',   label: 'Servicio Técnico' },
  'colegio-enfermeros':{ cat: 'colegio-enfermeros', label: 'Colegio Enfermeros' },
  'colegio-abogados': { cat: 'colegio-abogados',   label: 'Colegio Abogados' },
  isam:               { cat: 'isam',               label: 'ISAM' },
  'primeros-auxilios':{ cat: 'primeros-auxilios',  label: 'Primeros Auxilios' },
}

function imgs(folder, catKey, count, files) {
  const { cat, label } = CAT[catKey]
  return files.map(f => ({
    url:   `${import.meta.env.BASE_URL}galeria/${folder}/${f}`,
    cat,
    label,
    title: `${label} — ${f.replace(/\.[^.]+$/, '').replace(/-/g, ' ')}`,
  }))
}

const galeriaData = [
  ...imgs('capacitaciones', 'capacitaciones', 12, [
    'imagen-1.jpg','imagen-2.jpg','imagen-3.jpg','imagen-4.jpg',
    'imagen-5.jpg','imagen-6.jpg','imagen-7.jpg','imagen-8.jpg',
    'imagen-9.jpg','imagen-10.jpg','imagen-11.jpg','imagen-12.jpg',
  ]),
  ...imgs('nuestro-servicio-tecnico', 'servicio-tecnico', 10, [
    'imagen-1.jpg','imagen-2.jpg','imagen-3.jpg','imagen-4.jpg',
    'imagen-5.jpg','imagen-6.jpg','imagen-7.jpg','imagen-8.jpg',
    'imagen-9.jpg','imagen-10.jpg',
  ]),
  ...imgs('colegio-de-enfermeros', 'colegio-enfermeros', 17, [
    'imagen-1.jpg','imagen-2.jpg','imagen-3.jpg','imagen-4.jpg',
    'imagen-5.jpg','imagen-6.jpg','imagen-7.jpg','imagen-8.jpg',
    'imagen-9.jpg','imagen-10.jpg','imagen-11.jpg','imagen-12.jpg',
    'imagen-13.jpg','imagen-14.jpg','imagen-15.jpg','imagen-16.jpg','imagen-17.jpg',
  ]),
  ...imgs('colegio-de-abogados', 'colegio-abogados', 7, [
    'imagen-1.jpg','imagen-2.jpg','imagen-3.jpg','imagen-4.jpg',
    'imagen-7.jpg','imagen-9.jpg','imagen-10.jpg',
  ]),
  ...imgs('ISAM', 'isam', 8, [
    'imagen-1.jpg','imagen-2.jpg','imagen-3.jpg','imagen-4.jpg',
    'imagen-5.jpg','imagen-6.jpg','imagen-7.jpg','imagen-8.jpg',
  ]),
  ...imgs('practicas-de-primeros-auxilios', 'primeros-auxilios', 7, [
    'imagen-1.jpg','imagen-2.jpg','imagen-3.jpg','imagen-4.jpg',
    'imagen-5.jpg','imagen-6.jpg','imagen-7.jpg',
  ]),
]

export default galeriaData
