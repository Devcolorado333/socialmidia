# Configuração do Firebase - Serviço Social Internacional

## 1. Coleções do Firestore

### Criar as seguintes coleções no Firestore Database:

#### 📁 **categorias**
```json
{
  "id": "string",
  "nome": "string", 
  "ordem": "number",
  "descricao": "string"
}
```

#### 📁 **slides**
```json
{
  "id": "string",
  "titulo": "string",
  "conteudo": "string", 
  "imagemUrl": "string",
  "categoriaId": "string",
  "ordem": "number",
  "criadoEm": "timestamp",
  "atualizadoEm": "timestamp"
}
```

#### 📁 **usuarios**
```json
{
  "id": "string",
  "email": "string",
  "nome": "string",
  "tipo": "admin",
  "criadoEm": "timestamp"
}
```

## 2. Dados Iniciais para Popular

### Categorias (baseadas na apresentação PowerPoint):

1. **introducao** - "Introdução ao Serviço Social"
2. **estrutura** - "Estrutura Organizacional" 
3. **atribuicoes** - "Atribuições da Equipe"
4. **registros** - "Registros de Ações"
5. **alojamento** - "Alojamento"
6. **parcerias** - "Parcerias"
7. **acoes** - "Ações Realizadas"
8. **projetos** - "Projetos Futuros"
9. **consideracoes** - "Considerações Finais"

### Regras de Segurança do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública para categorias e slides
    match /categorias/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@internacional.com.br';
    }
    
    match /slides/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@internacional.com.br';
    }
    
    // Apenas admin pode acessar usuários
    match /usuarios/{document} {
      allow read, write: if request.auth != null && request.auth.token.email == 'admin@internacional.com.br';
    }
  }
}
```

## 3. Configuração do Authentication

1. Ativar Authentication
2. Ativar método "Email/senha"
3. Criar usuário administrador:
   - Email: admin@internacional.com.br
   - Senha: (definir uma senha segura)

## 4. Configuração do Storage

1. Ativar Storage
2. Configurar regras para upload de imagens:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /slides/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@internacional.com.br';
    }
  }
}
```

