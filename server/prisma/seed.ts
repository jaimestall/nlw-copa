import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@doe.com",
      avatarUrl: "https://github.com/github-john-doe.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Exemple pool",
      code: "BOL123",
      ownerId: (await user).id,

      participants: {
        create: {
          userId: (await user).id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-04T12:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: (await user).id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}
main();
