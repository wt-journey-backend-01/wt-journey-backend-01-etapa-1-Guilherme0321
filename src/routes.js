"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/views/index.html'));
});
router.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    if (!nome || !ingredientes) {
        return res.status(400).send('<h1>Nome e ingredientes são obrigatórios</h1>');
    }
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Obrigado pela Sugestão!</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <header>
                    <h1>Obrigado pela sua sugestão!</h1>
                </header>
                <main>
                    <section>
                        <h2>Recebemos sua ideia de lanche:</h2>
                        <p><strong>Nome:</strong> ${String(nome)}</p>
                        <p><strong>Ingredientes:</strong> ${String(ingredientes)}</p>
                        <br>
                        <a href="/" class="btn-home">Sugerir outro lanche</a>
                    </section>
                </main>
                <footer>
                    <p>&copy; 2024 DevBurger. Todos os direitos reservados.</p>
                </footer>
            </body>
        </html>`);
});
router.get('/contato', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/../views/contato.html'));
});
router.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send('<h1>Todos os campos são obrigatórios</h1>');
    }
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <header>
                <h1>Mensagem Recebida!</h1>
                <p>Obrigado por entrar em contato, ${nome}.</p>
            </header>
            <main>
                <section>
                    <h2>Resumo da sua mensagem:</h2>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p>${mensagem}</p>
                    <br>
                    <a href="/" class="btn-home">Voltar para o Início</a>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 DevBurger. Todos os direitos reservados.</p>
            </footer>
        </body>
        </html>
    `);
});
router.get('/api/lanches', (req, res) => {
    fs_1.default.readFile(path_1.default.join(__dirname, '../public/data/lanches.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read JSON file' });
        }
        res.json(JSON.parse(data));
    });
});
exports.default = router;
