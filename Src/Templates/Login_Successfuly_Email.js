export const login_successfuly_template = (first_name) => `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Login Successful — Saraha App</title>
    </head>

    <body style="margin:0; padding:0; background:#f2f7f9; font-family:'Segoe UI', Tahoma, Arial, sans-serif; direction:ltr;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td align="center" style="padding:40px 15px;">

            <table width="620" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 12px 30px rgba(10,173,10,0.12);">

            <!-- Header -->
            <tr>
                <td style="background:linear-gradient(90deg,#0aad0a,#00c6ff); padding:28px; text-align:center; color:#fff;">
                <h1 style="margin:0; font-size:26px;">Welcome to Saraha App</h1>
                <p style="margin:8px 0 0; opacity:0.95;">Login Successful 🔐</p>
                </td>
            </tr>

            <!-- Body -->
            <tr>
                <td style="padding:30px; color:#264047; line-height:1.8;">

                <h2 style="margin:0 0 10px; color:#0aad0a; font-size:20px;">
                    Hello {${first_name}} 👋
                </h2>

                <p style="font-size:15px; margin:0 0 18px;">
                    Your account was successfully logged in. Below are the session details:
                </p>

                <p style="font-size:15px; margin:0 0 22px;">
                    If this wasn’t you, we highly recommend securing your account immediately by changing your password or logging out from all active sessions.
                </p>

                <p style="font-size:13px; color:#6b7b7b; margin-top:12px;">
                    If you have any questions or security concerns, our support team is always here to help.
                </p>

                <p style="margin-top:22px; font-weight:700;">
                    Best regards,<br>
                    Saraha App Team
                </p>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background:#fbfcfd; padding:16px; text-align:center; font-size:12px; color:#8899a6;">
                © {{year}} Saraha App — All rights reserved
                </td>
            </tr>

            </table>
        </td>
        </tr>
    </table>

    </body>
    </html>
    `;
