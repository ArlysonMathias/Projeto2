import express from "express"; //importanto a biblioteca do express
import path from "path";
const app = express(); // passando a biblioteca para a variavel 'app'
const port = 3000; //passando a porta usada para a variável por
const __dirname = path.resolve(path.dirname(""));

//setando a engine do ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // fazendo o js-back enxergar onde estão os arquivos de css e js
app.use(express.urlencoded({ extended: true })); // aqui é pra fazer com que o JSON receba os dados vindo do meu servidor
app.use(express.json());

const pokedex = [
  {
    id: 1,
    nome: "Cyndaquil ",
    tipo: "Fogo",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/155.png",
    descricao:
      "Cyndaquil se protege acendendo as chamas em suas costas. As chamas são vigorosas se o Pokémon estiver com raiva. No entanto, se estiver cansado, as chamas crepitam irregularmente com combustão incompleta.",
    altura: "0.5m",
    peso: "7.9kg",
    categoria: "Rato de fogo",
    habilidade: "chama",
    fraqueza: "Água, Terra, Pedra",
  },
  {
    id: 2,
    nome: "Totodile",
    tipo: "Água ",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/158.png",
    descricao:
      "Apesar da pequenez de seu corpo, as mandíbulas de Totodile são muito poderosas. Embora o Pokémon possa pensar que está apenas beliscando de brincadeira, sua mordida tem poder suficiente para causar ferimentos graves.",
    altura: "0.6m",
    peso: "9.5kg",
    categoria: "Mandíbula Grande",
    habilidade: "Torrente",
    fraqueza: "Grama, Elétrico",
  },
  {
    id: 3,
    nome: "Chikorita ",
    tipo: "Grama",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/152.png",
    descricao:
      "Na batalha, Chikorita agita sua folha para manter o inimigo afastado. No entanto, uma fragrância doce também emana da folha, acalmando o Pokémon em luta e criando uma atmosfera acolhedora e amigável ao redor.",
    altura: "0.9m",
    peso: "6.4kg",
    categoria: "folha",
    habilidade: "Superar",
    fraqueza: "fogo, veneno, inseto, gelo",
  },
];

let pokemon = undefined;

//Rotas

app.get("/", (req, res) => {
  // criando uma rota "/" e pedindo para renderizar o index
  res.render("index", { pokedex, pokemon });
});

//rota detalhes
app.get("/detalhes/:id", (req, res) => {
  let pokemon;
  pokedex.filter((element) => {
    if (element.id == req.params.id) {
      pokemon = element;
    }
  });

  console.log(pokemon);
  res.render("../views/detalhes", { pokemon });
});

app.get("/cadastro", (req, res) => {
  //essa rota renderiza a página de cadastro
  res.render("../views/cadastro");
});

app.post("/add", (req, res) => {
  // essa rota pega o formulário e envia
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);

  res.redirect("/");
});

app.listen(port);
