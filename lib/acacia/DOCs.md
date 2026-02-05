---
# documentação da bilbioetca Acácia.
---

---

# BIBLIOTECA PRINCIPAL

A biblioteca principal `acacia.js` e `acacia.css` é responsável pelo fluxo de criação de uma aplicação Acácia com todas as suas funcionalidades

---


## Considerações Iniciais

## Criar uma aplicação

## Exibir e ocultar barras laterais, superior e inferior

## Configurar o menu lateral

## Soltar arquivos na aplicação

## Adicionar ícones ao menu superior

## Adicionar conteúdo ao APPVIEW

## Configurar o alinhamento do conteúdo no APPVIEW

## Utilizar a barra inferior

## Utilizar as barras laterais

## Usar Contêineres

## Usar Cartões

## Usar Texto

## Usar Formulários

## Usar Listas
    Listas são úteis...
* Item 1
* Item 1
* Item 1
    - Subitem 1
    - Subitem 1
    - Subitem 1
* Item 1
## Compact List
```
<compact-list>
    <list-item>
        <img src="/files/ret_branco.svg">
        <text-label>Item 01-901234567890</text-label>
    </list-item>
    <list-item>
        <img src="/files/ret_branco.svg">
        <text-label>Item 01-901234567890</text-label>
    </list-item>
</compact-list>
```

## Usar Grades

## Usar Tabelas

## Usar Guias

## Usar Modais

## Usar Tooltips, Popovers e Toasts

## Guia de efeitos visuais

## Guia de animações

## Utilizar o template de desktop

## Criar menus em aplicaçõe desktop nativas

## Utilizar a barra de status em aplicações desktop nativas

## Gerenciar páginas em aplicações desktop nativas

## Guia de implantação nativa para aplicações desktop

---

# MÓDULO RENDERER


O módulo Renderer `renderer.js` contém métodos e propriedades para renderização de interface gráfica web.

---

# MÓDULO CONTENT


O módulo Content `content.js` contém métodos e propriedades para manipulação e fluxo de conteúdo em diversos formatos.

---

# Content.IndexedDB

Esta biblioteca simplifica o uso do **IndexedDB** (banco de dados NoSQL do navegador) para operações básicas de CRUD (*Create, Read, Update, Delete*). Ela oferece métodos para criar tabelas, verificar registros, gravar dados, ler dados e remover registros.

---

## **Instalação**
Não é necessária instalação. Basta incluir o código JavaScript em seu projeto e usar os métodos via objeto `Content.IndexedDB`.

---

## **Inicialização**
Antes de usar, certifique-se de criar o banco de dados e a tabela (object store):

```javascript
// Cria o banco "MyDatabase" e a tabela "Users"
await Content.IndexedDB.New("MyDatabase", "Users");
```

---

## **Métodos Disponíveis**

### 1. **`New(dbName, tableName)`**
Cria um banco de dados e uma tabela (se não existirem).

| Parâmetro   | Tipo     | Descrição                  |
|-------------|----------|----------------------------|
| `dbName`    | `string` | Nome do banco de dados.    |
| `tableName` | `string` | Nome da tabela (object store). |

**Exemplo:**
```javascript
await Content.IndexedDB.New("MyDatabase", "Products");
```

---

### 2. **`Check(dbName, tableName, id)`**
Verifica se um registro com um `id` específico existe na tabela.

| Parâmetro   | Tipo     | Descrição                  |
|-------------|----------|----------------------------|
| `id`        | `string` ou `number` | ID do registro a ser verificado. |

**Retorno:**  
`true` se o registro existe, `false` caso contrário.

**Exemplo:**
```javascript
const exists = await Content.IndexedDB.Check("MyDatabase", "Users", 123);
console.log(exists); // true ou false
```

---

### 3. **`Write(dbName, tableName, data, id)`**
Grava ou atualiza um registro na tabela.

| Parâmetro   | Tipo     | Descrição                  |
|-------------|----------|----------------------------|
| `data`      | `any`    | Dados a serem armazenados. |
| `id`        | `string` ou `number` | ID do registro. |

**Retorno:**  
`true` em caso de sucesso.

**Exemplo:**
```javascript
await Content.IndexedDB.Write(
    "MyDatabase", 
    "Users", 
    { name: "João", age: 30 }, 
    123
);
```

---

### 4. **`Read(dbName, tableName, id)`**
Recupera os dados de um registro pelo ID.

| Parâmetro   | Tipo     | Descrição                  |
|-------------|----------|----------------------------|
| `id`        | `string` ou `number` | ID do registro. |

**Retorno:**  
Dados armazenados ou `undefined` se não existir.

**Exemplo:**
```javascript
const user = await Content.IndexedDB.Read("MyDatabase", "Users", 123);
console.log(user); // { name: "João", age: 30 }
```

---

### 5. **`Remove(dbName, tableName, id)`**
Remove um registro da tabela pelo ID.

| Parâmetro   | Tipo     | Descrição                  |
|-------------|----------|----------------------------|
| `id`        | `string` ou `number` | ID do registro a ser removido. |

**Retorno:**  
`true` em caso de sucesso.

**Exemplo:**
```javascript
await Content.IndexedDB.Remove("MyDatabase", "Users", 123);
```

---

## **Exemplo Completo (Fluxo CRUD)**
```javascript
// 1. Cria o banco e a tabela
await Content.IndexedDB.New("TasksDB", "Tasks");

// 2. Grava uma tarefa
await Content.IndexedDB.Write(
    "TasksDB", 
    "Tasks", 
    { title: "Comprar leite", completed: false }, 
    1
);

// 3. Verifica se a tarefa existe
const exists = await Content.IndexedDB.Check("TasksDB", "Tasks", 1);
console.log(exists); // true

// 4. Lê os dados da tarefa
const task = await Content.IndexedDB.Read("TasksDB", "Tasks", 1);
console.log(task.title); // "Comprar leite"

// 5. Remove a tarefa
await Content.IndexedDB.Remove("TasksDB", "Tasks", 1);
```

---

## **Tratamento de Erros**
Todos os métodos retornam uma `Promise`. Use `try/catch` para capturar erros:

```javascript
try {
    await Content.IndexedDB.Write("TasksDB", "Tasks", { ... }, 1);
} catch (error) {
    console.error("Erro ao gravar:", error);
}
```

---

## **Observações**
- **Suporte a Tipos de ID**: O `id` pode ser `string`, `number` ou outros tipos suportados pelo IndexedDB.
- **Armazenamento de Dados**: Os dados são armazenados como `{ id: ..., data: ... }` na tabela.
- **Compatibilidade**: Funciona em navegadores modernos (Chrome, Firefox, Edge).

---

Esta documentação cobre o uso básico da biblioteca. Para cenários avançados (transações complexas, índices), consulte a documentação oficial do [IndexedDB](https://developer.mozilla.org/pt-BR/docs/Web/API/IndexedDB_API).