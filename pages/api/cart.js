import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  try {
    console.log('ids - - - - - - - > > > ', ids)
    const data = await Product.find({ _id: { $in: ids } })
    console.log('data - - - - - - - > > > ', data)
    res.status(200).json(data);
  }
  catch (error) {
    console.error(
      "Error in cart:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}