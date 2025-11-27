const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permite que o Vue acesse os dados

// Conexão com o banco do XAMPP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Padrão do XAMPP
    password: '',      // Senha vazia (Padrão do XAMPP)
    database: 'site_games'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
    } else {
        console.log('Conectado ao MySQL do XAMPP com sucesso!');
    }
});

// caminho para pegar as Notícias
app.get('/api/noticias', (req, res) => {
    // Busca as notícias e junta com o nome da categoria
    const sql = `
        SELECT n.*, c.nome as categoria_nome 
        FROM noticia n
        JOIN categoria c ON n.categoria_id = c.id
    `;
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

// caminho para pegar os Vídeos
app.get('/api/videos', (req, res) => {
    const sql = 'SELECT * FROM video';
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});