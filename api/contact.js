// Rate limit store: Map<ip, { count, firstRequest, lastRequest }>
const rateLimitStore = new Map();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS_PER_WINDOW = 3; // máximo 3 envíos cada 10 minutos por IP

// Limpiar entradas viejas cada 15 minutos para no acumular memoria
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}, 15 * 60 * 1000);

function getClientIp(req) {
  // Vercel forwarda la IP real en x-forwarded-for
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now, lastRequest: now });
    return { allowed: true };
  }

  // Si pasó la ventana de tiempo, resetear
  if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now, lastRequest: now });
    return { allowed: true };
  }

  // Dentro de la ventana: incrementar y verificar
  entry.count += 1;
  entry.lastRequest = now;

  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSecs = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - entry.firstRequest)) / 1000
    );
    return { allowed: false, retryAfter: retryAfterSecs };
  }

  return { allowed: true };
}

export default async function handler(req, res) {
  // Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ── Rate limiting por IP ─────────────────────────────────────────────────
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return res.status(429).json({
      error: 'Demasiadas solicitudes. Por favor, esperá unos minutos antes de reintentar.',
      retryAfter: limit.retryAfter,
    });
  }

  try {
    const { name, email, message } = req.body;

    // ── Validación básica ──────────────────────────────────────────────────
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ error: 'Nombre inválido' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (message.trim().length < 10 || message.trim().length > 5000) {
      return res.status(400).json({ error: 'Mensaje demasiado corto o largo' });
    }

    // ── Envío con Resend ───────────────────────────────────────────────────
    const fromEmail = 'Tommasys Web <web@tommasys.ar>';
    const toEmail = 'tommasys.ar@gmail.com';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `Nuevo mensaje de contacto web: ${name.trim()}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Nuevo contacto desde la web de Tommasys</h2>
            <p><strong>Nombre:</strong> ${name.trim()}</p>
            <p><strong>Email de trabajo:</strong> ${email.trim()}</p>
            <p><strong>Desafío / Mensaje:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #E8601C; margin-top: 10px;">
              ${message.trim().replace(/\n/g, '<br>')}
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

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error en el endpoint de contacto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
