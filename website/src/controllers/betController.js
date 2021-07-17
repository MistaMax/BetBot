const balance = require('../../../model/balance');
const config = require('../../../config.json');

function betController(nav){
    async function getDisplay(req,res){
        let loginid = '-1';
        let username = '';
        let bets = [{userId:'-1'}];
        if(req.isAuthenticated()){
            loginid=req.user.id;
            username = req.user.username;
            bets = [{}];
        }
        res.render('bet',{title:'BetBot UI',nav, loginid, username, bets});
    }
    return { getDisplay };
}

module.exports = betController;