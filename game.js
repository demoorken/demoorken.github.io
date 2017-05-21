var gold = 15;
var totalGold = 15;
var income = 0;
var buildings=[
[15,1,1,0,"Tent"],
[60,2,1,0,"Farm"],
[200,3,1,0,"Barracks"],
[600,5,1,0,"Church"],
[2000,10,1,0,"Castle"],
[30000,25,1,0,"Bank"],
[1000000,1,1,0,"Builder"]]
var upgrades=[
["50 buildings","Get 50 buildings total to unlock",50,"Increase global gold/s by 20%",1.2,5000],
["100 buildings","Get 100 buildings total to unlock",100,"Increase global gold/s by 20%",1.2,50000],
["250 buildings","Get 250 buildings total to unlock",250,"Increase global gold/s by 20%",1.2,1000000],
["1k buildings","Get 1k buildings total to unlock",1000,"Increase global gold/s by 20%",1.2,5000000],
["10k buildings","Get 10k buildings total to unlock",10000,"Increase global gold/s by 20%",1.2,50000000],
["100k buildings","Get 100k buildings total to unlock",100000,"Increase global gold/s by 20%",1.2,500000000],
["1M buildings","Get 1 Million buildings total to unlock",1000000,"Increase global gold/s by 20%",1.2,5000000000],
["10M buildings","Get 10 Million buildings total to unlock",10000000,"Increase global gold/s by 20%",1.2,50000000000]]
var tents = 0;
var lastClicked = 1;
var globalmult = 1;
var totalBuildings = 0;
var cheat = false;

function buyBuilding(building)
{
	$('#building1 button').removeClass("glow");
	var buildingID = parseInt(building.id.toString().substr(-1))-1;
	if(buildings[buildingID][0] <= gold)
	{
		gold -= buildings[buildingID][0];
		buildings[buildingID][0] = Math.round(buildings[buildingID][0]*1.13);
		buildings[buildingID][3] += 1;
		totalBuildings += 1;
		if(buildingID<6)
		{
			income += parseInt(buildings[buildingID][1]*buildings[buildingID][2]);
		}
		$('.info').each(function(i, obj) {
		obj.innerHTML = "<p>Gold : <b>"+num(gold)+"</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Gold/s</b> : <b>"
		+num(parseInt(income*globalmult))+"</b>"
		});
	}
	$('#building'+building.id.toString().substr(-1)+' div p:first').html(buildings[buildingID][4]+" x"+num(buildings[buildingID][3]));
	$('#building'+building.id.toString().substr(-1)+' p:nth-child(3)').html(num(buildings[buildingID][0]));
	if(buildingID<6)
	{
		$('#building'+building.id.toString().substr(-1)+' div p:nth-child(2)').html(num(buildings[buildingID][3]*buildings[buildingID][2]*buildings[buildingID][1])+' gold/s');
	}
	else
	{
		$('#building'+building.id.toString().substr(-1)+' div p:nth-child(2)').html(num(Math.round(buildings[buildingID][3]*buildings[buildingID][2]*buildings[buildingID][1])/10)+' Tent/s');
	}
	
	$('.building').each(function(i, obj) {
		var buildingID = parseInt(obj.id.toString().substr(-1))-1;
		if(buildings[buildingID][0] > gold)
		{
		$('#building'+(buildingID+1)).css("opacity","0.5");
		}
		else{
		$('#building'+(buildingID+1)).css("opacity","1");
		}
});
}

function upgradeClicked(upgrade)
{
	var upgradeID = parseInt(upgrade.id.toString().substr(-1));
	highlight(upgradeID);
	setUpgradeText(upgradeID-1);
}

function highlight(upgradeID)
{
	$('#upgrade' + upgradeID).css("box-shadow","0px 0px 35px blue");
	if(lastClicked!=upgradeID)
	{
	$('#upgrade' + lastClicked).css("box-shadow","none");	
	}
	lastClicked=upgradeID;
}

function setUpgradeText(upgradeID)
{
	$('#upgradeText').html(
	'<p>'+upgrades[upgradeID][0]+'</p> '+
	'<p>'+upgrades[upgradeID][1]+'</p> '+
	'<p> Progress: <b>'+num(totalBuildings)+'/'+num(upgrades[upgradeID][2])+'</b></p> '+
	'<p>'+upgrades[upgradeID][3]+'</p> '+
	'<button id="buyUpgrade'+(upgradeID+1)+'" class="ui-btn" onclick="buyUpgrade('+upgradeID+')">Buy for '+num(upgrades[upgradeID][5])+'</button>'
	);
}

function setProgressText(upgradeID)
{
	$('#upgradeText p:nth-child(3)').html('Progress: <b>'+num(totalBuildings)+'/'+num(upgrades[upgradeID][2])+'</b>');
}

function buyUpgrade(upgradeID)
{
	if(upgrades[upgradeID][5]<= gold && totalBuildings >= upgrades[upgradeID][2])
	{
		globalmult *= upgrades[upgradeID][4];
		gold -= upgrades[upgradeID][5];
		$('#upgrade'+(upgradeID+1)).remove();
		if($('#upgradeIcons img:first').length != 0)
		{
			$('#upgradeIcons img:first').click();
		}
		else {
		$('#upgradeText').html(
		'<p>Congratulations</p> '+
		'<p>You bought every upgrade</p> '+
		'<p><b>You have beaten the game</b></p> '+
		'<p>You should really reset now</p> '+
		'<a href="#reset">Reset</a></li>'
		);
	
		}
	}
}

function cheating()
{
	cheat = !cheat;
	if(cheat){globalmult *= 5}
	else {globalmult /= 5}
}

function num(number) {
 if(number>=100000)
 {
	if(number>=10000000000000000)
	 {
		return numeral(number).format('0.00e+0');
	 }
	else {
	 return numeral(number).format('0.00a');
	 }
}
 else {
 return number;
 }
}

setInterval(function(){
if(!cheat)
{
tick();}
else{
for(i=0;i<50;i++)
{setTimeout(function(){ tick();}, i*50);}
}
}, 1000);

function tick()
{
tents += 0.1*buildings[6][3]*buildings[6][2];
gold += parseInt(income*globalmult);
totalGold += parseInt(income*globalmult);
if(tents>=1)
{
	buildings[0][3] += Math.floor(tents);
	income += Math.floor(tents)*parseInt(buildings[0][1]*buildings[0][2]);
	totalBuildings += Math.floor(tents)
	tents -= Math.floor(tents);
	$('#building1 div p:first').html(buildings[0][4]+" x"+num(buildings[0][3]));
	$('#building1 div p:nth-child(2)').html(num(buildings[0][3]*buildings[0][2]*buildings[0][1])+' gold/s');
	
}
if($('#upgradeIcons img:first').length != 0)
		{
			setProgressText(lastClicked-1);
		}
if (totalGold<(1000000+income*2*globalmult))
{
	if(totalGold>1000000)
	{
	$('#building7').css("display","inline-block");
	}
	if(totalGold>30000)
	{
	$('#building6').css("display","inline-block");
	}
	if(totalGold>2000)
	{
	$('#building5').css("display","inline-block");
	}
	if(totalGold>600)
	{
	$('#building4').css("display","inline-block");
	}
	if(totalGold>200)
	{
	$('#building3').css("display","inline-block");
	}
	if(totalGold>60)
	{
	$('#building2').css("display","inline-block");
	}
}
$('.building').each(function(i, obj) {
		var buildingID = parseInt(obj.id.toString().substr(-1))-1;
		if(buildings[buildingID][0] > gold)
		{
		$('#building'+(buildingID+1)).css("opacity","0.5");
		}
		else{
		$('#building'+(buildingID+1)).css("opacity","1");
		}
});
		
$('.info').each(function(i, obj) {
    obj.innerHTML = "<p>Gold : <b>"+num(gold)+"</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Gold/s</b> : <b>"+num(parseInt(income*globalmult))+"</b>"

});
}