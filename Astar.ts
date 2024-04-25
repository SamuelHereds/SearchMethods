import * as fstream from "fs";

class Cidade {
  nome: string;
  distanciaFinal: number;
  fronteiras: Vizin[];

  constructor(nome: string, distanciaFinal: number) {
    this.fronteiras = [];
    this.nome = nome;
    this.distanciaFinal = distanciaFinal;
  }
  set setNome(nome: string) {
    this.nome = nome;
  }

  set setFronteiras(fronteiras: Vizin[]) {
    this.fronteiras = fronteiras;
  }

  set setDistanciaFinal(distanciaFinal: number) {
    this.distanciaFinal = distanciaFinal;
  }

  get getNome() {
    return this.nome;
  }

  get getDistanciaFinal() {
    return this.distanciaFinal;
  }
}
class Vizin  {
  cidadeAtual: Cidade;
  distanciaAteVz: number;

  constructor(cidade: Cidade, distanciaAteVz: number) {
    this.cidadeAtual = cidade;
    this.distanciaAteVz = distanciaAteVz;
  }
  get getCidadeAtual() {
    return this.cidadeAtual.nome;
  }
  get getDistanciaAteVz() {
    return this.distanciaAteVz;
  }
}

class Mapa {
  cidades: Cidade[];
  arquivoCidades: string;
  arquivoVizinhos: string;
  constructor() {
    this.arquivoCidades = fstream.readFileSync("dadosCidades.csv").toString();

    this.arquivoVizinhos = fstream.readFileSync("dadosCaminho.csv").toString();

    this.cidades = [];
  }
  set setCidades(cidades: Cidade[]) {
    this.cidades = cidades;
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

  criavizin = (arq: string, index: number) => {
    interface vizinstr {
      cidadeIdx: number;
      distancia: number;
    }
    let vizinhostr: vizinstr[] = [];

    let linha = arq.split("\n");
    let vizinhos = linha[index].split(";");

    let vizinho;
  
    if (vizinhos[1].search(",") === -1) {
      vizinho = vizinhos[0];
      vizinhostr.push({
        cidadeIdx: parseInt(vizinho),
        distancia: parseInt(vizinho),
      });
    } else {
      vizinho = vizinhos[1].split(",");
     
      for (let i = 0; i < vizinho.length; i++) {
        let viz = vizinho[i].split("/");
        vizinhostr.push({
          cidadeIdx: parseInt(viz[0]),
          distancia: parseInt(viz[1]),
        });
      }
    }
   
    return vizinhostr;
  };

  criaPais(arquivo: string) {
    let linhascity = arquivo.split("\n");

    for (let i = 1; i < linhascity.length - 1; i++) {
      let nomecity = linhascity[i].split(";")[0].toString();
      let distcity = parseInt(linhascity[i].split(";")[1]);

      this.cidades.push(new Cidade(nomecity, distcity));
    }
    return this.cidades;
  }
  carregaMapa = () => {
    this.criaPais(this.arquivoCidades);
    console.log(this.getCidades);
    
    this.getCidades.map((c, index) => {
      console.log(index);
      this.criavizin(this.arquivoVizinhos, index+1 ).forEach((v) => {
    
        c.fronteiras.push(new Vizin(this.getCidades[v.cidadeIdx-2 ], v.distancia));
      });
    });

  
  };
}
let mapa = new Mapa();

let csvizin = mapa.getArquivoVizinhos;
let csvcity = mapa.getArquivoCidades;
mapa.carregaMapa();
console.log(mapa.getCidades.filter((c) => c.getNome === "Oradea")[0].fronteiras.map((f) => f.getCidadeAtual + " " + f.getDistanciaAteVz));

