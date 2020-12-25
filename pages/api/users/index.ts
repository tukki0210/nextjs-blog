import { NextApiRequest, NextApiResponse } from 'next'
import handler from '../handler'

// const handler = (req: NextApiRequest, res: NextApiResponse ) => {
//     switch(req.method){
//         case 'GET':{
//             res.status(200).json(result)
//             break
//         }
//         case 'PUT':{
//             res.status(200).json(result)
//             break
//         }
//         default: {
//             res.setHeader('Allow',['GET'],['PUT'])
//             res.status(405).json({ message: `Method ${method} Not Allowed`})
//         }
//     }
// }
const data = "Hello"

export default handler
    .get(async (req, res) => {
        // GETの処理
        res.json({
            message: 'Hello!'
        })
    })
    .post(async (req, res) => {
        // POSTの処理
        res.json(data)
    })