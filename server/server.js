const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { async } = require("rxjs");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json);
app.use(cors({ origin: true , credentials : true }))

const stripe = require("stripe")("sk_test_51NzyroHq2mcpwIBZM4eQLKoorbywrFiXF3j9ZsJdb4GACwMGnq5gjgunNcJq3ll2JPbAaJsa9ORGT36bNh657t9q00vaOeLWDM");
app.post("/checkout" , async (req , res , next)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) =>({
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.product]
                },
                unit_amount: item.price * 100
            })),
            mode:  "payment",
            success_url: "http://localhost:4242/success.html",
            success_url: "http://localhost:4242/cancel.html",
        });
        res.status(200).json(session);
    }catch (error) {
        next(error);
    }
})

app.listen(4242, () => console.log('app is runing on 4242'))