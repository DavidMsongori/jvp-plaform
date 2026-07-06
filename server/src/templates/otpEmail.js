const otpEmail = ({ firstName, otp }) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>JVP Connect Verification</title>

</head>

<body style="
margin:0;
padding:0;
background:#f5f7fa;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="background:#f5f7fa;padding:40px 15px;">

<tr>

<td align="center">

<table
width="650"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:12px;
overflow:hidden;
box-shadow:0 8px 30px rgba(0,0,0,.08);
">

<!-- HEADER -->

<tr>

<td
align="center"
style="
background:#008751;
padding:45px 30px;
">

<h1 style="
margin:0;
color:white;
font-size:34px;
letter-spacing:1px;
">
JVP CONNECT
</h1>

<p style="
margin-top:15px;
color:white;
font-size:16px;
">
Coast Region Digital Membership Platform
</p>

</td>

</tr>

<!-- BODY -->

<tr>

<td style="padding:45px;">

<h2 style="
margin-top:0;
color:#222;
">

Hello ${firstName},

</h2>

<p style="
font-size:17px;
line-height:1.8;
color:#444;
">

Thank you for activating your
<strong>JVP Connect</strong>
account.

</p>

<p style="
font-size:17px;
line-height:1.8;
color:#444;
">

Use the verification code below
to continue your activation.

</p>

<div style="
margin:45px auto;
width:250px;
background:#f7f7f7;
padding:22px;
border-radius:12px;
text-align:center;
font-size:40px;
font-weight:bold;
letter-spacing:10px;
color:#008751;
border:2px dashed #008751;
">

${otp}

</div>

<p style="
font-size:16px;
line-height:1.8;
color:#444;
">

This verification code will expire in

<strong>10 minutes.</strong>

</p>

<p style="
font-size:16px;
line-height:1.8;
color:#444;
">

If you did not request this verification,
you may safely ignore this email.

</p>

</td>

</tr>

<!-- SECURITY -->

<tr>

<td style="
padding:30px 45px;
background:#f8f8f8;
border-top:1px solid #ececec;
">

<h3 style="
margin-top:0;
color:#008751;
">

Security Reminder

</h3>

<ul style="
padding-left:20px;
color:#555;
line-height:1.8;
">

<li>
Never share your OTP with anyone.
</li>

<li>
JVP will never ask for your password.
</li>

<li>
This code can only be used once.
</li>

</ul>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
align="center"
style="
padding:35px;
background:#003b24;
color:white;
">

<h3 style="
margin:0;
">

Jumuiya ya Vijana wa Pwani

</h3>

<p style="
margin:15px 0;
font-size:14px;
line-height:1.8;
">

Empowering Coastal Youth Through
Unity, Leadership & Opportunity

</p>

<p style="
margin-top:20px;
font-size:13px;
opacity:.8;
">

© ${new Date().getFullYear()}
JVP Connect

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

module.exports = otpEmail;