const express = require('express');
const helmet = require('helmet');
const { jsPDF } = require('jspdf');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(helmet());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

function isValidPayload(data) {
  if (!data) return false;
  const { empresa, inversor, inversion } = data;
  if (!empresa || typeof empresa.nombre !== 'string' || typeof empresa.cif !== 'string') {
    return false;
  }
  if (!inversor || typeof inversor.nombre !== 'string' || typeof inversor.nif !== 'string') {
    return false;
  }
  if (!inversion || typeof inversion.fecha !== 'string' || typeof inversion.importe !== 'number') {
    return false;
  }
  return true;
}

app.post('/api/certificado', (req, res) => {
  const data = req.body || {};
  if (!isValidPayload(data)) {
    return res.status(400).json({ error: 'Datos de entrada inv\u00e1lidos' });
  }
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

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Certificado service listening on port ${PORT}`);
  });
}

module.exports = app;
