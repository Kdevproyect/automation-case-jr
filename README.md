🚀 Automation Case Jr

Web App de exploración de productos usando n8n + Google Apps Script + API pública

📌 Descripción

Esta solución implementa una aplicación web que permite explorar productos mediante:

🔍 búsqueda por texto
🏷️ filtro por categoría
🧾 visualización en tarjetas

Se utilizó una arquitectura híbrida:

⚙️ n8n como backend (automatización y transformación de datos)
🌐 Google Apps Script como frontend (Web App)




Proyecto de automatización de nivel junior enfocado en el desarrollo de una aplicación web para la exploración de productos. La solución permite a los usuarios navegar y encontrar información mediante filtros por categorías y opciones de búsqueda, mejorando la experiencia de consulta.

Se implementa una arquitectura híbrida en la que n8n actúa como motor backend, encargado de consumir y transformar datos provenientes de una API pública, mientras que Google Apps Script funciona como frontend, permitiendo visualizar la información de forma clara e interactiva.

Arquitectura:

Flujo de la aplicación:

El usuario interactúa con la Web App (Apps Script)
La Web App envía filtros (category, search) al webhook de n8n
n8n consume la API pública (DummyJSON)
n8n filtra y transforma los datos
n8n devuelve un JSON estructurado
Apps Script renderiza los productos en la interfaz


