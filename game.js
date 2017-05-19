var gold = 15;
var totalGold = 15;
var income = 0;
var buildings=[[15,1,1,0,"Tent"],[60,2,1,0,"Farm"],[200,3,1,0,"Barracks"],[600,5,1,0,"Church"],[2000,10,1,0,"Castle"]]


function buyBuilding(building)
{
	
	var buildingID = parseInt(building.id.toString().substr(-1))-1;
	if(buildings[buildingID][0] <= gold)
	{
		gold -= buildings[buildingID][0];
		buildings[buildingID][0] = Math.round(buildings[buildingID][0]*1.13);
		buildings[buildingID][3] += 1;
		income += parseInt(buildings[buildingID][1]*buildings[buildingID][2]);
	}
	$('#building'+building.id.toString().substr(-1)+' div p:first').html(buildings[buildingID][4]+" x"+buildings[buildingID][3]);
	$('#building'+building.id.toString().substr(-1)+' div p:nth-child(2)').html(buildings[buildingID][3]*buildings[buildingID][2]*buildings[buildingID][1]+' gold/s');
	$('#building'+building.id.toString().substr(-1)+' p:nth-child(3)').html(buildings[buildingID][0]+'g');

}

function cheat()
{
	gold += 10*income;
	totalGold += 10*income;
	if (totalGold<2100)
	{
		$('#building1').css("visibility","visible");
		if(totalGold>2000)
		{
		$('#building5').css("visibility","visible");
		}
		if(totalGold>600)
		{
		$('#building4').css("visibility","visible");
		}
		if(totalGold>200)
		{
		$('#building3').css("visibility","visible");
		}
		if(totalGold>60)
		{
		$('#building2').css("visibility","visible");
		}
	}
}
	
setInterval(function(){ 
gold += income;
totalGold += income;
$('.info').each(function(i, obj) {
    obj.innerHTML = "<p>Gold : <b>"+gold+"</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Gold/s</b> : <b>"+income+"</b>"
	if (totalGold<2100)
	{
		$('#building1').css("visibility","visible");
		if(totalGold>2000)
		{
		$('#building5').css("visibility","visible");
		}
		if(totalGold>600)
		{
		$('#building4').css("visibility","visible");
		}
		if(totalGold>200)
		{
		$('#building3').css("visibility","visible");
		}
		if(totalGold>60)
		{
		$('#building2').css("visibility","visible");
		}
	}
});
}, 1000);