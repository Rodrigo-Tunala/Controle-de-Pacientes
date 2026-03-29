# Sistema de Gerenciamento de Pacientes

Um sistema web para gerenciar informações de pacientes e seus atendimentos, desenvolvido com Node.js e SQLite.

## 📋 Sobre o Projeto

Este projeto é uma aplicação de controle de pacientes que permite:
- Cadastrar e listar pacientes
- Registrar atendimentos para cada paciente
- Armazenar informações de rotina e histórico médico
- Consultar dados através de uma API REST

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **SQLite3** - Banco de dados leve e portável
- **Nodemon** - Ferramenta para desenvolvimento com auto-restart

## 📦 Dependências

```json
{
  "express": "^5.2.1",
  "nodemon": "^3.1.14",
  "sqlite": "^5.1.1",
  "sqlite3": "^6.0.1"
}
```

## 🚀 Como Instalar e Executar

### Pré-requisitos
- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Instalação

1. **Clone ou baixe o projeto**
   ```bash
   cd ControleDePacientes
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor**
   ```bash
   npm run dev
   ```

O servidor iniciará na porta **3000** e estará acessível em `http://localhost:3000`

## 📡 API Endpoints

### GET `/`
Página inicial com instruções de uso.

**Resposta:**
```html
Sistema de Gerenciamento de Pacientes
Bem-vindo ao sistema!
use as rotas /pacientes e /pacientes/:id/atendimentos para acessar os dados dos pacientes e atendimentos.
```

### GET `/patients`
Retorna a lista de todos os pacientes cadastrados.

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "date_of_birth": "1990-01-01",
    "telephone": "11123456789",
    "address": "Rua A, 123",
    "routine": "injeção para diabetes"
  }
]
```

### GET `/patients/:id/services`
Retorna um paciente específico e seus atendimentos.

**Parâmetros:**
- `id` (número) - ID do paciente

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "id_service": 1,
    "date": "2024-03-28",
    "description": "Consulta de rotina",
    "evolution": "Paciente em bom estado",
    "observations": "Continuar medicação"
  }
]
```

**Erros:**
- `404` - Paciente não encontrado ou sem atendimentos

### POST `/patients/:id/services`
Cria um novo atendimento para um paciente específico.

**Parâmetros:**
- `id` (número) - ID do paciente

**Corpo da Requisição:**
```json
{
  "date": "2024-03-28",
  "description": "Consulta de rotina",
  "evolution": "Paciente em bom estado",
  "observations": "Prescrever novo medicamento"
}
```

**Resposta:**
```json
{
  "message": "Atendimento adicionado com sucesso"
}
```

### PUT `/patients/:id`
Atualiza os dados de um paciente específico.

**Parâmetros:**
- `id` (número) - ID do paciente

**Corpo da Requisição:**
```json
{
  "name": "João Silva Santos",
  "email": "joao@email.com",
  "address": "Rua B, 456",
  "phone": "11999999999"
}
```

**Resposta:**
```json
{
  "message": "Paciente atualizado com sucesso"
}
```

**Erros:**
- `404` - Paciente não encontrado

### PUT `/patients/:id/services/:service_id`
Atualiza um atendimento específico de um paciente.

**Parâmetros:**
- `id` (número) - ID do paciente
- `service_id` (número) - ID do atendimento

**Corpo da Requisição:**
```json
{
  "date": "2024-03-28",
  "description": "Consulta de revisão",
  "evolution": "Paciente apresenta melhora",
  "observations": "Agendar próxima consulta em 30 dias"
}
```

**Resposta:**
```json
{
  "message": "Atendimento atualizado com sucesso"
}
```

**Erros:**
- `404` - Atendimento não encontrado

### DELETE `/patients/:id`
Deleta um paciente específico do sistema.

**Parâmetros:**
- `id` (número) - ID do paciente

**Resposta:**
```json
{
  "message": "Paciente deletado com sucesso"
}
```

**Erros:**
- `404` - Paciente não encontrado

### DELETE `/patients/:id/services/:service_id`
Deleta um atendimento específico de um paciente.

**Parâmetros:**
- `id` (número) - ID do paciente
- `service_id` (número) - ID do atendimento

**Resposta:**
```json
{
  "message": "Atendimento deletado com sucesso"
}
```

**Erros:**
- `404` - Atendimento não encontrado

## 📊 Estrutura do Banco de Dados

### Tabela: patients
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER(PK) | Identificador único |
| name | TEXT | Nome do paciente |
| date_of_birth | TEXT | Data de nascimento |
| telephone | TEXT | Telefone para contato |
| address | TEXT | Endereço |
| routine | TEXT | Rotina ou tratamento |

### Tabela: services
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER(PK) | Identificador único |
| patient_id | INTEGER(FK) | Referência ao paciente |
| date | TEXT | Data do atendimento |
| description | TEXT | Descrição do atendimento |
| evolution | TEXT | Evolução do paciente |
| observations | TEXT | Observações adicionais |

## 📝 Dados Iniciais

O banco de dados é criado automaticamente com dados de exemplo:
- João Silva - Paciente com diabetes
- Maria Souza - Paciente com hipertensão

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com auto-restart
- `npm test` - Executa testes (não configurado no momento)

## 📝 Observações

- O banco de dados SQLite é criado automaticamente na primeira execução
- As tabelas são criadas automaticamente se não existirem
- A porta padrão é **3000** (pode ser alterada modificando a variável `PORT` em `server.js`)

## 🎓 Projeto de Aula

Este projeto faz parte do material didático de desenvolvimento web com Node.js.

---

**Desenvolvido com ❤️ para fins educacionais**
