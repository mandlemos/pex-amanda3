const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Banco de dados simulado com novos campos
let chamados = [
    { 
        id: 1, 
        servico: "Segurança da Informação", 
        tecnico: "Mariana Costa", 
        prazo: "2026-05-07", // Próximo ao dia atual (simulando alerta)
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

// Listar chamados
app.get('/api/servicos', (req, res) => res.json(chamados));

// Criar chamado
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

// Rota para Registrar Feedback (A sugestão 2)
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
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));