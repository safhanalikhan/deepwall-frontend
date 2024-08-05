import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { GeneratedProduct } from "@/models/GeneratedProducts";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name, email, city,
    postalCode, streetAddress, country,
    mongoIds,
    customIds
  } = req.body;
  await mongooseConnect();
  let productsIds = mongoIds;
  let customProductsIds = customIds;
  let uniqueIds = [...new Set(productsIds)];
  let customUniqueIds = [...new Set(customProductsIds)]; // this is uniqe customId
  let generatedProductsIds = []; // this is for mongo uniqe _id

  const mongoInfos = await Product.find({ _id: { $in: uniqueIds } });
  let customProductsInfos = await GeneratedProduct.find({ customId: { $in: customUniqueIds } });
  console.log('customProductsInfos =  -  = - >', customProductsInfos)
  if (customProductsInfos && customProductsInfos?.length > 0) {
    customProductsInfos = JSON.parse(JSON.stringify(customProductsInfos))
    customProductsInfos.map((i) => {
      customProductsIds.map(ci => {
        if (ci === i.customId) {
          generatedProductsIds.push(i._id)
        }
      })
    })
  }
  customUniqueIds = [...new Set(generatedProductsIds)]
  console.log('generatedProductsIds =  -  = - >', generatedProductsIds, 'customProductsIds', customUniqueIds)
  let allUniqueIds = [...uniqueIds, ...customUniqueIds]
  let allProductsIds = [...productsIds, ...generatedProductsIds]
  const productsInfos = [...mongoInfos, ...customProductsInfos]

  console.log('productsInfos =  -  = - >', allProductsIds)
  let line_items = [];
  for (const productId of allUniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = allProductsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }
  console.log('line_items ? ?  =  -  = - >', line_items)

  const orderDoc = await Order.create({
    line_items, name, email, city, postalCode,
    streetAddress, country, paid: false,
  });

  // const session = await stripe.checkout.sessions.create({
  //   line_items,
  //   mode: 'payment',
  //   customer_email: email,
  //   success_url: process.env.PUBLIC_URL + '/cart?success=1',
  //   cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
  //   metadata: { orderId: orderDoc._id.toString(), test: 'ok' },
  // });

  res.json({
    // url: session.url,
    message: "your order has placed successfully"
  })

}