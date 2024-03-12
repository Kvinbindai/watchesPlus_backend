const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const service = require('../services')

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER_ADMIN,
        pass: process.env.MAIL_SECRETKEY
    }
})

// admin >> route admin
module.exports.confirmProductByadmin = catchError(async (req, res, next) => {
    const data = await service.mail.getEmailUser(+req.params.inventoryId)
    if (!data) createError('invalid inventoryId')
    const info = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${data.user.email}`,
        subject: `${data.watch.modelName} confirm add to inventory`,
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${data.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${data.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${data.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${data.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    })
    res.json({
        message: `Complete send email to ${data.user.email}`,
        data: info.messageId
    })
})

// seller
module.exports.sellSuccessfully = async (req, res, next) => {
    const data = await service.mail.getEmailUser(+req.params.inventoryId)
    if (!data) createError('invalid inventoryId')
    const info = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${data.user.email}`,
        subject: 'You have sold an item on the Community Market',
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${data.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${data.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${data.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${data.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    })
    res.json({
        message: `Complete send email to ${data.user.email}`,
        data: info.messageId
    })
}

// buyer
module.exports.buySuccessfully = async (req, res, next) => {
    const data = await service.mail.getEmailUser(+req.params.inventoryId)
    if (!data) createError('invalid inventoryId')
    const info = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${data.user.email}`,
        subject: 'Thank you for your Community Market purchase',
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${data.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${data.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${data.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${data.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    })
    res.json({
        message: `Complete send email to ${data.user.email}`,
        data: info.messageId
    })
}
module.exports.confirmProductByBuyer = async (req, res, next) => {
    const data = await service.mail.getEmailUser(+req.params.inventoryId)
    if (!data) createError('invalid inventoryId')
    const info = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${data.user.email}`,
        subject: 'Thank you for your confirm product',
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${data.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${data.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${data.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${data.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    })
    res.json({
        message: `Complete send email to ${data.user.email}`,
        data: info.messageId
    })
}
module.exports.cancelProductByBuyer = async (req, res, next) => {
    const data = await service.mail.getEmailUser(+req.params.inventoryId)
    if (!data) createError('invalid inventoryId')
    const info = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${data.user.email}`,
        subject: `${data.watch.modelName} be canceled`,
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${data.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${data.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${data.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${data.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    })
    res.json({
        message: `Complete send email to ${data.user.email}`,
        data: info.messageId
    })
}
