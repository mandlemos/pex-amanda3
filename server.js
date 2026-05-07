const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (Essencial para carregar o index.html e CSS)
app.use(express.static(path.join(__dirname, '/')));

// Banco de Dados Simulado (Alinhado aos Temas de Desenvolvimento de Software do PEX)
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

// ROTA RAIZ: Necessária para a Vercel não dar o erro "Cannot GET /"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API: Listar chamados (Foco em Automação de Processos)
app.get('/api/servicos', (req, res) => {
    res.json(chamados);
});

// API: Criar novo chamado
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

// API: Atualizar Feedback (Trabalha a Soft Skill de Empatia com o Usuário)
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

// Configuração da Porta (Compatível com ambientes locais e Nuvem)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor do Sistema CAU rodando na porta ${PORT}`);
});

// EXPORTAÇÃO: Obrigatória para o funcionamento Serverless na Vercel
module.exports = app;