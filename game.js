var gold = 15;
var totalGold = 15;
var income = 0;
var prestigeGold = 15;
var prestigeGoldPurchased = 0;
var prestigeMult = 1;
var prestigeTotalGold = 15;
var prestigePoints = 0;
var prestigePointsEarned = 0;
var prestigePointsTotal = 0;
var buildings = [
    [15, 1, 1, 0, "Tent"],
    [60, 2, 1, 0, "Farm"],
    [200, 3, 1, 0, "Barracks"],
    [600, 5, 1, 0, "Church"],
    [2000, 10, 1, 0, "Castle"],
    [30000, 25, 1, 0, "Bank"],
    [1000000, 1, 1, 0, "Builder"]
]
var upgrades = [
    ["50 buildings", "Get 50 buildings total to unlock", 50, "Increase global gold/s by 20%", 1.2, 5000],
    ["100 buildings", "Get 100 buildings total to unlock", 100, "Increase global gold/s by 20%", 1.2, 50000],
    ["250 buildings", "Get 250 buildings total to unlock", 250, "Increase global gold/s by 20%", 1.2, 1000000],
    ["1k buildings", "Get 1k buildings total to unlock", 1000, "Increase global gold/s by 20%", 1.2, 5000000],
    ["10k buildings", "Get 10k buildings total to unlock", 10000, "Increase global gold/s by 20%", 1.2, 50000000],
    ["100k buildings", "Get 100k buildings total to unlock", 100000, "Increase global gold/s by 20%", 1.2, 500000000],
    ["1M buildings", "Get 1 Million buildings total to unlock", 1000000, "Increase global gold/s by 20%", 1.2, 5000000000],
    ["10M buildings", "Get 10 Million buildings total to unlock", 10000000, "Increase global gold/s by 20%", 1.2, 50000000000]
]
var achievs = [
    ["2 minutes", "Play for 2 minutes to unlock this achievement", 120, "Increase global gold/s by 5%", 0.05],
    ["10 minutes", "Play for 10 minutes to unlock this achievement", 600, "Increase global gold/s by 10%", 0.10],
    ["30 minutes", "Play for 30 minutes to unlock this achievement", 1800, "Increase global gold/s by 15%", 0.15],
    ["60 minutes", "Play for 60 minutes to unlock this achievement", 3600, "Increase global gold/s by 20%", 0.2],
    ["2 hours", "Play for 2 hours to unlock this achievement", 7200, "Increase global gold/s by 25%", 0.25],
    ["5 hours", "Play for 5 hours to unlock this achievement", 18000, "Increase global gold/s by 30%", 0.30],
    ["12 hours", "Play for 12 hours to unlock this achievement", 43200, "Increase global gold/s by 35%", 0.35],
    ["24 hours", "Play for 24 hours to unlock this achievement", 86400, "Increase global gold/s by 40%", 0.40],
    ["2 days", "Play for 2 days to unlock this achievement", 172800, "Increase global gold/s by 45%", 0.45],
    ["5 days", "Play for 5 days to unlock this achievement", 432000, "Increase global gold/s by 50%", 0.50],
    ["10 days", "Play for 10 days to unlock this achievement", 864000, "Increase global gold/s by 55%", 0.55]
]
var tents = 0;
var lastClickedUpgrade = 0;
var lastClickedAchiev = 0;
var globalmult = 1;
var achievmult = 1;
var achievCompleted = 0;
var totalBuildings = 0;
var cheat = false;
var ticks = 0;


$(document).ready(function() {
    highlight(1, "upgrade");
    highlight(1, "achiev");
    setResetButtons();
    updateInfo();
});

function buyBuilding(building) {
    $('#building1 button').removeClass("glow");
    var buildingID = parseInt(building.id.toString().substr(-1)) - 1;
    if (buildings[buildingID][0] <= gold) {
        gold -= buildings[buildingID][0];
        buildings[buildingID][0] = Math.round(buildings[buildingID][0] * 1.13);
        buildings[buildingID][3] += 1;
        totalBuildings += 1;
        if (buildingID < 6) {
            income += parseInt(buildings[buildingID][1] * buildings[buildingID][2]);
        }
        updateInfo();
    }
    $('#building' + building.id.toString().substr(-1) + ' div p:first').html(buildings[buildingID][4] + " x" + num(buildings[buildingID][3]));
    $('#building' + building.id.toString().substr(-1) + ' p:nth-child(3)').html(num(buildings[buildingID][0]));
    if (buildingID < 6) {
        $('#building' + building.id.toString().substr(-1) + ' div p:nth-child(2)').html(num(buildings[buildingID][3] * buildings[buildingID][2] * buildings[buildingID][1]) + ' gold/s');
    } else {
        $('#building' + building.id.toString().substr(-1) + ' div p:nth-child(2)').html(num(Math.round(buildings[buildingID][3] * buildings[buildingID][2] * buildings[buildingID][1]) / 10) + ' Tent/s');
    }

    $('.building').each(function(i, obj) {
        var buildingID = parseInt(obj.id.toString().substr(-1)) - 1;
        if (buildings[buildingID][0] > gold) {
            $('#building' + (buildingID + 1)).css("opacity", "0.5");
        } else {
            $('#building' + (buildingID + 1)).css("opacity", "1");
        }
    });
}

function updateInfo() {
    $('.info').each(function(i, obj) {
        obj.innerHTML = "<p>Gold : <b>" + num(gold) + "</b>&nbsp;&nbsp;&nbsp;&nbsp;Gold/s</b> : <b>" +
            num(parseInt(income * globalmult * achievmult)) + " (+" + numeral(globalmult * achievmult - 1).format('0.00%') + ")" + "</b>"
    });
    $('#achievInfo').html('<p>Completed : <b>' + achievCompleted +
        '</b>&nbsp;&nbsp;&nbsp;&nbsp;</b>bonus : <b>' +
        numeral(achievmult - 1).format('0.00%') +
        ' gold/s</b>');
    $('#resetInfo').html('<p>Reset points(RP): ' + num(prestigePointsEarned) + '<b> (+' + num(prestigePoints) + ' RP on reset)</b></p>');
    $('#nextPoint').html('<p id="nextPoint"> Next reset point : ' + num(Math.round(prestigeTotalGold)) + ' / ' + num(Math.pow(prestigePointsTotal, 1.05) * 1000000 + 1000000) + '<b> (' +
        numeral(prestigeTotalGold / (Math.pow(prestigePointsTotal, 1.05) * 1000000 + 1000000)).format('0.00%') + ')</b>');
}

function upgradeClicked(upgrade) {
    var upgradeID = parseInt(upgrade.id.toString().substr(-1));
    highlight(upgradeID, "upgrade");
    setUpgradeText(upgradeID - 1);
}

function achievClicked(achiev) {
    var achievID = parseInt(achiev.id.toString().replace(/\D/g, ''));
    highlight(achievID, "achiev");
    setAchievText(achievID - 1);
}

function highlight(id, target) {
    if (target == 'upgrade') {
        $('#upgrade' + id).css("box-shadow", "0px 0px 35px blue");
        if (lastClickedUpgrade != id) {
            $('#upgrade' + lastClickedUpgrade).css("box-shadow", "none");
        }
        lastClickedUpgrade = id;
    }
    if (target == 'achiev') {
        $('#achiev' + id).css("box-shadow", "0px 0px 35px blue");
        if (lastClickedAchiev != id) {
            $('#achiev' + lastClickedAchiev).css("box-shadow", "none");
        }
        lastClickedAchiev = id;
    }
}

function setUpgradeText(upgradeID) {
    $('#upgradeText').html(
        '<p>' + upgrades[upgradeID][0] + '</p> ' +
        '<p>' + upgrades[upgradeID][1] + '</p> ' +
        '<p> Progress: <b>' + num(totalBuildings) + '/' + num(upgrades[upgradeID][2]) + " (" + numeral(totalBuildings / upgrades[upgradeID][2]).format('0.00%') + ')</b></p> ' +
        '<p>' + upgrades[upgradeID][3] + '</p> ' +
        '<button id="buyUpgrade' + (upgradeID + 1) + '" class="ui-btn" onclick="buyUpgrade(' + upgradeID + ')">Buy for ' + num(upgrades[upgradeID][5]) + '</button>'
    );
    setUpgradeProgress(upgradeID);
}

function setAchievText(achievID) {
    $('#achievText').html(
        '<p>' + achievs[achievID][0] + '</p> ' +
        '<p>' + achievs[achievID][1] + '</p> ' +
        '<p> Progress: <b>' + sec(ticks) + ' / ' + sec(achievs[achievID][2]) + " (" + numeral(ticks / achievs[achievID][2]).format('0.00%') + ')</b></p> ' +
        '<p>' + achievs[achievID][3] + '</p> '
    );
    setAchievProgress(achievID);
}

function setUpgradeProgress(upgradeID) {
    if (totalBuildings < upgrades[upgradeID][2]) {
        $('#upgradeText p:nth-child(3)').html('Progress: <b>' + num(totalBuildings) + '/' + num(upgrades[upgradeID][2]) + " (" + numeral(totalBuildings / upgrades[upgradeID][2]).format('0.00%') + ')</b>');
    } else {
        $('#upgradeText p:nth-child(3)').html('Progress: <b>' + num(upgrades[upgradeID][2]) + '/' + num(upgrades[upgradeID][2]) + " (" + numeral(1).format('0%') + ')</b>');
    }
}

function setAchievProgress(achievID) {
    if (ticks < achievs[achievID][2]) {
        $('#achievText p:nth-child(3)').html('Progress: <b>' + sec(ticks) + ' / ' + sec(achievs[achievID][2]) + " (" + numeral(ticks / achievs[achievID][2]).format('0.00%') + ')</b>');
    } else {
        $('#achievText p:nth-child(3)').html('Progress: <b>' + sec(achievs[achievID][2]) + ' / ' + sec(achievs[achievID][2]) + " (" + numeral(1).format('0%') + ')</b>');
    }
}

function checkAchievCompletion() {
    achievCompleted = 0;
    var multi = 1;
    for (var i = 0, len = achievs.length; i < len; i++) {
        if (ticks >= achievs[i][2]) {
            multi += achievs[i][4];
            achievCompleted++;
        }
    }
    achievmult = multi;
}

function buyUpgrade(upgradeID) {
    if (upgrades[upgradeID][5] <= gold && totalBuildings >= upgrades[upgradeID][2]) {
        globalmult *= upgrades[upgradeID][4];
        gold -= upgrades[upgradeID][5];
        $('#upgrade' + (upgradeID + 1)).remove();
        if ($('#upgradeIcons img:first').length != 0) {
            $('#upgradeIcons img:first').click();
        } else {
            $('#upgradeText').html(
                '<p>Congratulations</p> ' +
                '<p>You bought every upgrade</p> ' +
                '<p><b>You have beaten the game</b></p> ' +
                '<p>You should really <a href="#reset">Reset</a> now</p>'
            );

        }
    }
}

function cheating() {
    cheat = !cheat;
    if (cheat) {
        globalmult *= 10
    } else {
        globalmult /= 10
    }
}

function num(number) {
    if (number >= 100000) {
        if (number >= 10000000000000000) {
            return numeral(number).format('0.00e+0');
        } else {
            return numeral(number).format('0.00a');
        }
    } else {
        return number;
    }
}

function sec(number) {
    var string = "";
    if (number < 60) {
        return number + "s";
    } else if (number < 3600) {
        string += Math.floor(number / 60) + "m";
        if ((number % 60) >= 1) {
            string += " " + (number % 60) + "s"
        }
        return string;
    } else {
        string += Math.floor(number / 3600) + "h";
        if (Math.floor(number % 3600 / 60) >= 1) {
            string += " " + Math.floor(number % 3600 / 60) + "m"
        }
        if (number % 3600 % 60 >= 1) {
            string += " " + number % 3600 % 60 + "s";
        }
        return string;
    }
}

function prestigeCheck() {
    if (prestigeTotalGold >= Math.pow(prestigePointsTotal, 1.05) * 1000000 + 1000000) {
        while (prestigeTotalGold >= Math.pow(prestigePointsTotal, 1.05) * 1000000 + 1000000) {
            prestigePoints++;
            prestigeTotalGold -= Math.pow(prestigePointsTotal, 1.05) * 1000000 + 1000000
            prestigePointsTotal++;;
        }
    }
}

function setResetButtons() {
    $('#resetButtons').html('<div class="resetButtons">' +
        '<div class="left">' +
        '<p> gold/s: <b>+' + numeral(prestigeMult - 1).format('0%') +
        '</b></div>' +
        '<div clas="right">' +
        '<button id="#prestigeMult" class=" ui-btn ui-shadow ui-corner-all resetButton" onclick="buyPrestigeMult()">Buy +5% for ' + num(Math.round((prestigeMult - 0.95) * 20)) + ' RP</button>' +
        '</div>' +
        '</div>' +
        '<div class="resetButtons">' +
        '<div class="left">' +
        '<p> start gold:  <b>' + num(prestigeGold) +
        '</b></div>' +
        '<div clas="right">' +
        '<button id="#prestigeGold" class=" ui-btn ui-shadow ui-corner-all resetButton" onclick="buyPrestigeGold()">Buy +' + num(Math.round(Math.pow((10 + prestigeGoldPurchased), 2))) +
        ' for ' + num(prestigeGoldPurchased + 1) + ' RP</button>' +
        '</div>' +
        '</div>' +

        '<button id="#reset" class=" ui-btn ui-shadow ui-corner-all" onclick="confirmHandler()">Reset</button>')
}

function buyPrestigeMult() {
    if (prestigePointsEarned >= Math.floor((prestigeMult - 0.95) * 20)) {
        globalmult /= prestigeMult;
        prestigeMult += 0.05;
        globalmult *= prestigeMult;
        prestigePointsEarned -= Math.floor((prestigeMult - 1) * 20);
        setResetButtons();
        updateInfo();
    }
}

function buyPrestigeGold() {
    if (prestigePointsEarned >= prestigeGoldPurchased + 1) {
        prestigeGold += Math.round(Math.pow((10 + prestigeGoldPurchased), 2));
        prestigeGoldPurchased++;
        prestigePointsEarned -= prestigeGoldPurchased;
        setResetButtons();
        updateInfo();
    }
}

setInterval(function() {
    if (!cheat) {
        tick();
    } else {
        for (i = 0; i < 50; i++) {
            setTimeout(function() {
                ticks += 5;
                tick();
            }, i * 50);
        }
    }
}, 1000);

function tick() {
    ticks++;
    tents += 0.1 * buildings[6][3] * buildings[6][2];
    checkAchievCompletion();
    updateInfo();
    gold += parseInt(income * globalmult * achievmult);
    totalGold += parseInt(income * globalmult * achievmult);
    prestigeTotalGold += parseInt(income * globalmult * achievmult);
    prestigeCheck();
    if (tents >= 1) {
        buildings[0][3] += Math.floor(tents);
        income += Math.floor(tents) * parseInt(buildings[0][1] * buildings[0][2]);
        totalBuildings += Math.floor(tents)
        tents -= Math.floor(tents);
        $('#building1 div p:first').html(buildings[0][4] + " x" + num(buildings[0][3]));
        $('#building1 div p:nth-child(2)').html(num(buildings[0][3] * buildings[0][2] * buildings[0][1]) + ' gold/s');

    }
    if ($('#upgradeIcons img:first').length != 0) {
        setUpgradeProgress(lastClickedUpgrade - 1);
    }
    if ($('#achievIcons img:first').length != 0) {
        setAchievProgress(lastClickedAchiev - 1);
    }
    if (totalGold < (1000000 + income * 2 * globalmult * achievmult + prestigeGold)) {
        if (totalGold > 1000000) {
            $('#building7').css("display", "inline-block");
        }
        if (totalGold > 30000) {
            $('#building6').css("display", "inline-block");
        }
        if (totalGold > 2000) {
            $('#building5').css("display", "inline-block");
        }
        if (totalGold > 600) {
            $('#building4').css("display", "inline-block");
        }
        if (totalGold > 200) {
            $('#building3').css("display", "inline-block");
        }
        if (totalGold > 60) {
            $('#building2').css("display", "inline-block");
        }
    }
    $('.building').each(function(i, obj) {
        var buildingID = parseInt(obj.id.toString().substr(-1)) - 1;
        if (buildings[buildingID][0] > gold) {
            $('#building' + (buildingID + 1)).css("opacity", "0.5");
        } else {
            $('#building' + (buildingID + 1)).css("opacity", "1");
        }
    });
}

function reset() {
    $('#upgradeIcons').html('<img src="images/50.png" class="upgradeIcons" id="upgrade1" onclick="upgradeClicked(this)">' +
        '<img src="images/100.png" class="upgradeIcons" id="upgrade2" onclick="upgradeClicked(this)">' +
        '<img src="images/250.png" class="upgradeIcons" id="upgrade3" onclick="upgradeClicked(this)">' +
        '<img src="images/1000.png" class="upgradeIcons" id="upgrade4" onclick="upgradeClicked(this)">' +
        '<img src="images/10000.png" class="upgradeIcons" id="upgrade5" onclick="upgradeClicked(this)">' +
        '<img src="images/100000.png" class="upgradeIcons" id="upgrade6" onclick="upgradeClicked(this)">' +
        '<img src="images/1000000.png" class="upgradeIcons" id="upgrade7" onclick="upgradeClicked(this)">' +
        '<img src="images/10000000.png" class="upgradeIcons" id="upgrade8" onclick="upgradeClicked(this)">');

    highlight(1, "upgrade");
    setUpgradeText(0);
    gold = prestigeGold;
    totalGold = prestigeGold;
    prestigePointsEarned += prestigePoints;
    prestigePoints = 0;
    income = 0;
    buildings = [
        [15, 1, 1, 0, "Tent"],
        [60, 2, 1, 0, "Farm"],
        [200, 3, 1, 0, "Barracks"],
        [600, 5, 1, 0, "Church"],
        [2000, 10, 1, 0, "Castle"],
        [30000, 25, 1, 0, "Bank"],
        [1000000, 1, 1, 0, "Builder"]
    ]
    upgrades = [
        ["50 buildings", "Get 50 buildings total to unlock", 50, "Increase global gold/s by 20%", 1.2, 5000],
        ["100 buildings", "Get 100 buildings total to unlock", 100, "Increase global gold/s by 20%", 1.2, 50000],
        ["250 buildings", "Get 250 buildings total to unlock", 250, "Increase global gold/s by 20%", 1.2, 1000000],
        ["1k buildings", "Get 1k buildings total to unlock", 1000, "Increase global gold/s by 20%", 1.2, 5000000],
        ["10k buildings", "Get 10k buildings total to unlock", 10000, "Increase global gold/s by 20%", 1.2, 50000000],
        ["100k buildings", "Get 100k buildings total to unlock", 100000, "Increase global gold/s by 20%", 1.2, 500000000],
        ["1M buildings", "Get 1 Million buildings total to unlock", 1000000, "Increase global gold/s by 20%", 1.2, 5000000000],
        ["10M buildings", "Get 10 Million buildings total to unlock", 10000000, "Increase global gold/s by 20%", 1.2, 50000000000]
    ]
    tents = 0;
    lastClickedUpgrade = 1;
    globalmult = 1 * prestigeMult;
    achievmult = 1;
    achievCompleted = 0;
    totalBuildings = 0;
    cheat = false;

    $('.building').each(function(i, obj) {
        obj.style.display = "none";
        var buildingID = parseInt(obj.id.toString().substr(-1)) - 1;
        $('#building' + obj.id.toString().substr(-1) + ' div p:first').html(buildings[buildingID][4] + " x" + num(buildings[buildingID][3]));
        $('#building' + obj.id.toString().substr(-1) + ' p:nth-child(3)').html(num(buildings[buildingID][0]));
        if (buildingID < 6) {
            $('#building' + obj.id.toString().substr(-1) + ' div p:nth-child(2)').html(num(buildings[buildingID][3] * buildings[buildingID][2] * buildings[buildingID][1]) + ' gold/s');
        } else {
            $('#building' + obj.id.toString().substr(-1) + ' div p:nth-child(2)').html(num(Math.round(buildings[buildingID][3] * buildings[buildingID][2] * buildings[buildingID][1]) / 10) + ' Tent/s');
        }
    });

    $('#building1').css('display', 'inline-block');
}

function confirmHandler() {
    $.confirm({
        'title': 'Reset Confirmation',
        'message': 'You are about to reset. <br />You will gain <b>' + num(prestigePoints) + ' RP </b> But lose everything except achievements! Continue?',
        'buttons': {
            'Yes': {
                'class': 'blue',
                'action': function() {
                    reset();
                }
            },
            'No': {
                'class': 'gray',
                'action': function() {} // Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}