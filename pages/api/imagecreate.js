import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import axios from "axios";

const bucketName = 'deepwallec2';
const openai = new OpenAI({
  organization: "org-2hSGZegpBX0l1lJCg3IhTQD8",
  project: "proj_yNDcuDtkdLxIpgdbAfsPOBkh",
  // apiKey: "sk-None-nrDia42AzpHSnyF56PvlT3BlbkFJEZeEwy5hKh587594EqoK", // user api
  apiKey: "sk-proj-k0SGseEsdEhLmfhLsRXhT3BlbkFJ6p9TgouyIm8lKZ82uL0Z",
});

const client = new S3Client({
  region: 'us-east-2', // US East (Ohio) us-east-2
  credentials: {
    accessKeyId: 'AKIAQ3EGTQPA5Z4BDBOX',
    secretAccessKey: "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",
  },
});
// const openai = new OpenAI({
//     organization: "org-2hSGZegpBX0l1lJCg3IhTQD8",
//     project: "$PROJECT_ID",
// });

export default async function handler(req, res) {
  // const token = 'sk-proj-1JCZ71cH2QVcuyAlzVVMT3BlbkFJmgMm6VOcVUCP9ROeWIxD'
  // const apiUrl = 'https://api.openai.com/v1/images/generations';
  // console.log("hello hi bye bye ", prompt);

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
    // const imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-2hSGZegpBX0l1lJCg3IhTQD8/user-JiqvUpeEXsQsCdm5czNC9Wtz/img-LQljSser91BTL52aEOqOQ9yz.png?st=2024-08-01T16%3A52%3A51Z&se=2024-08-01T18%3A52%3A51Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-08-01T05%3A12%3A58Z&ske=2024-08-02T05%3A12%3A58Z&sks=b&skv=2023-11-03&sig=2pe/3W7u4ECU5Ae%2BNQT3x62vGSitWGkOw02GYxjrD%2BI%3D";

    console.log("-----------------------------", image?.data);

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    // const filePath = path.join(process.cwd(), 'user_generated.jpg');
    // fs.writeFileSync(filePath, imageBuffer);
    // const fileContent = fs.readFileSync(filePath);
    const fileName = `user_generated${Date.now()}.jpg`;

    // fs.writeFileSync(filePath, imageBuffer);
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
      console.log('ls', ls)
      ls?.setItem("lastgeneratedImage", link);
    }

    // Upload the image to S3
    // const response = await axios.post(apiUrl, {
    //     prompt
    //   }, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   });

    // console.log("response.data image URL:", response.data.data[0].url);

    // const image = await openai.images.generate({
    //     model: "dall-e-2",
    //     prompt: prompt,
    //     n: 1,
    //     size: "1024x1024",
    // });
    // console.log('-----------------------------',image.data);

    res.status(200).json({ url: link });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }

  // const baseURL = 'https://api.openai.com/v1/dalle-2'
  // const response = await axios.post(baseURL, { description : prompt });
  // console.log(response.data);

  // const image = await openai.images.generate({
  //     model: "dall-e-2",
  //     prompt: prompt
  // });
  // // console.log(image.data);
  // const configuration = new Configuration({
  //     apiKey: token,
  // })
  // const openai = new OpenAiApi(configuration)
}
