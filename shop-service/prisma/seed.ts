import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  await prisma.user_Role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      label: "Admin"
    },
  })

  await prisma.user_Role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      label: "User"
    },
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
