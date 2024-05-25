let numeroContador = 0
// ----------------------- DATA -----------------------------

let date = new Date()
let formato = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
}
let lastVisit = new Intl.DateTimeFormat("pt-BR", formato).format(date)
localStorage.setItem("lastVisit", JSON.stringify(lastVisit))



// ------------------ CONTADOR DE VISITAS --------------------
if (localStorage.getItem('Visits')) {
    let contador = JSON.parse(localStorage.getItem('Visits'))
    contador++
    localStorage.setItem("Visits", JSON.stringify(contador))
    numeroContador = contador
} else {
    let contador = 1
    localStorage.setItem("Visits", JSON.stringify(contador))
    numeroContador = contador
}


// ------------- ATUALIZANDO A PAGINA -----------------------
let texto = document.getElementById("updates")

texto.textContent = `Esta página foi visitada ${numeroContador} vezes. A última visita foi: ${lastVisit}`


//================= TO-DO LIST =========================
function adicionarTarefa(textoTarefa, textoDescricao) {

    const taskID = new Date().getTime();
    var borda = document.createElement('div');
    borda.className = "tarefas";
    var listText = document.createElement('h2');
    var listDescription = document.createElement('p');
    var btn = document.createElement('button');
    btn.className = "editButton"
    btn.id = "editButton"
    btn.setAttribute("title", "Editar tarefa");
    listText.textContent = textoTarefa;
    listDescription.textContent = textoDescricao;

    borda.id = taskID;
    borda.appendChild(btn);
    borda.appendChild(listText);
    borda.appendChild(listDescription);


    var todoList = document.getElementById('todo-list');
    todoList.appendChild(borda);
}

function salvarTarefas() {
    var tarefas = [];

    var tarefasHTML = document.querySelectorAll('.tarefas');
    tarefasHTML.forEach(function (tarefa) {
        var textoTarefa = tarefa.querySelector('h2').textContent;
        var textoDescricao = tarefa.querySelector('p').textContent;
        tarefas.push({ textoTarefa: textoTarefa, textoDescricao: textoDescricao });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    var tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (tarefas) {
        tarefas.forEach(function (tarefa) {
            adicionarTarefa(tarefa.textoTarefa, tarefa.textoDescricao);
        });
    }
}

document.getElementById('todo-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var inputTarefa = document.getElementById('input-tarefa');
    var textoTarefa = inputTarefa.value.trim();
    var inputDescricao = document.getElementById('input-descricao');
    var textoDescricao = inputDescricao.value.trim();

    if (textoTarefa !== '') {
        adicionarTarefa(textoTarefa, textoDescricao);

        salvarTarefas();

        inputTarefa.value = '';
        inputDescricao.value = '';
    }
});

//========== adicionar dialog para editar as tarefas =============
document.addEventListener('DOMContentLoaded', function () {
    carregarTarefas();

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('editButton')) {

            var tarefaElement = event.target.parentNode;
            var textoTarefa = tarefaElement.querySelector('h2').textContent;
            var textoDescricao = tarefaElement.querySelector('p').textContent;

            // Abre o diálogo
            var dialog = document.getElementById('editDialog');
            dialog.querySelector('#editTitulo').value = textoTarefa;
            dialog.querySelector('#editDescricao').value = textoDescricao;
            dialog.showModal();
        }
    });

    document.getElementById('cancelButton').addEventListener('click', function () {
        var dialog = document.getElementById('editDialog');
        dialog.close();
    });
});


function salvarEdicao() {
    // Edição da Tarefa ... 
    var dialog = document.getElementById('editDialog');
    dialog.close();
}
