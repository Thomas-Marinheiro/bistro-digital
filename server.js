const express = require("express");
const app = express();
const path = require("path");
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "/")));

// Endpoint simples para o menu
app.get("/api/menu", (req, res) => {
  // Em uma aplicação real, isso viria de um banco de dados
  const menuItems = [
    { id: 1, name: "Burrata Especial", category: "entradas", price: 45.0 },
    { id: 2, name: "Bruschetta de Parma", category: "entradas", price: 38.0 },
    { id: 3, name: "Risoto de Cogumelos", category: "principais", price: 68.0 },
    { id: 4, name: "Salmão Grelhado", category: "principais", price: 75.0 },
    { id: 5, name: "Filé au Poivre", category: "principais", price: 82.0 },
    { id: 6, name: "Tiramisu Clássico", category: "sobremesas", price: 28.0 },
    {
      id: 7,
      name: "Cheesecake de Frutas Vermelhas",
      category: "sobremesas",
      price: 26.0,
    },
    { id: 8, name: "Vinho Tinto Reserva", category: "bebidas", price: 120.0 },
    {
      id: 9,
      name: "Drink de Frutas Tropicais",
      category: "bebidas",
      price: 32.0,
    },
  ];
  res.json(menuItems);
});

// Endpoint simples para pedidos
app.post("/api/pedido", (req, res) => {
  const pedido = req.body;
  console.log("Novo pedido recebido:", pedido);
  res
    .status(201)
    .json({
      message: "Pedido recebido com sucesso!",
      pedidoId: Math.floor(Math.random() * 1000),
    });
});

app.listen(port, () => {
  console.log(`Servidor do Bistrô Digital rodando em http://localhost:${port}`);
});
