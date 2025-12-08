import { EventEmitter } from "node:events";
import { emailSubject, sendEmail } from "../Email/sendEmail.utils.js";
import { template } from "../../Templates/Email_OTP.js";
import { login_successfuly_template } from "../../Templates/Login_Successfuly_Email.js";

export const emailEvent = new EventEmitter();

emailEvent.on("confirmEmail", async (data) => {
    await sendEmail({
        to: data.to,
        text: "Hello From Saraha App",
        html: template(data.otp,data.first_name),
        subject: emailSubject.confirmEmail,
    });
});


emailEvent.on("LoginSuccessfuly", async (data) => {
    await sendEmail({
        to: data.to,
        subject: emailSubject.login,
        text: `Welcome back ${data.first_name}`,
        html: login_successfuly_template(data.first_name),
    });
});