const balance = require('../../../model/balance');
const config = require('../../../config.json');

function balanceController(nav){
    async function getDisplay(req,res){
        let loginid = '-1';
        let username = '';
        let bal = -1;
        if(req.isAuthenticated()){
            loginid=req.user.id;
            username = req.user.username;
            bal = await balance.getBalance({config},loginid);
            if(bal == null){
                bal = {balance:"0", lastClaimDate: "never"};
            }
        }
        res.render('balance',{title:'BetBot UI',nav, loginid, username, balance:bal.balance, lastClaimDate: bal.lastClaimDate});
    }
    return { getDisplay };
}

module.exports = balanceController;