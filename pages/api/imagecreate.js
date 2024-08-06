import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import OpenAI from "openai";
import axios from "axios";

const bucketName = 'deepwallec2';
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT,
  apiKey: apiKey,
});

const client = new S3Client({
  region: 'us-east-2', // US East (Ohio) us-east-2
  credentials: {
    accessKeyId: process.env.ACCESSKEY_ID,
    secretAccessKey: process.env.SECRET_ACCESSKEY,
  },
});

export default async function handler(req, res) {
  try {
    const prompt = req.body.prompt;
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
    });
    const imageUrl = image.data[0].url;

    console.log("-----------------------------", image?.data);

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    const fileName = `user_generated${Date.now()}.jpg`;
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg'
      // ContentType: mime.lookup(file.path),
    }));
    const link = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

    if (link) {
      const ls = typeof window !== "undefined" ? window.localStorage : null;
      console.log('-----------------------------', link);

      ls?.setItem("lastgeneratedImage", link);
    }

    res.status(200).json({ url: link });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
