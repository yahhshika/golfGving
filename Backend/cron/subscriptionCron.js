const cron = require("node-cron");
const Subscription = require("../models/Subscription");
const User = require("../models/User");


cron.schedule("0 0 * * *", async () => {
    try{

        console.log("Running subscription check...");

        const expiredSubscriptions =
            await Subscription.find({
                status:"active",
                expiryDate:{
                    $lt:new Date()
                }
            });

        for(const sub of expiredSubscriptions){

            sub.status = "lapsed";
            await sub.save();

            await User.findByIdAndUpdate(
                sub.userId,
                {
                    role:"user"
                }
            );
        }

        console.log(
            `${expiredSubscriptions.length} subscriptions lapsed`
        );

    }catch(err){
        console.log(err);
    }
});
