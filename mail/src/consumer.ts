import amqp from "amqplib"
import nodemailer from "nodemailer"
import dotenv from 'dotenv'


dotenv.config();


export const startSendOtpConsumer = async()=>{

    try{ 
      
        const connection =await amqp.connect({
            protocol:"amqp",
            hostname:process.env.Rabbitmq_Host,
           port:5672,
           username: process.env.Rabbitmq_Username,
           password:process.env.Rabbitmq_Password
        })

        const channel =await connection.createChannel()
        const queueName = "send-otp";
        channel.assertQueue(queueName,{durable:true})
        
         const transporter = nodemailer.createTransport({
                    host:"smtp.gmail.com",
                    port:465,
                    auth:{
                        user:process.env.USER,
                        pass:process.env.PASSWORD
                    }
                  });
                  
        console.log("Mail service started, listening for otp emails")
       
        channel.consume(queueName,async(msg)=>{
            if(msg){
                try{
                  const {to,subject,body} = JSON.parse(msg.content.toString())

                   if (!to || !subject || !body) {
                      return
                   }

                  await transporter.sendMail({
                    from:"chat app",
                    to,
                    subject,
                    text:body
                  })
             
                  console.log(`OTP mail sent to ${to}`);
                  channel.ack(msg)

                }catch(err){
                 console.log("Failed to send OTP",err)
                }
            }
        })
    }catch(err){
        console.log("failed to start RabbitMQ cosumer",err);
    }
}
