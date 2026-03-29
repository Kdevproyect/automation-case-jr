/**
 * URL del webhook de n8n que procesa la consulta de productos.
 *
 * IMPORTANTE:
 * Esta URL depende del entorno donde esté desplegado n8n.
 * Quien ejecute este proyecto deberá actualizar esta URL con la IP pública actual de su servidor n8n.
 * Formato esperado: http://<TU_IP_PUBLICA>:5678/webhook/products
 */
const N8N_WEBHOOK_URL = "http://18.191.111.101:5678/webhook/products";

/**
 * Renderiza la web app y devuelve el archivo HTML principal.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index").setTitle(
    "Product Explorer"
  );
}

/**
 * Consulta productos a través del webhook de n8n.
 *
 * Esta función actúa como puente entre el frontend (index.html) y el flujo automatizado en n8n.
 *
 * @param {string} category - Categoría seleccionada por el usuario.
 * @param {string} search - Texto de búsqueda ingresado por el usuario.
 * @returns {Object} Respuesta del webhook o un objeto de error controlado.
 */
function getProducts(category, search) {
  // Asegura valores vacíos en caso de que no se envíen filtros
  category = category || "";
  search = search || "";

  // Construye la URL final con query params codificados
  const url =
    N8N_WEBHOOK_URL +
    "?category=" +
    encodeURIComponent(category) +
    "&search=" +
    encodeURIComponent(search);

  try {
    // Realiza la solicitud HTTP GET hacia el webhook de n8n
    const response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true,
    });

    const status = response.getResponseCode();
    const text = response.getContentText();

    // Si n8n responde con un estado distinto de 200,
    // se devuelve un error controlado para el frontend
    if (status !== 200) {
      return {
        success: false,
        message: "Error al consultar n8n",
        status: status,
        raw: text,
      };
    }

    // Convierte la respuesta JSON en objeto JavaScript
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    // Manejo de errores inesperados en la conexión o procesamiento
    return {
      success: false,
      message: "Error inesperado al consultar n8n",
      error: error.toString(),
    };
  }
}

/**
 * Obtiene la lista de categorías desde DummyJSON.
 * Se usa para poblar dinámicamente el selector de categorías en el frontend.
 * @returns {Object} Objeto con estado de éxito y lista de categorías o un error controlado.
 */
function getCategories() {
  try {
    // Consulta la lista de categorías disponibles
    const response = UrlFetchApp.fetch(
      "https://dummyjson.com/products/category-list"
    );
    const data = JSON.parse(response.getContentText());

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    // Manejo de errores si falla la consulta externa
    return {
      success: false,
      message: "Error al obtener categorías",
      error: error.toString(),
    };
  }
}

/**
 * Función de prueba local para validar la consulta de productos desde el editor de Apps Script.
 * Permite verificar manualmente la respuesta en los logs sin necesidad de abrir la web app.
 */
function testGetProducts() {
  const result = getProducts("beauty", "powder");
  Logger.log(JSON.stringify(result, null, 2));
}
