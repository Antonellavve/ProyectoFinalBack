import nodemailer from "nodemailer";

const createTransporter = () => {
    const emailUser = process.env.EMAIL_USER;
    const emailAppPassword = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailAppPassword) {
        throw new Error("Falta configurar EMAIL_USER o EMAIL_APP_PASSWORD");
    }

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailUser,
            pass: emailAppPassword,
        },
    });
};

export const sendEmail = async(to: string, code: string): Promise<void>=>{
    try {
        const emailUser = process.env.EMAIL_USER;
        const transporter = createTransporter();

        //configuramos los detalles del correo
        const mailOptions ={
            from: `"Akika" <${emailUser}>`,
            to,
            subject: "Codigo de verificacion para tu cuenta",
            text: `Llego tu codigo para Akika.
            El codigo para verificarte es : ${code}
            `
    }

        //enviar el correo 
        await transporter.sendMail (mailOptions);
        console.log('Correo electronico enviado');
        
    } catch(error){
        console.error('Error al enviar el correo electrónico', error);
    }
}
