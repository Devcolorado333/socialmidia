# Serviço Social / Alojamento - Sport Club Internacional

Site institucional para apresentação do Departamento de Serviço Social e Alojamento do Sport Club Internacional.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Upload de Imagens**: Cloudinary
- **Deploy**: Vercel

## 📋 Funcionalidades

- ✅ Visualização de slides por categorias
- ✅ Sistema de navegação com abas
- ✅ Visualização individual de slides
- ✅ Painel de administração
- ✅ Upload de imagens
- ✅ Autenticação de administrador
- ✅ Design responsivo

## 🛠️ Configuração do Ambiente

### 1. Clone o repositório
```bash
git clone <repository-url>
cd servico-social-inter
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env.local` e preencha com suas credenciais:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Firebase e Cloudinary.

### 4. Execute o projeto
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── admin/             # Painel de administração
│   ├── slide/[id]/        # Páginas individuais de slides
│   └── page.tsx           # Página principal
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
└── types/                 # Tipos TypeScript
```

## 🔐 Painel de Administração

Acesse `/admin/login` para entrar no painel de administração.

## 🚀 Deploy no Vercel

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. Deploy automático a cada push

---

Desenvolvido com ❤️ para o Sport Club Internacional
