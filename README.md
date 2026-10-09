# Web Transport - Página Web Next.js Optimizada para SEO

Un proyecto Next.js 16 moderno con **sistema de diseño personalizado**, **colores institucionales** (verde #2CAD3F a azul #0A4EB6) y **optimizaciones SEO completas**.

## Idiomas y regiones

- Inglés es el idioma principal: `/`, `/regions`, `/air`, etc.
- Español utiliza `/es`: `/es`, `/es/regions`, `/es/air`, etc.
- El selector EN/ES conserva la página, los parámetros y la sección actual. Los enlaces internos mantienen el idioma elegido.
- Cada idioma tiene un layout raíz que genera el atributo `lang`, contenido y metadatos correctos en el HTML estático, antes de ejecutar JavaScript.
- `/clients` y `/es/clients` se conservan como accesos a la nueva página de Regiones.
- Regiones destaca República Dominicana y el Caribe, además de Centroamérica, Sudamérica y cobertura global. Industrias es una sección de esa página.
- Los textos en inglés son claves de traducción; la versión española está en `src/lib/translations/es.json`. Al agregar texto o destinos, agrega también su traducción.
- Ejecuta `npm run check:locales` para comprobar cobertura de traducción y variables, y `npm run build` para generar ambas versiones en `out/`.

## Cotizaciones y contactos

- El formulario envía `multipart/form-data` al endpoint público de Leads: `https://sisleads.appfastway.com/api/leads/public/ingest`, con `pageUrl`, `formId=tliQuoteRequest`, `payload` JSON y la clave pública en `x-api-key`, siguiendo el contrato de la web de referencia.
- El backend conserva el lead y gestiona las notificaciones por correo. La web confirma recepción únicamente cuando obtiene una respuesta JSON válida con `ok: true` y una referencia. No anuncia envío de correo al cliente ni promete plazos de respuesta.
- TLI se identifica con `brand: TLI Miami`, `serviceLine: logistica` y `businessUnit: Fastway`, porque el backend admite Fastway, Harvest y Greenway; enviar `TLI` como unidad fallaría su validación. Región, servicio, ruta, peso y datos de contacto se conservan en el payload.
- Los enlaces desde Regiones conservan `?region=...` en el formulario; los servicios conservan `?service=...`. Las ciudades admiten sugerencias y entrada libre.
- El acceso simulado se retiró del menú. `/login` conserva una página de asistencia sin pedir credenciales. Alianzas y empleo abren `/contact?topic=partnerships` y `/contact?topic=careers`, con contactos apropiados por WhatsApp y correo para copiar.
- Se pueden configurar `NEXT_PUBLIC_LEADS_ENDPOINT` y `NEXT_PUBLIC_LEADS_PUBLIC_KEY` al compilar; la clave de ingestión del cliente es pública. No colocar claves administrativas ni credenciales SMTP en variables públicas.
- **Requisito externo de producción:** el backend debe permitir `https://tlimiami.com` (y `https://www.tlimiami.com` si se usa) en `CORS_ORIGINS`. Al revisar la integración, su preflight devolvió HTTP 500 sin `Access-Control-Allow-Origin`, también para localhost. Una prueba GET de `/public/ping` sí devuelve 200. No se elude CORS ni se modificó el backend de referencia.
- El administrador del backend debe verificar SMTP y `LEADS_EMAIL_ROUTES`, por ejemplo una entrada `"tlimiami.com": "sales@btgcompany.net"` para notificar a ventas de TLI. La configuración local de referencia no demuestra la configuración del servidor en producción.
- Ejecutar `npm run test:quotes`, `npm run check:locales` y `npm run build`. Las pruebas del contrato usan respuestas simuladas para no crear leads de prueba ni enviar correos reales.

## 🚀 Características

### ✨ Diseño Personalizado

- **Variables CSS globales** para mantenimiento consistente
- **Gradientes institucionales** únicos y profesionales
- **Componentes reutilizables** (Button, Hero, Card)
- **Sistema de espaciado** escalable
- **Dark mode automático**

### 🎯 Optimizado para SEO

- Metadata API nativa de Next.js
- Estructura HTML semántica
- Server-side rendering (SSR)
- Static generation (SSG)
- Imágenes optimizadas
- Rendimiento ultrarrápido (Turbopack)

### 🛠 Stack Tecnológico

- **Next.js 16.2.4** con Turbopack
- **React 19** + TypeScript
- **Tailwind CSS 4** personalizado
- **ESLint** para código limpio
- **Sin dependencias pesadas**

## 📂 Estructura del Proyecto

```
src/
├── app/                    # Rutas y páginas
│   ├── page.tsx           # Página principal demo
│   ├── layout.tsx         # Layout base
│   └── globals.css        # Variables CSS globales
├── components/            # Componentes reutilizables
│   ├── Button.tsx         # Botón con gradientes
│   ├── Hero.tsx           # Sección hero
│   ├── Card.tsx           # Tarjeta flexible
│   └── index.ts           # Exportaciones
└── lib/
    └── styles.ts          # Utilidades CSS
```

## 🎨 Colores Institucionales

| Color          | Hex       | Uso              |
| -------------- | --------- | ---------------- |
| Verde Primario | `#2CAD3F` | Acento principal |
| Azul Primario  | `#0A4EB6` | Botones y links  |
| Azul Oscuro    | `#042C51` | Títulos y texto  |

**Gradientes disponibles:**

- Primario: Verde → Azul
- Secundario: Azul Oscuro → Azul
- Accent: Verde → Azul Oscuro → Azul

## 🏃 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Desarrollo local

```bash
npm run dev
```

→ Abre [http://localhost:3000](http://localhost:3000)

### 3. Build para producción

```bash
npm run build
npm run start
```

## 📝 Componentes Disponibles

### Button

```tsx
import { Button } from '@/components'
;<Button variant='primary' size='lg'>
  Texto
</Button>
// variant: primary | secondary | outline
// size: sm | md | lg
```

### Hero

```tsx
<Hero
  title='Título Grande'
  subtitle='Descripción'
  ctaText='Botón CTA'
  backgroundType='gradient-primary'
/>
```

### Card

```tsx
<Card title='Título' description='Descripción' highlighted={true} />
```

## 🔍 SEO Incluido

✅ Open Graph tags  
✅ Meta descriptions  
✅ Sitemap compatible  
✅ Robots.txt support  
✅ Structured data ready  
✅ Mobile optimized  
✅ Core Web Vitals friendly

## 🎓 Variables CSS

Definidas en `src/app/globals.css`:

```css
/* Colores */
--primary-green: #2cad3f --primary-blue: #0a4eb6 --primary-dark-blue: #042c51
  /* Espaciado */ --spacing-xs/sm/md/lg/xl/2xl /* Gradientes */
  --gradient-primary --gradient-secondary --gradient-accent;
```

## 📚 Documentación Completa

Para guía detallada del sistema de diseño:
→ Ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 🔧 Comandos npm

```bash
npm run dev      # Desarrollo local
npm run build    # Compilar producción
npm run start    # Servidor producción
npm run lint     # Verificar código
```

## 💡 Próximos Pasos

1. **Personalizar contenido** en `src/app/page.tsx`
2. **Crear nuevas páginas** en `src/app/`
3. **Agregar componentes** en `src/components/`
4. **Configurar dominio** y deployment
5. **Agregar analytics** (GA4, etc.)

## 📦 Dependencias Principales

- `next` - Framework React
- `react` & `react-dom` - UI
- `tailwindcss` - Estilos CSS
- `typescript` - Type safety
- `eslint` - Linting

## 🚀 Deployment

Listo para desplegar en:

- **Vercel** (recomendado)
- **Netlify**
- **AWS**
- **Azure**
- **Cualquier servidor Node.js**

---

**Hecho con ❤️ para máximo rendimiento y SEO**
