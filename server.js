const express = require('express');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '1mb' }));
// Optional preview protection
if (process.env.PREVIEW_PASSWORD) {
  app.use((req, res, next) => {
    const header = req.headers['authorization'];
    if (!header || !header.startsWith('Basic ')) {
      res.set('WWW-Authenticate', 'Basic realm="Preview"');
      return res.status(401).end();
    }
    const encoded = header.slice('Basic '.length);
    let decoded;
    try {
      decoded = Buffer.from(encoded, 'base64').toString('utf8');
    } catch (e) {
      decoded = '';
    }
    const password = decoded.includes(':') ? decoded.split(':')[1] : decoded;
    if (password !== process.env.PREVIEW_PASSWORD) {
      res.set('WWW-Authenticate', 'Basic realm="Preview"');
      return res.status(401).end();
    }
    next();
  });
}
app.use(express.static(__dirname));

// Simple JSON file based persistence
const DATA_FILE = path.join(__dirname, 'profiles.json');

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { investors: [], projects: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function validateInvestor(body) {
  const required = ['nombre', 'email', 'telefono'];
  for (const field of required) {
    if (!body[field]) return `Falta campo ${field}`;
  }
  return null;
}

function validateProject(body) {
  const required = ['nombre_proyecto', 'email_proyecto', 'telefono_proyecto'];
  for (const field of required) {
    if (!body[field]) return `Falta campo ${field}`;
  }
  return null;
}

app.post('/api/certificado', (req, res) => {
  const data = req.body || {};
  try {
    const doc = new jsPDF();

    doc.text('Certificado de Inversión', 10, 10);

    if (data.empresa) {
      doc.text(`Empresa: ${data.empresa.nombre || ''}`, 10, 20);
      doc.text(`CIF: ${data.empresa.cif || ''}`, 10, 30);
    }

    if (data.inversor) {
      doc.text(`Inversor: ${data.inversor.nombre || ''}`, 10, 40);
      doc.text(`NIF: ${data.inversor.nif || ''}`, 10, 50);
    }

    if (data.inversion) {
      doc.text(`Fecha inversión: ${data.inversion.fecha || ''}`, 10, 60);
      doc.text(`Importe: ${data.inversion.importe || ''}`, 10, 70);
    }

    const pdf = doc.output();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="certificado.pdf"');
    return res.send(Buffer.from(pdf, 'binary'));
  } catch (e) {
    console.error('PDF generation error', e);
    return res.status(500).json({ error: 'Error generando el certificado' });
  }
});

app.post('/api/profiles/inversor', (req, res) => {
  const error = validateInvestor(req.body || {});
  if (error) {
    return res.status(400).json({ error });
  }
  const data = loadData();
  const profile = { ...req.body, id: Date.now() };
  data.investors.push(profile);
  saveData(data);
  return res.status(201).json({ id: profile.id });
});

app.get('/api/profiles/inversor', (req, res) => {
  const data = loadData();
  res.json(data.investors);
});

app.post('/api/profiles/proyecto', (req, res) => {
  const error = validateProject(req.body || {});
  if (error) {
    return res.status(400).json({ error });
  }
  const data = loadData();
  const profile = { ...req.body, id: Date.now() };
  data.projects.push(profile);
  saveData(data);
  return res.status(201).json({ id: profile.id });
});

app.get('/api/profiles/proyecto', (req, res) => {
  const data = loadData();
  res.json(data.projects);
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Certificado service listening on port ${PORT}`);
  });
}

module.exports = app;
