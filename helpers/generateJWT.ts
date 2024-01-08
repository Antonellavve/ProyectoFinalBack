import jwt from "jsonwebtoken";

const generateJWT = (id: string = ""): Promise<string> =>{
    return new Promise ((res, rej)=>{
        const payload = {id}; //para generar ese token , 
        //lo hacemos apartir de una informacion del user, que en este caso es el id
        jwt.sign(
            payload,
            process.env.CLAVESECRETA as string,
            {
                expiresIn: "4h",
            },
            (err: Error|null, token: string |undefined)=>{
                if (err){
                    console.log(err);
                    rej('No se pudo generar el token')
                }else{
                    res(token as string);
                }
            }
        )
    })
}

export default generateJWT
