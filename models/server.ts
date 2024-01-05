import express, {Express} from "express";
import cors from "cors";
import { conectarDB } from "../database/config";
import authRoutes from "../routes/auth"
import ordersRoutes from "../routes/orders";
import productsRoutes from "../routes/products";
import categoryRoutes from "../routes/category"

export class Server {
    //especifico cada declaracion. Armo mi servidor
    app: Express;
    port: string|number|undefined;
    authPath: string;
    ordersPath : string;
    productsPath : string;
    categoryPath: string;

    constructor(){ 
//constructor es lo primero que se ejecuta a la hora de llamar a la clase
        this.app = express();
        this.port = process.env.PORT
        this.authPath = '/auth',
        this.ordersPath = '/orders',
        this.productsPath = "/products",
        this.categoryPath = "/category",
        this.conexionaDB();

        this.middlewares();

        this.routes()
    }
//conexion a BD
        async conexionaDB(): Promise<void>{
            await conectarDB();
        }
        
        
        middlewares(): void{
//siempre que pongo use hablo de middlewares.. son intermediarios
            this.app.use(cors());
//cors, medidas que va a permitir restringir solicitudes que 
//vengan de una url distinta de la que estan instanciado en nuestra api, medidas de
// seguridad no permitir solicitudes cruzadas
            this.app.use(express.json());
        }
        routes(): void {
            this.app.use(this.authPath, authRoutes);
            this.app.use(this.ordersPath, ordersRoutes);
            this.app.use(this.productsPath, productsRoutes);
            this.app.use(this.categoryPath, categoryRoutes);
        }
//funcion listen
        listen(): void {
            this.app.listen(this.port, ()=>{
                console.log(`Corriendo en el puerto ${this.port}`); //imprime con app.ts
                
            })
        }

    }
