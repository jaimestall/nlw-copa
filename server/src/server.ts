import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

// instancia o prisma client para poder utilizar nas rotas
const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  // inicializa o fastify, exibindo no log (logger) o passo a passo do que está acontecendo na aplicação
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  // rota de contagem de bolões (polls)
  fastify.get("/polls/count", async () => {
    const pollsAmount = await prisma.poll.count();
    return { pollsAmount };
  });

  // rota de contagem de usuários (users )
  fastify.get("/users/count", async () => {
    const usersAmount = await prisma.user.count();
    return { usersAmount };
  });

  // rota de contagem de palpites (guesses)
  fastify.get("/guesses/count", async () => {
    const guessesAmount = await prisma.guess.count();
    return { guessesAmount };
  });

  // rota de criação de bolões (polls)
  // status code: 200, 201, 202... sucesso!
  fastify.post("/polls", async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    });
    const { title } = createPollBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    // criação do bolão
    await prisma.poll.create({
      data: {
        title,
        code,
      },
    });

    // envia resultado semântico 201 contendo mais informações do que o simples envio do código 200
    return reply.status(201).send({ title, code });
  });

  // define onde será a porta do localhost onde a aplicação será gerada
  await fastify.listen({ port: 3333 /*host: "0.0.0.0"*/ });
}

// executa a função de início da aplicação
bootstrap();
