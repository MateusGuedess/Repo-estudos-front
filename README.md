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
  * `beforeAll`: Executa uma única vez **antes** de todos os testes do bloco. Ideal para tarefas mais pesadas e que não mudam entre testes (ex: iniciar um servidor mock, conectar a um banco de dados de teste).
  * `beforeEach`: Executa **antes de cada** teste no bloco. Perfeito para tarefas que precisam ser "resetadas" a cada teste para garantir o isolamento (ex: renderizar o componente, limpar mocks).
  * `afterEach`: Executa **após cada** teste. Usado para limpeza (ex: `cleanup` de mocks, restaurar `spies`).
  * `afterAll`: Executa uma única vez **após** todos os testes do bloco (ex: fechar a conexão com o banco).

### 4\. Buscando Elementos (Queries)

A Testing Library oferece três famílias de queries, cada uma com um propósito diferente:

| Família | Comportamento se NÃO encontra | Comportamento se ENCONTRA | Uso |
| :--- | :--- | :--- | :--- |
| **`getBy...`** | 💥 Lança um erro (o teste falha) | Retorna o elemento | Para elementos que você **espera** que estejam na tela. |
| **`queryBy...`**| ✅ Retorna `null` | Retorna o elemento | Para verificar que um elemento **NÃO** está na tela. |
| **`findBy...`** | ⏳ Lança um erro (após timeout) | Retorna uma `Promise` que resolve com o elemento | Para elementos que aparecerão de forma **assíncrona**. |

### 5\. Mocks de API

Para testes que dependem de chamadas de rede, entendi que o **MSW (Mock Service Worker)** é a ferramenta mais recomendada e adotada pela comunidade atualmente, sendo uma alternativa mais moderna ao MirageJS.

## 💻 Aplicação Prática: Criando um Botão com TDD

Apliquei os conceitos acima para desenvolver um componente `Button`. Segui o fluxo Red/Green/Refactor:

1.  **Red**: Criei um teste para uma funcionalidade que ainda não existia (ex: "o botão deve renderizar com um texto"). O teste falhou.
2.  **Green**: Escrevi o código mínimo necessário no componente para fazer o teste passar.
3.  **Refactor**: Refatorei o código do componente e dos testes, mantendo os testes "verdes".

### Código do Teste Final

*No final do dia, cheguei a um conjunto de testes que validam a renderização e o comportamento de clique do botão.*

*Aqui você pode colar a imagem do seu código ou, melhor ainda, o bloco de código abaixo.*

```typescript
// Coloque o código do seu teste aqui para referência futura
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Button from './Button'; // Supondo o nome do arquivo

describe('Button Component', () => {
  test('should render the button with its children', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('should call onClick function when the button is clicked', async () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(buttonElement);
    
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  // Outros testes que você fez...
});
```

### Cobertura de Testes

*O processo de TDD me ajudou a garantir que toda a lógica implementada estivesse coberta por testes, resultando em 100% de coverage para este componente simples.*

\![Cobertura de Testes do Componente Button]([INSERIR IMAGEM DA COBERTURA AQUI])

## Próximos Passos

  * [ ] Testar interações mais complexas (formulários com input + botão).
  * [ ] Aprender a testar estados (ex: botão com estado de loading).
  * [ ] Iniciar a prática com mocks de API usando MSW.
  * [ ] Testar hooks customizados. Repo-estudos-front
