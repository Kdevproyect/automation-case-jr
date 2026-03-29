## 🚀 Automation Case Jr
Web App de exploración de productos usando n8n + Google Apps Script + API pública

## 📌 Descripción
Esta solución implementa una aplicación web que permite explorar productos mediante:
- 🔍 búsqueda por texto
- 🏷️ filtro por categoría
- 🧾 visualización en tarjetas

Se utilizó una arquitectura híbrida:
- ⚙️ n8n como backend (automatización y transformación de datos)
- 🌐 Google Apps Script como frontend (Web App)

## 🏗️ Arquitectura
```
Usuario
↓
Apps Script (Frontend)
↓
Webhook n8n
↓
DummyJSON API
↓
n8n transforma datos
↓
Apps Script renderiza UI
```
## 🧰 Tecnologías usadas
- ⚙️ n8n (self-hosted)
- 🌐 Google Apps Script
- 💻 HTML / CSS / JavaScript
- 📦 DummyJSON API (https://dummyjson.com/docs/products)
## ⚙️ Backend — n8n
🔹 Funcionalidad
  - Webhook GET (/products)
  - Consumo de API pública
  - Filtros dinámicos: category y search
  - Transformación de datos
  - Respuesta JSON estructurada
  
🔹 Endpoint
```
GET /webhook/products
```
🔹 Ejemplos
```
/webhook/products
/webhook/products?category=beauty
/webhook/products?search=powder
/webhook/products?category=beauty&search=powder
```
🔹 Ejemplo de respuesta
```
{
  "success": true,
  "count": 1,
  "filters": {
    "category": "beauty",
    "search": "powder"
  },
  "data": [
    {
      "id": 24,
      "title": "Powder Canister",
      "category": "beauty",
      "price": 14.99,
      "rating": 4.64,
      "thumbnail": "https://..."
    }
  ]
}
```
## 🌐 Frontend — Apps Script
🔹 Funcionalidad
- Renderizado HTML con doGet()
- Consumo del webhook de n8n
- UI con tarjetas de productos
- Interacciones:
🔍 búsqueda
🏷️ filtro dinámico
♻️ limpiar filtros

## 🚀 Cómo ejecutar
1️⃣ Configurar n8n
- Crear workflow con:
  - Webhook
  - HTTP Request
  - Code
  - Respond to Webhook
- Endpoint: /products
- API: https://dummyjson.com/products?limit=200
  - Activar workflow
  - Copiar Production URL

2️⃣ Configurar Apps Script
- Crear proyecto
- Agregar:
  - code.gs
  - index.html
  - appsscript.json (Configuracion - Activar: Mostrar el archivo de manifiesto "appsscript.json" en el editor)

Actualizar: const N8N_WEBHOOK_URL = "TU_URL_PRODUCCION_DE_N8N"
  
3️⃣ Implementar Web App
- Nueva Implementación → Aplicación web
- Ejecutar como: Yo
- Quién tiene acceso: Cualquier usuario

## 🧪 Testing
- Se utilizó Postman para validar el webhook
- Pruebas realizadas:
  - filtros por categoría
  - búsqueda por texto
  - combinaciones de ambos

## 🔮 Mejoras futuras
- 📄 Paginación
- 🔎 Vista de detalle
- ⚡ Cache de resultados
- 🔐 Autenticación
- 🎨 Mejoras UI/UX

## 👨‍💻 Autor
Kevin Salcedo









