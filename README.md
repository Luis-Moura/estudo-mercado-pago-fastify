<div align="center">
	<h1>🛒 Mercado Pago Fastify</h1>
	<p><em>Repositório de estudo: integração Mercado Pago + Fastify + TypeScript</em></p>
</div>

---

## Sobre o projeto

Este repositório é um exemplo didático para quem deseja aprender como integrar a API do Mercado Pago em aplicações Node.js usando o framework Fastify e TypeScript.

### Funcionalidades

- Criação de itens para pagamento
- Processamento de pagamentos via Mercado Pago
- Recebimento de notificações (webhooks)

> ⚠️ **Atenção:** Este projeto é apenas para fins de estudo. Não utilize em produção! Para produção lembre-se de acessar a documentação do mercado pago e configurar o webhook de maneira correta usando o secret, o webhook nesse projeto serve apeanas de exemplo

Documentação mercado pago: https://www.mercadopago.com.br/developers/pt/reference

---

## Estrutura

- `src/` — Código-fonte principal
  - `index.ts` — Inicialização do servidor Fastify
  - `integracao-mercado-pago.ts` — Lógica de integração com Mercado Pago
  - `item.ts` — Modelo de item para pagamento
- `.env` — Variáveis de ambiente (token e porta apenas)
  - Você deve criar uma integração no mercado paga para conseguir o token de ambiente de teste 

---

## Autor

Feito por **Luis Moura**
