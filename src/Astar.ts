import * as fs from 'fs';
import * as path from 'path';

// Acessando o diretório do arquivo em um módulo ES usando import.meta.url
const dirname = path.dirname(new URL(import.meta.url).pathname);
// No Windows, o caminho incluirá uma barra à frente, que precisa ser removida
const correctedDirname = process.platform === 'win32' ? dirname.substring(1) : dirname;

// Utilizando os caminhos corrigidos para acessar os arquivos CSV
const dadosCidades = fs.readFileSync(path.join(correctedDirname, '../data/dadosCidades.csv'), 'utf-8');
const dadosCaminho = fs.readFileSync(path.join(correctedDirname, '../data/dadosCaminho.csv'), 'utf-8');

console.log("dados cidades:");
console.log(dadosCidades);
console.log("dados caminhos:");
console.log(dadosCaminho);

class Cidade {
  nome: string;
  distanciaFinal: number;
  fronteiras: Vizin[];

  constructor(nome: string, distanciaFinal: number, vizinhos: Vizin[]) {
    this.fronteiras = vizinhos;
    this.nome = nome;
    this.distanciaFinal = distanciaFinal;
  }
  get getNome() {
    return this.nome;
  }

  get getDistanciaFinal() {
    return this.distanciaFinal;
  }
}
class Vizin {
  cidadeAtual: Cidade;
  distanciaAteVz: number;

  constructor(cidadeAtual: Cidade, distanciaAteVz: number) {
    this.distanciaAteVz = distanciaAteVz;
    this.cidadeAtual = cidadeAtual;
  }
}

class Mapa {
  cidades: Cidade[];
  arquivoCidades: string;
  arquivoVizinhos: string;
  constructor() {
    this.cidades = [];
    this.arquivoCidades = fs.readFileSync(path.join(correctedDirname, '../data/dadosCidades.csv')).toString();
    this.arquivoVizinhos = fs.readFileSync(path.join(correctedDirname, '../data/dadosCaminho.csv')).toString();

  }
  get getCidades() {
    return this.cidades;
  }

  get getArquivoCidades() {
    return this.arquivoCidades;
  }
  get getArquivoVizinhos() {
    return this.arquivoVizinhos;
  }

  abreArquivo = (arq: string) => {
    let fs = require("fs");
    let csv = fs.readFileSync(arq).toString();
    return csv;
  };
  criavizin = (arq: string,index: number) => {
        
    interface vizinstr {
      cidadeIdx: number;
      distancia: number;
    }
    let vizinhostr: vizinstr[] = [];

    let linha = arq.split("\n");
    let vizinhos = linha[index].split(";");
    
    let vizinho;
    console.log(vizinhos[1].search(","));
    if(vizinhos[1].search(",") === -1 ){
    vizinho =  vizinhos[0];
    vizinhostr.push({ cidadeIdx: parseInt(vizinho), distancia: parseInt(vizinho) });
    }else{
      vizinho =  vizinhos[1].split(",");
      console.log(vizinho);
    for (let i = 0; i < vizinho.length; i++) {
      let viz = vizinho[i].split("/");
      vizinhostr.push({ cidadeIdx: parseInt(viz[0]), distancia: parseInt(viz[1]) });
    }
  }
    console.log(vizinhostr);
    return vizinhostr;
  }
  criaPais(arquivo: string) {


    var linhaslig = this.arquivoVizinhos.split("\n");
    let vizinhos =  linhaslig[0].split(";");
    let linhascity = this.arquivoCidades.split("\n");
     for (let i = 2; i < linhaslig.length; i++) {
       let linha = linhaslig[i].split(";");
  //     for (let j = )
    //   let vizin
 //       let cidade = new Cidade(linha[0], parseInt(linha[1]), []);
  //     let pais = new Pais(linha[0], linha[1], linha[2], linha[3]);
   //    paises.push(pais);
     }
 //    return paises;
  }
  carregaMapa = () => {
    let fs = require("fs");
    let csvCidade = this.abreArquivo("dadosCidades.csv");
    let csvVizin = this.abreArquivo("dadosCaminho.csv");
    let linhasCidade = csvCidade.split("\n");
    let cidades: Cidade[] = [];
    let vizinhos: Vizin[] = [];
    for (let i = 1; i < linhasCidade.length - 1; i++) {
      let linha = linhasCidade[i].split(";");
      // let cidade = new Cidade(linha[0], parseInt(linha[1]));
      //cidades.push(cidade);
    }
    this.cidades = cidades;
    console.log(
      "Mapa carregado com sucesso!\n" +
        this.cidades.map((c) => c.nome + "->" + c.distanciaFinal + "\n")
    );
  };
}
 let mapa = new Mapa();

 let csvizin = mapa.getArquivoVizinhos;
 console.log(csvizin);
console.log(mapa.criavizin(csvizin,1));

// let linhaslig = mapa.arquivoCidades.split("\n");
// console.log(linhaslig.length);
//new Mapa().carregaMapa();
