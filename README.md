# Tommasys

Sitio estático dividido en archivos chicos para que sea más fácil editar contenido, estilos y comportamiento.

## Estructura

```text
tommasys/
  index.html                 # Entrada principal, solo carga componentes y secciones
  assets/images/             # Imágenes y GIFs
  components/                # Bloques globales: navegación, footer, indicador
  sections/                  # Una sección HTML por archivo
  styles/
    main.css                 # Índice de estilos
    base/                    # Tokens, reset y tipografía
    components/              # Botones, navegación, footer, indicador
    sections/                # Estilos específicos de cada sección
    utilities/               # Animaciones y responsive
  scripts/
    app.js                   # Inicializa el sitio
    modules/                 # Un archivo JS por comportamiento
```

## Cómo editar

- Cambios de texto o estructura: editá los archivos en `sections/` o `components/`.
- Cambios visuales de una sección: editá el CSS equivalente en `styles/sections/`.
- Cambios globales de color, radios o tamaños base: editá `styles/base/tokens.css`.
- Cambios de interacción: editá el módulo correspondiente en `scripts/modules/`.

## Cómo verlo

El sitio carga fragmentos HTML con `fetch`, así que conviene abrirlo desde un servidor local.

```bash
cd tommasys
python -m http.server 5173
```

Luego abrí `http://localhost:5173`.
