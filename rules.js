var exports = module.exports = {};


exports.chooseRole = function(n_saboteur, n_finder, num) {
   
    if (num === 3 || num === 4) {
            if (n_saboteur < n_finder && n_saboteur === 0) 
                return 0;
            else
                return 1;
    }
    else if (num === 5 || num === 6) {
        if (n_saboteur < n_finder && n_saboteur < 2) 
            return 0;
        else
            return 1;
    }
    else if (num === 7) {
        if (n_saboteur < n_finder && n_saboteur < 2) 
            return 0;
        else
            return 1;
    }
    return null;
};

exports.maxTurn = function(num) {
    switch(num) {
        case '3': return 50; break;
        case '4': return 45; break;
        case '5': return 40; break;
        case '6': return 40; break;
        case '7': return 35; break;
    }
    return null;
};

