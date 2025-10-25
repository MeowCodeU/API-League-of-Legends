// Buscador de Campeones - League of Legends
// Implementación simple con fetch() y promesas

// Elementos del DOM
const championInput = document.getElementById('championInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorText = document.getElementById('errorText');
const result = document.getElementById('result');

// URL de la API
const API_URL = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/es_MX';

// Función para mostrar loading
function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';
}

// Función para mostrar error
function showError(message) {
    loading.style.display = 'none';
    error.style.display = 'block';
    result.style.display = 'none';
    errorText.textContent = message;
}

// Función para mostrar resultado
function showResult(champion) {
    loading.style.display = 'none';
    error.style.display = 'none';
    result.style.display = 'block';
    
    // Mostrar datos del campeón
    document.getElementById('championName').textContent = champion.name;
    document.getElementById('championTitle').textContent = champion.title;
    document.getElementById('championRole').textContent = champion.tags.join(', ');
    document.getElementById('championDifficulty').textContent = champion.info.difficulty + '/10';
    document.getElementById('championDescription').textContent = champion.blurb;
    
    // Mostrar imagen
    document.getElementById('championImage').src = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`;
}

// Función para buscar campeón
function searchChampion() {
    const championName = championInput.value.trim();
    
    if (!championName) {
        showError('Por favor, escribe el nombre de un campeón');
        return;
    }
    
    showLoading();
    
    // Buscar campeón usando fetch
    fetch(`${API_URL}/champion.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API');
            }
            return response.json();
        })
        .then(data => {
            // Buscar el campeón por nombre
            const champions = data.data;
            const championKey = Object.keys(champions).find(key => 
                champions[key].name.toLowerCase() === championName.toLowerCase()
            );
            
            if (!championKey) {
                throw new Error(`No se encontró el campeón "${championName}"`);
            }
            
            // Obtener datos detallados
            return fetch(`${API_URL}/champion/${championKey}.json`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener datos del campeón');
            }
            return response.json();
        })
        .then(data => {
            const championData = data.data[Object.keys(data.data)[0]];
            showResult(championData);
        })
        .catch(error => {
            console.error('Error:', error);
            showError(error.message);
        });
}

// Event listeners
searchBtn.addEventListener('click', searchChampion);

// Buscar con Enter
championInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchChampion();
    }
});