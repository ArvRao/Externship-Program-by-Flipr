import express from "express";
const router = express.Router();

const userMails = [
    {
    to: "srimanta@gmail.com",
    email_body: "Hi there..."
}
]

router.get('/emails', (req, res) => {
    res.send(userMails)
});

router.post('/emails', (req, res) => {
    const userInfo = req.body;  // Transfer data into local variable
    
    if (userInfo.to.includes("@")) {    // Check condition and send result accordingly
    // ADD NEW VALUES TO userMails ARRAY
        userMails.push(userInfo);
        res.send({
        "success": "true",
        "message": "Email sent successfully"
        })
    } else {
        res.send({
            "success": "false",
        "message": "Error message: Enter a valid email address"
        });
    }

});

export default router;