var botaoAdicionar = document.querySelector("#adicionar-paciente")
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault(); //bloquear comportamento padrão

    var form = document.querySelector("#form-adiciona");
    //extraindo informações do paciente do form
    var paciente = obtemPacienteDoFormulario(form);

    //cria a tr e a td do paciente
    var pacienteTr = montaTR(paciente);

    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    //colocar o paciente dentro da tabela
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
})

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro")
    ul.innerHTML = "";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
    /*
    var nome = form.nome.value;
    var peso = form.peso.value;
    var altura = form.altura.value;
    var gordura = form.altura.value;
    */
}

function montaTR(paciente) {
    //cria um paciente que é uma TR no html
    var pacienteTr = document.createElement("tr")
    //adicionar à classe pacientes
    pacienteTr.classList.add("paciente");
    //append child adiciona um filho(TD) como filho do pai(TR). 
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr
}

function montaTd(dado, classe) {
    var td = document.createElement("td")
    td.textContent = dado;
    td.classList.add(classe);

    return td;
    /*
    //criar 5 tds para inclusão
    var nomeTd = document.createElement("td")
    var pesoTd = document.createElement("td")
    var alturaTd = document.createElement("td")
    var gorduraTd = document.createElement("td")
    var imcTd = document.createElement("td")
    */
}

function validaPaciente(paciente) {

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido")
    }
    
    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida")
    } 

    if(paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco")
    }

    if(paciente.peso.length == 0){
        erros.push("O peso não podem ser em branco")
    }

    if(paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco")
    }
    return erros;
}
/*
titulo.addEventListener("click", function(){ //função anônima
    console.log("Olá eu fui clicado!")
});
*/
