<h4 style="font-weight:normal;  height: 40px;" id="laitteenlisatieto"></h4><br/>


<?php

$kuukaudet = array(
	1 => "Tammikuu",
	2 => "Helmikuu",
	3 => "Maaliskuu",
	4 => "Huhtikuu",
	5 => "Toukokuu",
	6 => "Kesäkuu",
	7 => "Heinäkuu",
	8 => "Elokuu",
	9 => "Syyskuu",
	10 => "Lokakuu",
	11 => "Marraskuu",
	12 => "Joulukuu",
        );

$id_item = $id;

if(isset($id_item)){
?>
<div id="calendar">
	<table class="phpc-main phpc-calendar">
		<caption>
			<span class="phpc-dropdown-list">
			<input type="button" id="lastmonthButton" onClick="vahennaKuukausi(<?php echo $id_item; ?>)" value="<">
			<!--<ul>-->
			<select id="month" name="month" onChange="haeKuukausi(this, 'm', <?php echo $id_item; ?>)">
<?php 

foreach($kuukaudet as $key => $item){

	//echo "<li>".$item."</li>";
	echo "<option value='".$key."'";
	if($key == date("m")){
		echo " selected";
	}
	echo ">".$item."</option>";
	}
?>
</select>
<!--</ul>-->

<input type="hidden" class="m" id="m" value="<?php echo date("m");?>">
<input type="hidden" class="y" id="y" value="<?php echo date("Y");?>">
<input type="button"  id="nextmonthButton" onClick="lisaaKuukausi(<?php echo $id_item; ?>)" value=">">
<select id="year" name="year" onChange="haeKuukausi(this,'y', <?php echo $id_item; ?>)">
<?php 
	echo "<option selected value=".date("Y").">".date("Y")."</option>";

	$nextyear = date("Y") + 1;
	echo "<option value=".$nextyear.">".$nextyear."</option>";
	//echo $nextyear; 
?>
</select>

</span>
</caption>
<colgroup><col class="phpc-week"/>
<col class="phpc-day"/>
<col class="phpc-day"/>
<col class="phpc-day"/>
<col class="phpc-day"/>
<col class="phpc-day"/>
<col class="phpc-day"/>
<col class="phpc-day"/>
</colgroup>
<thead class="paivat"><tr><th>Vko</th>
<th>Maanantai</th>
<th>Tiistai</th>
<th>Keskiviikko</th>
<th>Torstai</th>
<th>Perjantai</th>
<th>Lauantai</th>
<th>Sunnuntai</th>
</tr>
</thead>
<tbody id="kalenterisisalto" class="kalenterisisalto">
<?php include "haevaraukset.ctp";?>
</tbody>
</table>
<div id="laitevarauslista"></div>
<h4><a href="#" onClick="listaan();">Takaisin etusivulle</a></h4>
<p class="nonlink_link" id="laitetietolinkki" onClick="haeMenneetvaraukset(<?php echo $id_item; ?>,'expd',0);">Katso laitteen varaushistoria</p>
</div>

<?php
}
?>