import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/sugestao', (req: Request, res: Response) => {
    const { nome, ingredientes } = req.query;
    if(!nome || !ingredientes) {
        return res.status(400).send('<h1>Nome e ingredientes são obrigatórios</h1>')
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
        </html>`
    )
});

router.get('/contato', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../views/contato.html'));
});

router.post('/contato', (req: Request, res: Response) => {                                            
    const { nome, email, assunto, mensagem } = req.body;
    if(!nome || !email || !assunto || !mensagem) {
        return res.status(400).send('<h1>Todos os campos são obrigatórios</h1>')
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
    `)
});

router.get('/api/lanches', (req: Request, res: Response) => {
    fs.readFile(path.join(__dirname, '../public/data/lanches.json'), 'utf-8', (err: Error | null, data: any) => {
        if (err) {
            res.status(500).json({error: 'Failed to read JSON file'})
        }
        res.json(JSON.parse(data))
    });
});

export default router;