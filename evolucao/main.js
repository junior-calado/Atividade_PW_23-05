const nomePokemon = new URLSearchParams(document.location.search).get("evolucao");
const nomePagina = document.querySelector('title');
const h1Pagina = document.getElementById('nome-do-pokemon');
const imagemPokemon = document.getElementById('imagem-do-pokemon');
const botao = document.getElementById('botao');
let x = 0;

nomePagina.textContent = `Página do ${nomePokemon}`
h1Pagina.textContent = `Informações sobre o ${nomePokemon}`

// ------------------ API PAGE INTERACTIONS -----------------------
fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
    .then(response => response.json())
    .then(data => {
        const imagens = [data.sprites.front_default, data.sprites.front_shiny,
        data.sprites.back_default, data.sprites.back_shiny];
        imagemPokemon.src = imagens[x];

        botao.onclick = function () {
            if (x >= 3) {
                x = 0;
            } else {
                x++
            }
            imagemPokemon.src = imagens[x];
        }
    })