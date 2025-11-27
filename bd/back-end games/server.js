const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Permite o Front falar com o Back

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURAÇÃO DO BANCO ---
// ⚠️ Verifique se a senha do seu root está certa!
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Se tiver senha no seu MySQL, coloque aqui
    database: 'site_games'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

// --- ROTA DE LOGIN ---
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Procura o usuário no banco
    const sql = "SELECT * FROM tb_usuarios WHERE email = ? AND senha = ?";
    
    db.query(sql, [email, senha], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length > 0) {
            // Achou o usuário!
            res.status(200).json({ mensagem: "Login realizado!", usuario: result[0].nome });
        } else {
            // Não achou ou senha errada
            res.status(401).json({ mensagem: "Email ou senha incorretos!" });
        }
    });
});
// --- ROTA DE CADASTRO (NOVA) ---
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o email já existe (opcional, mas bom)
    const sqlCheck = "SELECT * FROM tb_usuarios WHERE email = ?";
    db.query(sqlCheck, [email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            return res.status(400).json({ mensagem: "Email já cadastrado!" });
        }

        // Se não existe, cadastra
        const sqlInsert = "INSERT INTO tb_usuarios (nome, email, senha) VALUES (?, ?, ?)";
        db.query(sqlInsert, [nome, email, senha], (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});