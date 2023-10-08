import * as express from "express";
import {
    
    getDatabases,
    readData
    
} from "./connection";
import * as fs from "fs";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
import {Configuration, OpenAIApi} from "openai";

dotenv.config()

const app = express();
const router = express.Router();

const database = "reader_data"
const table = "my_book"

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    const host = req.body.hostname;
    const password = req.body.password;

    try {
        fs.writeFileSync(".env", `HOST="${host}"\nPASSWORD="${password}"`);
    } catch (err) {
        console.error(err);
    }

    try {
        const data = fs.readFileSync(".env", "utf-8");
        console.log({ data });
    } catch (err) {
        console.error(err);
    }

    dotenv.config();

    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {

    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

router.get("/api/database/:text", async (req,res) => {
   const text = req.params.text
   const configuration = new Configuration({
    apiKey: process.env.OPENAI,
   });
try{
    const openai = new OpenAIApi(configuration);
   const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
   });
   const embedding = response.data.data[0].embedding

    const sqlRes  = await readData({database, embedding})

    console.log('sqlRes', sqlRes)

}catch(error){
    console.error(error)
}

   
})

export default router;
