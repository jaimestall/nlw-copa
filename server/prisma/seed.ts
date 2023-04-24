import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/jaimestall.png",
    },
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Example poll",
      code: "POLL12",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2023-05-16T18:01:02.408Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2023-05-18T18:01:02.408Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 0,
          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
