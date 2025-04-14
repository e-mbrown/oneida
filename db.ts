import express, {Request, Response} from "express"
import cors from "cors"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
    const db = await open({
        filename: './oneida.db',
        driver: sqlite3.cached.Database
    })
    

    const getBlurb = async (name: string): Promise<JSON | undefined> => {
        let data: JSON | undefined
        try {
            data  = await db.get(`select * from oneida where call_name = "${name}"`)
            return data
        }
        catch (error) {
            console.error("error fetching blurb", error)
            throw error
        }
    }

    const app = express()
    const PORT = process.env.Port || 8000

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            success:true,
            message: "Api is workin"
        })
    })

    app.get("/blurb/:call", (req: Request, res: Response) => {
        const call = req.params["call"]
        console.log("Requested")
        getBlurb(call).then((val) =>{
            if (val == undefined){
                res.status(400).json({
                    success: false
                })
            }else {
                res.status(200).json({
                    success:true,
                    data: val
                })
            } 
        }
        )
    })

    app.listen(PORT, () => {
        console.log(`Watching on Port ${PORT}`)
    })
})()



