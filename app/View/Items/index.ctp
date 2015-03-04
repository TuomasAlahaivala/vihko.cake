<?php include "cities.php"; ?>
<div id="left-column">
	<h3>Valitse tuote:</h3>
	<p class="info">Laiteet on j&auml;rjestetty sijainnin mukaisesti. Pyri aina varaamaan laite joka on mahdollisimman l&auml;hell&auml; tapahtumapaikkaa.</p>
	<div class="styled-select">

	 <select id="laitteet" name="laitteet" onChange="haeLaite(this, '', 'index')">
	 <?php

		echo "<option value='-'>-</option>";
		echo "<option value='hinnasto'>Hinnasto</option>";
		echo "<option value='laitteet'>Laitteet</option>";
		$paikka = "";
		foreach($laitteet as $key => $item){

			if($paikka == "" || $paikka != $item['Item']['paikka']){
				$paikka = $item['Item']['paikka'];
				echo "<option disabled='true' value='-'>".$item['Item']['paikka']."</option>";
			}

			echo "<option value='".$item['Item']['id']."'>".$item['Item']['name']."</option>";
		}
	
	 ?>
	</select>
	</div>
	<p class="info">Valittuasi laitteen p&auml;&auml;set katsomaan ko laitteen varaustilannetta kalenterista ja varaamaan laitteen tapahtumaasi.</p>


	<h3 id="muokkaa" onClick="showdivi('muokkaakohdeDivi');" style="cursor:pointer; display:none;">Muokkaa kohdetta:</h3>
		<div id="muokkaakohdeDivi" style="display:none;">
		<div class="poistabutton"><a onClick="tarkistakohteenpoisto();" href="#" title="poistava varaus">Poista kohde</a></div>
		<form method="post" action="">
			<input type="text" id="nimi" name="nimi" class="tuotteennimi" value="" required="required">
			<div class="styled-select">
			<select id="muokkaapaikka" name="paikka">
			<option value='-'>Tuotteen paikka</option>";
			<option value='Helsinki'>Helsinki</option>";
			<option value='Oulu'>Oulu</option>";
			<option value='Jyväskylä'>Jyväskylä</option>";
			</select>
			</div>
			<textarea id="lisatietoja" name="lisatietoja" value=""></textarea>
			<input type="hidden" id="formtype" name="formtype" value="muokkaa">
			<input type="hidden" id="id_item" name="id_item" value="">
			<p>Valitse normaalikuljetuskaupungit.</p>
			<div class="styled-select">
			
			<select id="laitteet" name="laitteet" onChange="lisaaKaupunki(this,'muokkaa')">
			<option value='-'>-</option>";
			<?php
			
			sort($cities);
			foreach($cities as $key => $item){

				echo "<option value='".$item."'>".$item."</option>";
			}
			?>
			</select>
			</div>
			<input type="hidden" name="muokkaakaupungit" id="muokkaakaupungit" value="">
			<div id="muokkaakaupungit_show"></div>
			
			
			<input type="Submit" value="Muokkaa" name="muokkaa" style="cursor:pointer;">
		</form>
		<?php if(isset($sucess)){?>
		<div class="sucess">
			<img src="<?php bloginfo('template_url'); ?>/assets/sucess.jpg">
		</div>
		<?php } ?>
		</div><!--omattiedot-->
	<h3 id="lisaa" onClick="showdivi('lisaakohdeDivi');" style="cursor:pointer">Lis&auml;&auml; tuote:</h3>
        <?php include "lisaalaite.ctp"; ?>
                <h3 id="muokkaahintoja" onClick="haeHinnat();" style="cursor:pointer;">Muokkaa hintoja:</h3>
                <div id="muokkaahinnatDivi">
                    
                </div>

	<div id="paivienvalinta" style="display:none;">
	<div class="kohde">
		<h4>Valittu tuote: </h4>
		<p id="laitteennimi"></p>
		<h4>Lisätiedot: </h4>
		<p id="laitteenlisatieto"><p>
		<h4>Laitteen kuljetus: </h4>
		<p id="normaali_kuljetus"><p>
	
	<h2 name="" id="valitutpaivat"></h2><br>


	<input type="hidden" name="selecteddate" id="selecteddate" value="">
	<div id="varauksenhinta"></div>
	</div>
	</div>

</div>

<div id="right-column">
	<div id="laitelista"></div>
	<p style="float:left; display:none;" class="nonlink_link" id="varaustietolinkki" onClick="haeMenneetvaraukset('','expd',0);">Katso varaushistoria</p>
	<?php include "main.phtml";?>
	
	<div id="laitteenkalenteri"></div>
</div>
	

<div id="pagination" class="pagination" style="display:none;">

<div class="alignleft">
<a href="#"
  title="">

<div class="alignright">
<a href="#" 
 title="">Seuraava sivu</a>

</div>

</div><!-- .navigation -->