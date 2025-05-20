const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jsPDF } = require('jspdf');

const prisma = new PrismaClient();
const app = express();
app.use(express.json({ limit: '1mb' }));

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

function createToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
}

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashed } });
    const token = createToken(user);
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(400).json({ error: 'user already exists' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'invalid credentials' });
  const token = createToken(user);
  return res.json({ token });
});

function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'missing auth header' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

app.post('/investors', auth, async (req, res) => {
  const { nombre, email, telefono } = req.body || {};
  if (!nombre || !email || !telefono) {
    return res.status(400).json({ error: 'missing fields' });
  }
  const investor = await prisma.investor.create({ data: { nombre, email, telefono } });
  res.status(201).json(investor);
});

app.get('/investors', auth, async (req, res) => {
  const investors = await prisma.investor.findMany();
  res.json(investors);
});

app.post('/projects', auth, async (req, res) => {
  const { nombre_proyecto, email_proyecto, telefono_proyecto, investorId } = req.body || {};
  if (!nombre_proyecto || !email_proyecto || !telefono_proyecto) {
    return res.status(400).json({ error: 'missing fields' });
  }
  const project = await prisma.project.create({
    data: { nombre_proyecto, email_proyecto, telefono_proyecto, investorId }
  });
  res.status(201).json(project);
});

app.get('/projects', auth, async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

app.post('/certificates', auth, async (req, res) => {
  const data = req.body || {};
  try {
    const doc = new jsPDF();
    doc.text('Certificado de Inversi\u00f3n', 10, 10);
    if (data.empresa) {
      doc.text(`Empresa: ${data.empresa.nombre || ''}`, 10, 20);
      doc.text(`CIF: ${data.empresa.cif || ''}`, 10, 30);
    }
    if (data.inversor) {
      doc.text(`Inversor: ${data.inversor.nombre || ''}`, 10, 40);
      doc.text(`NIF: ${data.inversor.nif || ''}`, 10, 50);
    }
    if (data.inversion) {
      doc.text(`Fecha inversi\u00f3n: ${data.inversion.fecha || ''}`, 10, 60);
      doc.text(`Importe: ${data.inversion.importe || ''}`, 10, 70);
    }
    const pdf = doc.output();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="certificado.pdf"');
    return res.send(Buffer.from(pdf, 'binary'));
  } catch (e) {
    console.error('PDF generation error', e);
    return res.status(500).json({ error: 'error generating certificate' });
  }
});

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

module.exports = app;
