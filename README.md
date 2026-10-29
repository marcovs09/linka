# Linka

Amostra interativa sobre **tecnologia e administração**.

## Como trocar a logo

Abra `js/config.js` e preencha o campo `LOGO_ID`:

```js
LOGO_ID: "SEU_ID_AQUI",
LOGO_TIPO: "drive",   // "drive" | "imgur" | "url" | "arquivo"
```

- `drive`: ID de um arquivo do Google Drive com acesso "qualquer pessoa com o link".
- `imgur`: ID da imagem no Imgur.
- `url`: link completo da imagem.
- `arquivo`: nome de um arquivo dentro da pasta `img/`.

## Como ver o site

Abra o `index.html` no navegador (ou use a extensão Live Server do VS Code).

## Estrutura

```
linka/
├── index.html
├── css/style.css
├── js/config.js   ← ID da logo aqui
├── js/main.js
└── README.md
```

## Roteiro

- [x] Passo 1 — Base, visual futurista e campo da logo
- [ ] Passo 2 — Pesquisa (gráfico 2018–2026 + mapa do Brasil)
- [ ] Passo 3 — Linha do tempo
- [ ] Passo 4 — Desenvolvimento de sites
- [ ] Passo 5 — Segurança digital (testador de senha)
- [ ] Passo 6 — IA
