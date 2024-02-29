const prisma = require("../config/prisma")
const {CustomError} = require('../config/error')

// =========================================== BASIC CRUD ===================================
module.exports.findUserByEmail = async (email) => await prisma.user.findUnique({ where : {email} })
module.exports.get = async (where) => await prisma.user.findUnique({ where })
module.exports.getAll = async () => await prisma.user.findMany()
module.exports.createUser = async (data) => {
        const foundUser = await this.findUserByEmail(data.email)
        if(foundUser) throw new CustomError('Email is already Created',"WRONG USER",400)
        return await prisma.user.create({ data })
    // await prisma.user.create({ data })
}
module.exports.changePasswordWithEmail = async (email, password) => await prisma.user.update({ where: { email }, data : {password } })
module.exports.update = async ({ id }, data) => await prisma.user.update({ where: { id }, data })
module.exports.delete = async ({ id }) => await prisma.user.delete({ where: { id } })

// =========================================== CUSTOM REPOSITORY ===================================


