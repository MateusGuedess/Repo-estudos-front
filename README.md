### **README.md (Versão Revisada do Dia 01)**

# 🚀 Meus Estudos de Testes em React - Dia 01

Este repositório documenta minha jornada de aprendizado sobre o ecossistema de testes modernos para aplicações React. O objetivo é criar um diário de bordo com os conceitos aprendidos e as aplicações práticas desenvolvidas.

No primeiro dia, o foco foi entender as ferramentas fundamentais e aplicar o ciclo **Red/Green/Refactor (TDD)** para desenvolver um componente de `Button` do zero.

## 📚 Conceitos Fundamentais Aprendidos

### 1\. O Ecossistema de Testes: As Peças do Quebra-Cabeça

Entendi como as principais ferramentas se encaixam para criar um ambiente de testes robusto:

  * **Ambiente de DOM Simulado (`happy-dom`, `jsdom`):** Criam um ambiente que simula um navegador, permitindo que os testes manipulem objetos como `document` e `window` sem a necessidade de abrir um browser real.
  * **Executor de Testes (`Vitest`, `Jest`):** São os orquestradores. Eles encontram os arquivos de teste, executam o código dentro deles, e nos apresentam os resultados de sucesso ou falha.
  * **Biblioteca de Renderização (`@testing-library/react`):** É a ferramenta que nos permite "renderizar" nossos componentes React no ambiente de DOM simulado e interagir com eles através de utilitários como `render` e `screen`.
  * **Biblioteca de Asserções/Verificadores (`@testing-library/jest-dom`):** Expande o executor de testes com "matchers" focados no DOM. É o que nos dá os superpoderes de verificação, como `.toBeInTheDocument()`, `.toBeDisabled()`, `.toHaveValue()`, entre outros.

### 2\. Interações do Usuário: `userEvent` vs `fireEvent`

Uma das lições mais importantes do dia.

  * **`fireEvent`**: Apenas dispara um evento específico (`fireEvent.click(button)` dispara *apenas* o evento de clique).
  * **`userEvent`**: Simula a interação completa de um usuário real. Por exemplo, `userEvent.click(button)` simula não apenas o clique, mas também os eventos de `hover`, `focus`, e as checagens que o navegador faria (como verificar se o botão está desabilitado).
    > **Regra de ouro:** Dar preferência **sempre** ao `userEvent` para garantir que os testes se assemelhem mais ao uso real da aplicação.

### 3\. Ciclo de Vida dos Testes (Hooks)

Aprendi a usar hooks para preparar e limpar o ambiente de teste, evitando repetição de código.

  * `describe`: Usado para agrupar testes em um "contexto", geralmente em torno de um componente ou funcionalidade.
  * `beforeEach`: Executa **antes de cada** teste no bloco. Perfeito para tarefas que precisam ser "resetadas" a cada teste para garantir o isolamento (ex: renderizar o componente, limpar mocks).
  * `afterEach`: Executa **após cada** teste. Usado para limpeza.
  * `beforeAll` / `afterAll`: Executam uma única vez antes/depois de todos os testes do bloco.

### 4\. Buscando Elementos (Queries)

A Testing Library oferece três famílias de queries, cada uma com um propósito diferente:

| Família | Comportamento se NÃO encontra | Comportamento se ENCONTRA | Uso |
| :--- | :--- | :--- | :--- |
| **`getBy...`** | 💥 Lança um erro (o teste falha) | Retorna o elemento | Para elementos que você **espera** que estejam na tela. |
| **`queryBy...`**| ✅ Retorna `null` | Retorna o elemento | Para verificar que um elemento **NÃO** está na tela. |
| **`findBy...`** | ⏳ Lança um erro (após timeout) | Retorna uma `Promise` | Para elementos que aparecerão de forma **assíncrona**. |

### 5\. Mocks de API

Entendi que o **MSW (Mock Service Worker)** é a ferramenta mais recomendada pela comunidade para testes que dependem de chamadas de rede.

## 💻 Aplicação Prática: Criando um Botão com TDD

Apliquei os conceitos acima para desenvolver um componente `Button` simples. Segui o fluxo Red/Green/Refactor, começando pelos testes e depois criando a implementação mínima para fazê-los passar.

### Código do Componente

Este foi o componente `Button` inicial criado.

```typescript
// src/components/button/button.component.tsx

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick}>{children}</button>
  );
}

export default Button;
```

> **💡 Nota de Refatoração:** Assim como no componente `Input` do Dia 02, este botão pode ser melhorado para aceitar todas as propriedades de um `<button>` nativo (como `type`, `disabled`, etc.) usando `React.ComponentProps<'button'>`. Isso o tornaria muito mais flexível\!

-----

### Código do Teste

Este é o conjunto de testes final para o componente, refletindo as boas práticas aprendidas.

```typescript
// src/components/button/button.test.tsx

import { render, screen } from "@testing-library/react";
import Button from "./button.component";
import userEvent from "@testing-library/user-event"; // Corrigido para importação padrão
import { vi } from "vitest";

describe("Button component", () => {
  let mockedOnClick: () => void;

  beforeEach(() => {
    mockedOnClick = vi.fn();
    render(<Button onClick={mockedOnClick}>Test Button</Button>);
  });

  test('Should render the button', () => {
    // É uma boa prática buscar botões pela sua "role" (função) acessível,
    // pois é como usuários (e leitores de tela) o identificam.
    const buttonElement = screen.getByRole('button', { name: /test button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('Should call onClick when clicked', async () => {
    const buttonElement = screen.getByRole('button', { name: /test button/i });
    
    // Simula um clique de usuário real
    await userEvent.click(buttonElement);
    
    // Verifica se a função mock foi chamada exatamente uma vez
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
```

## Próximos Passos

  * [ ] Testar interações mais complexas (formulários com input + botão).
  * [ ] Aprender a testar estados (ex: botão com estado de loading).
  * [ ] Iniciar a prática com mocks de API usando MSW.
  * [ ] Testar hooks customizados.

# 🚀 Meus Estudos de Testes em React - Dia 02

No segundo dia da jornada, o foco foi em criar componentes React flexíveis e totalmente tipados com TypeScript, e em estruturar os mocks de API com MSW de uma forma modular e escalável, preparando o terreno para aplicações mais complexas.

## \#\# Componentes Tipados e Testáveis ⌨️

A primeira etapa foi a criação de um componente de `Input` genérico, capaz de aceitar todas as propriedades de um input HTML nativo, garantindo flexibilidade e um bom reuso.

### \#\#\# Criando o Componente `Input`

Utilizei um padrão de tipagem poderoso do TypeScript com `React.ComponentProps` para estender todas as propriedades nativas de um `<input>`. Isso evita a necessidade de declarar manualmente cada atributo como `onChange`, `placeholder`, `type`, etc.

```typescript
// src/components/input/input.component.tsx

type CustomInputProps = {
  // Aqui poderiam entrar props customizadas no futuro
}

// O tipo final combina todas as props de um <input> com as nossas props customizadas
type InputProps = React.ComponentProps<'input'> & CustomInputProps;

function Input({ ...props }: InputProps) {
  return <input data-testid="input" {...props} />;
}

export default Input;
```

-----

### \#\#\# Testando o Componente `Input`

Para garantir que o componente se comporta como esperado, criei uma suíte de testes que valida três cenários principais:

1.  Se o componente é renderizado corretamente.
2.  Se a função `onChange` é disparada quando o usuário digita.
3.  Se o valor do input (`value`) é atualizado conforme a digitação.

Utilizei o **`userEvent`** para simular a interação do usuário de forma realista.

```typescript
// src/components/input/input.test.tsx

import { render, screen } from "@testing-library/react";
import Input from "./input.component";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe('Input component', () => {
  let mockedOnChangeInput: () => void;
  beforeEach(() => {
    mockedOnChangeInput = vi.fn();
    render(<Input onChange={mockedOnChangeInput} type="text" placeholder="Test Input" />);
  });

  test('Should render Input', () => {
    const input = screen.getByPlaceholderText("Test Input");
    expect(input).toBeInTheDocument();
  });

  test('Should trigger onChange', async () => {
    const input = screen.getByPlaceholderText("Test Input");
    await userEvent.type(input, "test input"); // 10 caracteres
    expect(mockedOnChangeInput).toBeCalledTimes(10);
  });

  test('Should have Value', async () => {
    const input = screen.getByPlaceholderText("Test Input");
    await userEvent.type(input, "test input");
    expect(input).toHaveValue("test input");
  });
});
```

-----

## \#\# Estrutura de Mock Escalável com MSW  मॉक

Para organizar os mocks da API, adotei uma arquitetura modular que separa as responsabilidades, tornando a manutenção e a adição de novos endpoints muito mais simples.

O fluxo é o seguinte: **Resolver** (lógica de dados) -\> **Middleware** (lógica de auth) -\> **Handler do Endpoint** -\> **Handler Global** -\> **Setup do Servidor**.

### \#\#\# 1. Resolvers

Os resolvers são funções puras responsáveis por retornar a resposta de sucesso de um endpoint (o "caminho feliz").

```typescript
// mock/resolvers/companyResolvers.ts

import { HttpResponse } from "msw";

export function getCompanyResolver() {
  return HttpResponse.json({ name: "UOL", /* ... */ });
}
```

-----

### \#\#\# 2. Middleware com HOF

Criei uma Higher-Order Function (HOF) `withAuth` que funciona como um middleware. Ela "embrulha" um resolver para verificar a autenticação antes de executar a lógica principal. Isso centraliza o controle de acesso e mantém os resolvers limpos.

```typescript
// mock/middleware/middleware.ts

import { type DefaultBodyType, HttpResponse, type HttpResponseResolver, type PathParams } from "msw";

export const withAuth = <...>(resolver: HttpResponseResolver<...>): HttpResponseResolver<...> => {
  return (req) => {
    const FAKE_TOKEN = "Bearer FAKE_AUTH_TOKEN";
    const authHeader = req.request.headers.get("Authorization");

    if (authHeader !== FAKE_TOKEN) {
      return new HttpResponse(null, { status: 401, statusText: "Not authorized" });
    }

    return resolver(req);
  };
};
```

-----

### \#\#\# 3. Handlers Modulares

Cada "feature" da API (como `company`, `user`, etc.) tem seu próprio arquivo de handler. Ele combina o endpoint, o middleware e o resolver.

```typescript
// mock/handlers/company.ts

import { http } from "msw";
import { getCompanyResolver } from "../resolvers/companyResolvers";
import { withAuth } from "../middleware/middleware";

export const companyHandlers = [
  http.get("https://api.plan.com/company/1", withAuth(getCompanyResolver)),
];
```

-----

### \#\#\# 4. Agregação e Setup do Servidor

Finalmente, um arquivo `handlers.ts` central importa e agrega todos os handlers modulares, e um arquivo `node.ts` usa essa lista para configurar o servidor de mock que será usado nos testes.

```typescript
// mock/handlers.ts
import { companyHandlers } from "./handlers/company";
export const handlers = [...companyHandlers];

// mock/node.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers);
```

## \#\# Próximos Passos 🎯

O trabalho feito neste dia estabeleceu uma base sólida e escalável tanto para a criação de componentes quanto para o mock de APIs. Nos próximos dias, planejo refinar e melhorar ainda mais essa estrutura antes de mergulhar de cabeça no desenvolvimento orientado a testes (TDD) de novas funcionalidades.
