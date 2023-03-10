const questoes = [
    {
        pergunta : "Qual a capital do Brasil",
        opcoes : ["São Paulo", "Rio de Janeiro", "Brasília", "Acre", "Pará"],
        resposta : "Brasília"
    },
    {
        pergunta : "Qual a capital do Canadá",
        opcoes : ["Toronto", "Vancouver", "Quebec", "Ottawa", "Labrador"],
        resposta : "Ottawa"
    },
    {
        pergunta : "Qual a capital da Austrália",
        opcoes : ["Adelaide", "Melbourne", "Camberra", "Sydney", "Brisbane"],
        resposta : "Camberra"
    },
    {
        pergunta : "Qual a capital do Bélgica",
        opcoes : ["Ghent", "Bruges", "Antuérpia", "Leuven", "Bruxelas"],
        resposta : "Bruxelas"
    },
    {
        pergunta : "Qual a capital da Noruega",
        opcoes : ["Bergen", "Oslo", "Stavanger", "Trondheim", "Alesund"],
        resposta : "Oslo"
    }
]

const pegaPergunta = pergunta =>{
    const item = $('<h4>').addClass('pergunta').text(`${pergunta} ?`)
    $('main').append(item)
}

const pegaNumeroQuestao = opcoes =>{
    let numero
    questoes.forEach(questao =>{
        if(JSON.stringify(questao.opcoes) === JSON.stringify(opcoes)){
            numero = questoes.indexOf(questao) + 1
        }
    })
    return numero
}

const pegaOpcoes = opcoes =>{
    const secao = $('<section>').addClass('opcao')
    const numero = pegaNumeroQuestao(opcoes)

    opcoes.forEach(opcao =>{
        secao.append(`
        <label>
            <input type="radio" 
            value =${opcoes.indexOf(opcao)} 
            name="questao${numero}">
            ${opcao}
        </label>
        <br>
        `)
    })

    $('main').append(secao)
}

const criaQuestao = posicao =>{
    const pergunta = questoes[posicao].pergunta
    const opcoes = questoes[posicao].opcoes
    pegaPergunta(pergunta)
    pegaOpcoes(opcoes)
}

mostraQuestoes = ()=>{
    for(let i = 0 ; i < questoes.length; i++){
        criaQuestao(i)
    }
}

mostraQuestoes()

const pegaRespostaUsuario = e =>{
    const input = e.target
    let infoResposta = []
    
    if(input.checked){
        const nomeInput = input.name
        const respostaUsuario = (input.parentNode.innerText).trim()
        const numeroQuestao = nomeInput.charAt(nomeInput.length - 1)
        
        infoResposta.push(numeroQuestao)
        infoResposta.push(respostaUsuario)
        return infoResposta
    }
}

const removeClasse = (elemento,classe) =>{
    setTimeout(()=>{
        elemento.classList.remove(classe)
    },2000)
}

const desmarcaOpcao = input =>{
    setTimeout(()=>{
        input.checked = false
    },2000)
} 

const corrigeResposta = (e,posicao,resposta)=>{
    const label = e.target.parentNode
    
    if(questoes[posicao].resposta === resposta){
        label.classList.add('certo')
        removeClasse(label,'certo')
        
    }
    else{
        label.classList.add('errado')
        removeClasse(label,'errado')
    }

    const input = e.target
    desmarcaOpcao(input)
}

const verificaResposta = e =>{
    const infoResposta = pegaRespostaUsuario(e)
    if(infoResposta){
        const numeroQuestaoArray = infoResposta[0] - 1
        const respostaUsuario = infoResposta[1]
        corrigeResposta(e,numeroQuestaoArray,respostaUsuario)
    }
}

$('main').click(verificaResposta)





