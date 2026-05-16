const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
    return new PrismaClient();
};

if (!global.prismaGlobal) {
    global.prismaGlobal = prismaClientSingleton();
}

module.exports = global.prismaGlobal;
