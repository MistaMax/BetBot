
function balanceController(nav){
    function getDisplay(req,res){
        res.render('balance',{title:'BetBot UI',nav});
    }
    return { getDisplay };
}

module.exports = balanceController;