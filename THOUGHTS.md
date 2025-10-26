## Decisões técnicas

- O projeto foi criado com **Vite**, ferramenta de build moderna e leve.

- **Prettier** foi usado para auto-formatar o código, evitando discussões sobre estilo de código.

- **React Router** foi usado para implementar rotas. É uma solução simples e consagrada para SPAs em React.

- A funcionalidade de scroll infinito foi deixada como uma melhoria futura. Nesta primeira versão, optamos por criar um botão de "carregar mais", pois é uma solução mais simples e rápida.

- **React Query** foi usado para gerenciar as chamadas à API, cachear os resultados, e simplificar o código dos componentes que carregam dados da API (ele disponibiliza flags como `isLoading` e `isError` que indicam o estado da requisição).

- O uso do React Query para carregar os favoritos pode parecer desnecessário, pois essa informação é armazenada no `localStorage`. Mas o uso do React Query evita acessos repetidos ao `localStorage`, sem alterar a estrutura da aplicação. Além disso, ao usar `useMutation` em conjunto com `QueryClient.invalidateQueries`, a tela de Favoritos é atualizada automaticamente quando uma obra é removida dos favoritos. Sem React Query, seria necessário reestruturar a aplicação para implementar esse comportamento.

- **Vitest** foi usado como framework de testes, já que Jest não é suportado pelo Vite.

- **MSW** foi usado para fazer o mock das requisições à API nos testes. É uma solução consagrada que simplifica a criação dos mocks.

## Observações

Os requisitos desejáveis "Barra de busca com autocomplete" e "Filtro por departamento ou artista" não foram implementados porque a estrutura da API existente não é amigável para a implementação dessas funcionalidades.

O endpoint `/search` retorna apenas uma lista de `objectIDs` sem as informações de título, departamento, e artista, necessárias para a implementação do autocomplete e do filtro. Seria possível fazer uma requisição adicional para cada objeto (endpoint `/object/:objectID`) para obter essas informações, mas isso resultaria num grande número de requisições.

O ideal seria ter outra API que retornasse as informações já compiladas.

## Melhorias

- Substituir botão "carregar mais" por scroll infinito na lista de obras;
- Usar [zod](https://zod.dev/) para validar as respostas da API;
- Usar `ErrorBoundary`s para capturar erros não tratados;
- Implementar testes da `Home`.

## Checklist

### Funcionalidades Requeridas

1. **Listagem de obras com imagem:** ver [Home.tsx](src/pages/Home.tsx).
2. **Detalhes de obra:** ver [Item.tsx](src/components/Item.tsx).
3. **Favoritar obras:** ver [Item.tsx](src/components/Item.tsx).
4. **Listar favoritas:** ver [Favorites.tsx](src/pages/Favorites.tsx)
5. **Interface responsiva:** usando Tailwind, conforme especificado no [README](README.md).

### Requisitos Desejáveis

* **Barra de busca com autocomplete:** ver observação acima. Foi implementada uma barra de busca simples sem autocomplete, em [SearchForm.tsx](src/components/SearchForm.tsx).
* **Filtro por departamento ou artista:** ver observação acima. Foi implementado o filtro por departamento, em [SearchFilters.tsx](src/components/SearchFilters.tsx).
* **Animações com Framer Motion:** ver [Loading.tsx](src/components/Loading.tsx).
* **Dark mode:** ver [DarkModeToggle.tsx](src/components/DarkModeToggle.tsx).
* **Deploy** (ex: Vercel/Netlify para frontend, Render para backend): https://art-explorer-react-eomine.vercel.app/
