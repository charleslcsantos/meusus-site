# MeuSUS

Aplicação para busca de unidades de saúde do SUS em Salvador/BA.

## Sobre o Projeto

O MeuSUS é uma aplicação web que ajuda usuários a encontrarem unidades de saúde do Sistema Único de Saúde (SUS) a partir de buscas em linguagem popular. A aplicação utiliza uma API inteligente que interpreta semanticamente a busca do usuário e retorna unidades relevantes.

### Funcionalidades

- **Busca inteligente**: Use termos do dia a dia como "preventivo", "pé torcido", "raio x", "pediatra"
- **Interpretação da busca**: Veja como o sistema entendeu sua necessidade
- **Detalhes completos**: Acesse informações detalhadas de cada unidade
- **Foco em Salvador/BA**: Dados atualizados da cidade

## Stack Tecnológica

- **Frontend**: [Astro](https://astro.build/) v5.x
- **Integração React**: [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS (via CDN no layout)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Deploy**: Netlify
- **Backend**: Xano API

## Estrutura do Projeto

```
meu-sus/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── SearchBox.tsx    # Input de busca
│   │   ├── SearchExamples.tsx
│   │   ├── SearchResults.tsx
│   │   ├── UnitCard.tsx
│   │   ├── UnitDetail.tsx
│   │   ├── InterpretationCard.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/             # Layouts do Astro
│   │   └── Layout.astro     # Layout base
│   ├── lib/                 # Utilitários e API
│   │   ├── api.ts           # Integração com Xano
│   │   └── utils.ts         # Funções utilitárias
│   ├── types/               # Tipagens TypeScript
│   │   └── api.ts           # Tipos das APIs
│   └── pages/               # Páginas do site
│       ├── index.astro      # Página inicial
│       ├── busca.astro      # Resultados de busca
│       ├── unidade/
│       │   └── [id].astro   # Detalhe da unidade
│       └── 404.astro        # Página não encontrada
├── public/                  # Arquivos estáticos
├── astro.config.mjs         # Configuração do Astro
├── tsconfig.json            # Configuração do TypeScript
├── netlify.toml             # Configuração do Netlify
└── package.json
```

## APIs Disponíveis

Base URL: `https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx`

### 1. Busca de Unidades
```
GET /search?q=TERMO
```

**Exemplo de resposta:**
```json
{
  "query": "preventivo",
  "found": true,
  "interpretation": {
    "group": { "slug": "saude_mulher", "name": "Saúde da Mulher" },
    "intent": { "slug": "preventivo_rastreamento", "name": "Preventivo e Rastreamento" },
    "targets": [
      { "target_type": "specialty", "official_name": "Ginecologia", "weight": 0.93 }
    ]
  },
  "units": [
    {
      "id": 2,
      "cnes": "0003859",
      "name": "HOSPITAL GERAL ROBERTO SANTOS",
      "unit_type_name": "HOSPITAL GERAL",
      "district": "",
      "match_reason": "Matched specialty: Ginecologia"
    }
  ]
}
```

### 2. Detalhe da Unidade
```
GET /units/{id}
```

**Exemplo de resposta:**
```json
{
  "found": true,
  "unit": {
    "id": 1,
    "cnes": "0004073",
    "name": "HOSPITAL GERAL ERNESTO SIMOES FILHO",
    "unit_type_name": "HOSPITAL GERAL",
    "city_name": "SALVADOR",
    "state": "BA",
    "attends_sus": false,
    "is_active": true
  },
  "specialties": [{ "name": "Clínica Médica", "code": "" }],
  "services": [{ "name": "Atendimento Hospitalar", "code": "" }],
  "procedures": [{ "name": "Radiografia", "code": "" }]
}
```

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório** (ou copie os arquivos):
```bash
cd meu-sus
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente**:
```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário (a URL da API já está configurada).

4. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

5. **Acesse no navegador**:
```
http://localhost:4321
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Pré-visualiza build de produção |
| `npm run test` | Executa testes unitários em modo watch |
| `npm run test:coverage` | Executa testes com relatório de cobertura |
| `npm run lint` | Executa ESLint |
| `npm run lint:fix` | Executa ESLint e corrige problemas |
| `npm run typecheck` | Verifica tipos do TypeScript |

## Como Publicar na Netlify

### Opção 1: Deploy via CLI (Recomendado)

1. **Instale a CLI do Netlify** (globalmente):
```bash
npm install -g netlify-cli
```

2. **Faça login**:
```bash
netlify login
```

3. **Inicialize o projeto** (na primeira vez):
```bash
netlify init
```

4. **Deploy**:
```bash
netlify deploy --prod
```

### Opção 2: Deploy via Git (GitHub/GitLab/Bitbucket)

1. **Crie um repositório** no GitHub (ou outro serviço)

2. **Envie o código**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin SEU_REPOSITORIO
git push -u origin main
```

3. **No Netlify**:
   - Acesse [app.netlify.com](https://app.netlify.com)
   - Clique em "Add new site" → "Import an existing project"
   - Conecte seu repositório Git
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Clique em "Deploy site"

### Opção 3: Deploy Manual (Drag & Drop)

1. **Gere o build**:
```bash
npm run build
```

2. **Acesse o Netlify**:
   - Vá para [app.netlify.com](https://app.netlify.com)
   - Arraste a pasta `dist/` para a área indicada

### Configuração do Domínio Customizado

Para usar `meusus.com.br`:

1. **No Netlify**:
   - Vá em "Site settings" → "Domain management"
   - Clique em "Add custom domain"
   - Digite: `meusus.com.br`

2. **Na sua registradora de domínio**:
   - Configure os DNS records apontando para o Netlify:
   ```
   CNAME @ seu-site-netlify.netlify.app
   ```

3. **Aguarde a propagação** do DNS (pode levar até 48h)

## Configurações Importantes

### astro.config.mjs

```javascript
export default defineConfig({
  integrations: [react()],
  output: 'static',        // Gera site estático
  site: 'https://meusus.com.br',
  base: '/',
});
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

## Boas Práticas Implementadas

### Performance
- ✅ Site estático (SSG) para carregamento rápido
- ✅ Code splitting automático do Astro
- ✅ Lazy loading de componentes React
- ✅ Fontes otimizadas (Google Fonts)

### UX/UI
- ✅ Estados de loading claros
- ✅ Tratamento de erros amigável
- ✅ Feedback visual em interações
- ✅ Design responsivo (mobile-first)
- ✅ Acessibilidade (focus visible, semântica HTML)

### Código
- ✅ TypeScript para type safety
- ✅ Componentes reutilizáveis
- ✅ Separação de concerns (UI / lógica / API)
- ✅ Tratamento de erros robusto
- ✅ Código limpo e documentado

### SEO
- ✅ Meta tags dinâmicas por página
- ✅ Open Graph tags
- ✅ Sitemap (pode ser gerado)
- ✅ URLs amigáveis

## Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de build na Netlify
Verifique se o `netlify.toml` está correto e se o Node.js 18+ está configurado.

### API não responde
Verifique a URL da API em `astro.config.mjs` ou variável de ambiente `PUBLIC_API_BASE_URL`.

## Contribuição

Este é um MVP. Sugestões de melhorias:

- [ ] Filtros por bairro/distância
- [ ] Mapa com localização das unidades
- [ ] Sistema de favoritos
- [ ] Compartilhamento de unidades
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)

## Licença

MIT - Projeto de código aberto para facilitar o acesso à saúde pública.

---

**MeuSUS** - Feito com ❤️ para Salvador/BA