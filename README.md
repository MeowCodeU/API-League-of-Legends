# Buscador de Campeones - League of Legends

## Descripción
Aplicación web simple que permite buscar información de campeones de League of Legends usando la API oficial.

## API Utilizada
- **URL**: `https://ddragon.leagueoflegends.com/cdn/13.24.1/data/es_MX`
- **Tipo**: API REST pública
- **Formato**: JSON

## Funcionalidades
- ✅ Búsqueda de campeones por nombre
- ✅ Muestra: nombre, título, rol, dificultad, descripción
- ✅ Imagen del campeón
- ✅ Manejo de errores básico

## Implementación Técnica

### HTML
- Estructura simple con Bootstrap
- Input de búsqueda y botón
- Contenedores para loading, error y resultado

### JavaScript
- **Fetch API** para peticiones HTTP
- **Promesas** con `.then()` y `.catch()`
- **Manejo de errores** básico

### Flujo de la Aplicación
1. Usuario escribe nombre del campeón
2. Se hace petición a la API
3. Se muestran los datos o un error

## Manejo de Errores

### Tipos de Errores
1. **Campeón no encontrado**: "No se encontró el campeón"
2. **Error de conexión**: "Error al conectar con la API"
3. **Entrada vacía**: "Por favor, escribe el nombre de un campeón"

### Implementación
```javascript
.catch(error => {
    console.error('Error:', error);
    showError(error.message);
})
```

## Uso
1. Abrir `index.html` en el navegador
2. Escribir nombre del campeón (ej: "Ahri", "Yasuo")
3. Hacer clic en "Buscar" o presionar Enter
4. Ver la información del campeón

## Ejemplos de Búsqueda
- Ahri
- Yasuo  
- Jinx
- Thresh