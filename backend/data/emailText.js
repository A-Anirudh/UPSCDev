export const accountDeleteEmailText = (name='user',url='') => (
    {
        text:`
        Dear ${name},
        <br>
        We are deeply saddened to see you go, yet we understand your needs and will work accordingly. If you change your mind within 30 days, please login to continue using your account.
        
        <br>
        <br>
        
        All your data will be deleted from our database if you do not login within 30 days.
        
        <br>
        <br>
        If this was not requested by you, we request you to login and change your password. Link to login: ${url}
        <br>
        <br>
        
        Best regards,
        <br>
        Team UPSCMax`,
        subject:'UPSCMax: Account deactivation'
    }
)

export const customerSupportAddEmailText = (title="",ticketNumber="") => (
    {
        text:`Dear user, we have recieved your complaint '${title}' and rest assured, we will get back to you within 3 working days!
        <br>
        <br>
Best regards,
<br>
Team UPSCMax`,
        subject:`UPSCMax: Customer Support raised, ticket number: ${ticketNumber}`
    }
)

export const customerSupportAddToSelfEmailText = (paymentRelated="",name="", title="") => (
    {
        text:`Support query from ${name} <br> Title: ${title}`,
        subject:`New Support Query: Payment: ${paymentRelated}`
    }
)

export const resetPasswordText = (url="") => (
    {
        text:`Dear user, please click the link below to reset your password. If it was not initiated by you, do not worry, you need not take any action.
        <br>
        Link to reset password:
        ${url}
<br>
        Best regards,
        <br>
        Team UPSCMax
        `,
        subject:`UPSCMax: Reset password`
    }
)

export const verifyUserText = (url="") => (
    {
        text:`Thanks for registering your email at UPSCMax, we are delighted with your presence. Kindly click the below link to verify your account
        <br>
        ${url}
        <br>
        Best regards,
        <br>
        Team UPSCMax
        `,
        subject:`UPSCMax: Verify Email Account`
    }
)