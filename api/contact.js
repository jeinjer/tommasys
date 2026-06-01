export default async function handler(req, res) {
  // Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Suponemos que el dominio es tommasys.com
    // Reemplaza "web@tommasys.com" por el dominio que realmente hayas verificado en Resend.
    const fromEmail = 'Tommasys Web <web@tommasys.com>';
    const toEmail = 'tommasys.ar@gmail.com';

    // Hacer petición a Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `Nuevo mensaje de contacto web: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Nuevo contacto desde la web de Tommasys</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email de trabajo:</strong> ${email}</p>
            <p><strong>Desafío / Mensaje:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #E8601C; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">Enviado desde el formulario de contacto de tommasys.ar</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de Resend:', data);
      return res.status(400).json({ error: data.message });
    }

    // Respuesta exitosa
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error en el endpoint de contacto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
