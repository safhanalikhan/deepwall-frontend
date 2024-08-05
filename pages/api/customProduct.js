import { GeneratedProduct } from "@/models/GeneratedProducts";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    console.log("san sa na na na nn", method);

    await mongooseConnect();
    // await isAdminRequest(req,res);
    if (method === "GET") {
        if (req.query?.id) {
            res.json(await GeneratedProduct.findOne({ _id: req.query.id }));
        } else {
            let result = await GeneratedProduct.find();
            console.log("haan g axa g", result);
            res.json(result);
        }
    }

    if (method === "POST") {
        const { title, description, price, images, category, properties, customId } =
            req.body;
        console.log('- - - = = = -- - >', req.body);
        const productDoc = await GeneratedProduct.create({
            title,
            description,
            price,
            images,
            category,
            properties,
            customId
        });
        res.json(productDoc);
    }

    if (method === "PUT") {
        const { title, description, price, images, category, properties, _id } =
            req.body;
        await GeneratedProduct.updateOne(
            { _id },
            { title, description, price, images, category, properties }
        );
        res.json(true);
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await GeneratedProduct.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}
