const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// AJUSTE: Servindo arquivos estáticos de forma compatível com Vercel
app.use(express.static(path.join(__dirname, '/')));

// Banco de dados simulado (Baseado nos temas de Desenvolvimento de Software e Integração)
let chamados = [
    { 
        id: 1, 
        servico: "Segurança da Informação", // Tema 4 do roteiro
        tecnico: "Mariana Costa", 
        prazo: "2026-05-07", 
        status: "Em Andamento", 
        cliente: "Banco Nacional",
        feedback: null,
        nota: null,
        criadoEm: new Date().toISOString()
    },
    { 
        id: 2, 
        servico: "Infraestrutura de Redes e Cloud", 
        tecnico: "Ricardo Alves", 
        prazo: "2026-05-25", 
        status: "Em Aberto", 
        cliente: "Indústrias Arpia",
        feedback: null,
        nota: null,
        criadoEm: new Date().toISOString()
    }
];

// NOVA ROTA: Necessária para a Vercel carregar o seu Frontend (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API: Listar chamados (Tema: Automação de Processos)
app.get('/api/servicos', (req, res) => res.json(chamados));

// API: Criar chamado
app.post('/api/servicos', (req, res) => {
    const novo = { 
        id: chamados.length + 1, 
        ...req.body, 
        criadoEm: new Date().toISOString(),
        feedback: null,
        nota: null 
    };
    chamados.push(novo);
    res.status(201).json(novo);
});

// API: Registrar Feedback (Soft Skill: Empatia e Consciência Social)
app.put('/api/servicos/:id/feedback', (req, res) => {
    const { id } = req.params;
    const { nota, feedback } = req.body;
    const index = chamados.findIndex(s => s.id == id);
    if (index !== -1) {
        chamados[index].nota = nota;
        chamados[index].feedback = feedback;
        chamados[index].status = "Concluído";
        res.json(chamados[index]);
    } else {
        res.status(404).send("Serviço não encontrado");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Exportar para funcionamento Serverless na Vercel
module.exports = app;