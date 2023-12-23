import nodemailer from "nodemailer";

//configuracion de nodemailer para usar Gmail
//crear cuenta con verificacion en dos pasos
//crear el pass para aplicaciones
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "akikaa2024@gmail.com",
        pass: "qwufniuoqixzhyyn"
    },
    from: "akikaa2024@gmail.com"
})

export const sendEmail = async(to: string, code: string): Promise<void>=>{
    try {
        //configuramos los detalles del correo
        const mailOptions ={
            form: '"Akika" akikaa2024@gmail.com',
            to,
            subject: "Codigo de verificacion para tu cuenta",
            text: `Lllego tu codigo para Akika.
            El codigo para verificarte es : ${code}
            `
    }

        //enviar el correo 
        await transporter.sendMail (mailOptions);
        console.log('Correo electronico enviado');
        
    } catch(error){
        console.log('Error al enviar el correo alectronico');
        
    }
}
