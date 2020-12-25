import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
const handler = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error,req,res){
        //エラーが発生した場合の処理
    },
    onNoMatch(req,res){
        //エンドポイントがない場合の処理
    },
}).use((req,res,next)=>{
    //ミドルウェアの処理を追加する
    //headerのAuthenticationでリクエストの認証をする
    //DBを接続する
})
export default handler