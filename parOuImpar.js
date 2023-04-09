// exercicio 3
// versão do par ou impar

const parOuImpar = process.argv[2]
const numero = Number(process.argv[3])

// função para se escolher um numero aleatorio entre os que serão passados como argumento na chamada da função
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  const numeroAdversario = getRndInteger(0, 10)


const resultado = numero + numeroAdversario

if(parOuImpar === "par" && resultado % 2 ===0) {

    console.log(`1- o jogador escolheu par e o numero ${numero} o adversario escolheu impar e o numero ${numeroAdversario} o resultado é ${resultado}, parabens jogador voce ganhou`)

}else if(parOuImpar === "impar" && resultado % 2 !== 0){
    console.log(`2- o jogador escolheu impar e o numero ${numero} o adversario escolheu par e o numero ${numeroAdversario} o resultado é ${resultado}, parabens jogador voce ganhou`)

}else if(parOuImpar === "par" && resultado % 2 !== 0){
    console.log(`3 - o jogador escolheu par e o numero ${numero} o adversario escolheu impar e o numero ${numeroAdversario} o resultado é ${resultado}, infelizmente voce perdeu jogador`)

}else {
    console.log(`4 - o jogador escolheu impar e o numero ${numero} o adversario escolheu par e o numero ${numeroAdversario} o resultado é ${resultado}, infelizmente vc perdeu jogador`)
}

// versão pedra papel e tesoura

// const opcoes = ["pedra", "papel", "tesoura"]
// const escolhaJogador = process.argv[2]
// const escolhaAdversario = opcoes[getRndInteger(0,2)]

// if(escolhaJogador === "pedra" && escolhaAdversario === "tesoura" || escolhaJogador === "tesoura" && escolhaAdversario === "papel" || escolhaJogador === "papel" && escolhaAdversario ==="pedra"){
//     console.log(`jogador escolheu ${escolhaJogador} e adversario escolheu ${escolhaAdversario}, jogador ganhou`)

// }else if(escolhaJogador === "pedra" && escolhaAdversario === "papel" || escolhaJogador === "tesoura" && escolhaAdversario === "pedra" || escolhaJogador === "papel" && escolhaAdversario ==="tesoura" ){
//     console.log(`jogador escolheu ${escolhaJogador} e adversario escolheu ${escolhaAdversario}, jogador perdeu`)


// }else{
//     console.log(`jogador escolheu ${escolhaJogador} e adversario escolheu ${escolhaAdversario}, jogo empatado`)

// }