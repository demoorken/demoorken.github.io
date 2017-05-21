var gold = 15;
var totalGold = 15;
var income = 0;
var buildings=[[15,1,1,0,"Tent"],[60,2,1,0,"Farm"],[200,3,1,0,"Barracks"],[600,5,1,0,"Church"],[2000,10,1,0,"Castle"],[30000,25,1,0,"Bank"],[1000000,1,1,0,"Builder"]]
var tents = 0;
var lastClicked = 1;
function buyBuilding(building)
{
	var buildingID = parseInt(building.id.toString().substr(-1))-1;
	if(buildings[buildingID][0] <= gold)
	{
		gold -= buildings[buildingID][0];
		buildings[buildingID][0] = Math.round(buildings[buildingID][0]*1.13);
		buildings[buildingID][3] += 1;
		if(buildingID<6)
		{
			income += parseInt(buildings[buildingID][1]*buildings[buildingID][2]);
		}
	}
	$('#building'+building.id.toString().substr(-1)+' div p:first').html(buildings[buildingID][4]+" x"+buildings[buildingID][3]);
	$('#building'+building.id.toString().substr(-1)+' p:nth-child(3)').html(buildings[buildingID][0]+'g');
	if(buildingID<6)
	{
		$('#building'+building.id.toString().substr(-1)+' div p:nth-child(2)').html(buildings[buildingID][3]*buildings[buildingID][2]*buildings[buildingID][1]+' gold/s');
	}
	else
	{
		$('#building'+building.id.toString().substr(-1)+' div p:nth-child(2)').html(Math.round(buildings[buildingID][3]*buildings[buildingID][2]*buildings[buildingID][1])/10+' Tent/s');
	}
}

function upgradeClicked(upgrade)
{
	var upgradeID = parseInt(upgrade.id.toString().substr(-1));
	console.log(upgradeID);
	$('#upgrade' + upgradeID).css("box-shadow","0px 0px 35px blue");
	if(lastClicked!=upgradeID)
	{
	$('#upgrade' + lastClicked).css("box-shadow","none");	
	}
	lastClicked=upgradeID;
	
}

function cheat()
{
	gold += 25*income;
	totalGold += 25*income;
	if (totalGold<1000000+income*50)
	{
		if(totalGold>1000000)
		{
		$('#building7').css("display","inline-block");
		}
		else if(totalGold>30000)
		{
		$('#building6').css("display","inline-block");
		}
		else if(totalGold>2000)
		{
		$('#building5').css("display","inline-block");
		}
		else if(totalGold>600)
		{
		$('#building4').css("display","inline-block");
		}
		else if(totalGold>200)
		{
		$('#building3').css("display","inline-block");
		}
		else if(totalGold>60)
		{
		$('#building2').css("display","inline-block");
		}
	}
}
setInterval(function(){ 
tents += 0.1*buildings[6][3]*buildings[6][2];
gold += income;
totalGold += income;
if(tents>=1)
{
	buildings[0][3] += Math.floor(tents);
	income += Math.floor(tents)*parseInt(buildings[0][1]*buildings[0][2]);
	tents -= Math.floor(tents);
	$('#building1 div p:first').html(buildings[0][4]+" x"+buildings[0][3]);
	$('#building1 div p:nth-child(2)').html(buildings[0][3]*buildings[0][2]*buildings[0][1]+' gold/s');
	
}
$('.info').each(function(i, obj) {
    obj.innerHTML = "<p>Gold : <b>"+gold+"</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Gold/s</b> : <b>"+income+"</b>"
	if (totalGold<(1000000+income*2))
	{
		if(totalGold>1000000)
		{
		$('#building7').css("display","inline-block");
		}
		else if(totalGold>30000)
		{
		$('#building6').css("display","inline-block");
		}
		else if(totalGold>2000)
		{
		$('#building5').css("display","inline-block");
		}
		else if(totalGold>600)
		{
		$('#building4').css("display","inline-block");
		}
		else if(totalGold>200)
		{
		$('#building3').css("display","inline-block");
		}
		else if(totalGold>60)
		{
		$('#building2').css("display","inline-block");
		}
	}
});
}, 1000);