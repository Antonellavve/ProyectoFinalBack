import mongoose from "mongoose";

export const dbConnection = async (): Promise<void>=>{
    try{
        const dbURL=process.env.DB_URL;
        if(!dbURL){
        throw new Error("La URL no esta definida conrrectamente");
        }
        await mongoose.connect(dbURL)
        console.log("Base de datos online");
        
    }catch(error){
    console.log(error);
    throw new Error ("Error a la hora de iniciar la base de datos");
    }
    
}