const stripe = require('stripe')('sk_test_51IQn0BIQ4GGI940dNAXFDXQ4eKpoDb1R3r0dexDRozhAwjmc9Bu4I8rMjNsyJrbiNVLGGh2XCMv0MO4pE7aPByLd00rNuhATj1');
const store = require('../stores')
const response = require('../../network/utils/response')
const { addInvoice } = require('./invoices')
const { verifyCoupons, updateCoupons } = require('../controllers/coupons')

const { sendgridMail } = require('../../network/utils/sendgrid')
const { OrderGenerated, OrderGeneratedToUser } = require('../../network/templates')
const addOrder = async (req, res, next) => {
  try {
    const {
      details,
      companyId,
      userId,
      couponsId,
      code,
      address
    } = req.body


    /**
     * verify coupon that will use
     */
     await verifyCoupons(req, res, next)

    /**
 * Invoice add whit data required from order added
 */
    const dataInvoice = await addInvoice(req, res, next)

    const addOrder = {
      code,
      state: true,
      details,
      address,
      userId,
      companyId,
      couponsId,
      invoiceId: dataInvoice._id
    }

    /**
     * Orderd add whit data required
     */
    const dataOrder = await store.orders.addOrder(addOrder)
    const { _id } = dataOrder

    /**
     * Get data added
     */
    const getOrder = await store.orders.getOrder(_id)

    const detailsOrder = await getOrder.map(x => x.details)
    const orderReduce = await getOrder.reduce(x => x)
    delete orderReduce.details
    orderReduce.details = detailsOrder



    /**
    * Turn off coupon used
    */
    await updateCoupons(req, res, next)

    /**
    * Create stripe order TODO: create method in store
    */
    const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items: [
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: 'Stubborn Attachments',
                 images: ['https://i.imgur.com/EHyR2nP.png'],
               },
               unit_amount: 2000,
             },
             quantity: 1,
           },
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: 'Stubborn Attachments',
                 images: ['https://i.imgur.com/EHyR2nP.png'],
               },
               unit_amount: 2000,
             },
             quantity: 1,
           },
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: 'Stubborn Attachments',
                 images: ['https://i.imgur.com/EHyR2nP.png'],
               },
               unit_amount: 2000,
             },
             quantity: 1,
           },
         ],
         mode: 'payment',
         success_url: `success`,
         cancel_url: `cancel`,
       });

    const dataResult = {
      orderReduce,
      dataInvoice,
      //session
    }

    const emailToCompany = {
      to: orderReduce.company.email,
      subject: 'Orden Realizada',
      template: OrderGenerated('username', 'https://clusthers.com/', orderReduce, dataInvoice)
    }

    const emailToClient = {
      to: orderReduce.userEmail,
      subject: 'Pedido Realizado',
      template: OrderGeneratedToUser('username', 'https://clusthers.com/', orderReduce, dataInvoice)
    }

    Promise.all([
      await sendgridMail(emailToCompany),
      await sendgridMail(emailToClient)
    ]).catch(err => next(err))


    response.success(req, res, dataResult, 200)

  } catch (err) {
    next(err)
  }
}

const orderList = async (req, res, next) => {
  try {
    const { userId } = req.query

    const dataResult = await store.orders.orderList(userId)
    response.success(req, res, dataResult, 200)

  } catch (err) {
    next(err)
  }
}


const orderListCompany = async (req, res, next) => {
  try {
    const { companyId } = req.query

    const dataResult = await store.orders.orderListCompany(companyId)
    response.success(req, res, dataResult, 200)

  } catch (err) {
    next(err)
  }
}

module.exports = {
  addOrder,
  orderList,
  orderListCompany
}