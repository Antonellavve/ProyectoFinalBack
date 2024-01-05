import mongoose from "mongoose";

export const conectarDB = async (): Promise<void>=>{
    try{
        const dbURL=process.env.DB_URL;
        if(!dbURL){
        throw new Error("La URL no esta definida conrrectamente");
        }
        await mongoose.connect(dbURL)
        console.log("Base de datos conectada");
        
    }catch(error){
        console.log(error);
        throw new Error ("Error en el momento de iniciar la base de datos");
    }
    
}