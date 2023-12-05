import express from "express"
// import { Request, Response } from "express"
import { router } from "./routes";

const server = express();
const port = 3333;

server.use(express.json());
server.use(router)

// server.get('/', (request: Request, response: Response) => {
//     response.status(200).json({ message: 'Hello World!' })
// })

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})