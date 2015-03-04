var disabledSpecificDays = "";
var dateToday = new Date();
var varaustiedot = new Array();
var laskutustiedot = new Array();
var valitutpaivat = new Array();
var loaded = "";
//kuljetushinta = 0;
function showdivi(divi){

	jQuery( '#'+divi).toggle();
}
//function suoritetaan vain jos ollaan laitteen varaussivulla.
//Maaritetään date- ja time pickerit
function varaaAtrb(){

		var pickerOpts = {
				closeText: "Sulje",
				currentText: "Pvm nyt",
				nextText: "Seuraava",
				prevText: "Edellinen",
				monthNames: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
				"Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
				monthNamesShort: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei",
				"Elo", "Syy", "Lok", "Mar", "Jou"],
				dayNames: ["Sunnuntai","Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai",
				"Lauantai"],
				dayNamesShort: ["Sun","Maa","Tii", "Kes", "Tor", "Per", "Lau"],
				dayNamesMin: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
				dateFormat: 'dd.mm.yy',
				firstDay: 1,
				isRTL: false,
				showButtonPanel: true,
				changeYear:true,
				changeMonth:true,
				beforeShowDay: disableSpecificDaysAndWeekends,
				firstDay: 1,
				"minDate": dateToday,
				onSelect : function(date){haeVuokraustiedot(date);}
			};
		var timeobjs = {'timeFormat': 'H:i'};
		jQuery('#time_start').timepicker(timeobjs);
		jQuery('#time_end').timepicker(timeobjs);
		jQuery('#date_start').datepicker(pickerOpts);
		jQuery('#date_end').datepicker(pickerOpts);

}
function haeHinnat(){
    
    if(loaded == ""){
        jQuery.ajax({
               type: 'get',
                url: 'hinnas/haehinnat',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                },
                success: function(response) {

                    if (response) {

                        $('#muokkaahinnatDivi').html(response.content);
                    }
                },
                error: function(e) {
                    alert("An error occurred: " + e.responseText.message);
                    console.log(e);
                }
        });
        loaded = 1;
        return;
    }
    showdivi('muokkaahinnatDivi');
}
function haeVuokraustiedot(date){
	if(date){
		
		if(jQuery( "#date_start" ).val() && jQuery( "#date_end" ).val()){
		
			laskeVuokra(jQuery( "#date_start" ).val(), jQuery( "#date_end" ).val());
		return
		}
	}
}
function laskeVuokra(date_start, date_end){

	if(date_start && date_end){
		jQuery.ajax({
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto=laskeVuokra",
				data: {
					date_start : date_start,
					date_end : date_end
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);

					if (jsonResponse['success'] == 1) {
							

							kohdevuokra = jsonResponse['vuokra'];
							
							naytaVuokratiedot(kohdevuokra);
							
							
					} else if (jsonResponse['success'] == 0) {
						
					}
				}
			});
		}

}
function naytaVuokratiedot(kohdevuokra){
							


	checkkohde = isNaN(kohdevuokra);
							
	if(checkkohde == false){


		kohdevuokra = parseInt(kohdevuokra);







		if(kohdevuokra == 0){
			kokohinta = "<b>Vuokra sovitaan erikseen.</b>";
		}else{
			kokohinta = "<b>"+kohdevuokra+" €</b>";
		}
	}
	
	jQuery( "#varauksenhinta" ).html(' Varauksen hinta: '+kokohinta);
	jQuery( "#varauksenhinta").show();						
}
function haeLaite(id_item, name_item, sivu){

	if(id_item.value == "-" || id_item.value == "hinnasto"){
		
		if(sivu == "varaus"){
			jQuery( "#varauslomake" ).hide();
							
			jQuery( "#id_item" ).val("");		
			jQuery( "#laitteennimi" ).html('');	
			jQuery( "#pagination" ).hide();
			jQuery( ".varaus" ).html('Valitse laite vasemmalta');
		
		}else{
			jQuery( "#laitteennimi" ).html("");
			jQuery( "#muokkaa" ).hide();
			jQuery( "#laitelista" ).hide();
			jQuery( ".frontpageinfo" ).show();
			jQuery( "#pagination" ).hide();
			jQuery( "#varaustietolinkki").hide();
			jQuery( "#laitteenkalenteri").hide();
		}
	}else if(id_item.value == "laitteet"){

		if(jQuery( "#laitelista" ).html() == ""){
			jQuery('#laitelista').load(templateDir+'/loops/loop-listaavaraukset.php');
		}
		jQuery( "#laitteennimi" ).html('');	
		jQuery( "#muokkaa" ).hide();
		jQuery( "#laitteenkalenteri" ).hide();
		jQuery( "#varaustietolinkki" ).show();
		jQuery( "#laitelista" ).show();
		jQuery( ".frontpageinfo" ).hide();
		jQuery( "#pagination" ).hide();
	}else{
		
		if(sivu == "index" || sivu== "varaus"){
		
			jQuery( "#"+jQuery( "#date_start" ).attr('name') ).css("background-color", "white");
			jQuery( "#"+jQuery( "#date_end" ).attr('name') ).css("background-color", "white");
			jQuery( "#kuljetusmuokkaa").val("");
			jQuery( "#varauksenhinta" ).html("");
			jQuery( "#lisaakohdeDivi" ).hide();
			jQuery( "#muokkaakohdeDivi" ).hide();
			jQuery( "#laitelista" ).hide();
			jQuery( "#muokkaa" ).show();
			jQuery( "#varaustietolinkki" ).hide();
			jQuery( ".frontpageinfo" ).hide();
			
			jQuery( "#date_start" ).attr('name', '');
			jQuery( "#date_end" ).attr('name', '');
			jQuery( "#date_start" ).html("");
			jQuery( "#date_end" ).html("");
			jQuery("input[name=date][value=date_start]").prop("checked", true);
			jQuery( "#paivienvalinta" ).show();	
			
			pickerdate = [];
			if(id_item.value){
				id_item = parseInt(id_item.value);
				name_item = jQuery("#laitteet>option:selected").html();
			}
			jQuery("#laitteet").val(id_item);
			check = isNaN(id_item);
			
			if(id_item != "" && check == false){	
                            
                            jQuery.ajax({
                                type: 'get',
                                 url: 'varaukset/tallennalaite/'+id_item,
                                 beforeSend: function(xhr) {
                                     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                 },
                                 success: function(response) {

                                     if (response) {

                                         $('#laitteenkalenteri').html(response.content);
                                     }
                                 },
                                 error: function(e) {
                                     alert("An error occurred: " + e.responseText.message);
                                     console.log(e);
                                 }
                         });
                            
				/*jQuery.post("items/tallennalaite/"+id_item, null, function(data){
					if(data.response == true){
						
						jQuery( "#laitteennimi" ).html(data.name_item);
						
						lisatietoja = data.lisatietoja.replace(/\\/g,"<br>");
						jQuery( "#laitteenlisatieto" ).html(lisatietoja);
						
						if(data.normaali_kuljetus){
							jQuery( "#normaali_kuljetus" ).html(data.normaali_kuljetus);
							
							var looptowns = data.normaali_kuljetus.split(',');
							var muokkaakaupungit_show = "";
							looptowns[i]
							for(var i = 0; i < looptowns.length; i++){
								func = 'poistaKaupunki("'+looptowns[i]+'");';
								deletelink = "<a href='#' onclick='"+func+"'>X</a>";
								
								muokkaakaupungit_show += "<div name='kaupunki' id='muokkaacity_"+looptowns[i]+"'>"+looptowns[i]+" "+deletelink+"</div>";
							}
							jQuery( "#muokkaakaupungit_show" ).html(muokkaakaupungit_show);
							jQuery( "#muokkaakaupungit" ).val(","+data.normaali_kuljetus);
							jQuery('#muokkaapaikka').val( data.paikka );
						}
						jQuery( "#nimi" ).val(name_item);
						lisatietoja_textarea = data.laite_lisatieto.replace(/\\/g,"\n");
						jQuery( "#lisatietoja" ).val(lisatietoja_textarea);
						jQuery( "#id_item" ).val(id_item);
						jQuery( "#pagination" ).hide();
						
						if(sivu == "index"){
							jQuery( "#laitteenkalenteri" ).html( "Ladataan kalenteria..." );
							jQuery("#pagination").show();
							jQuery( '#laitteenkalenteri' ).show();
							jQuery("#laitteenkalenteri").load('vihko/kalenterisivu/'+id_item);
							//jQuery("#laitteenkalenteri").load(templateDir+'/loops/loop-kalenterisivu.php?id_item='+id_item);
						}else{		
							jQuery( "#id_item" ).val(id_item);
							jQuery( ".varaus" ).html( "Ladataan lomaketta..." );
							jQuery( ".varaus" ).load(templateDir+'/loops/loop-varauslomake.php');
						}
						
					}else{
						alert("Tapahtui virhe");
					}
				}, 'json');*/
			
			}else{
				jQuery( "#varauslomake" ).hide();		
				jQuery( "#id_item" ).val("");		
				jQuery( "#laitteennimi" ).html('');	
				jQuery( "#pagination" ).hide();
				jQuery( ".varaus" ).html('Valitse laite vasemmalta');			
			}
		}
	}
}
function listaan(){

	if(jQuery( "#laitelista" ).html() == ""){
	
			jQuery('#laitelista').load(templateDir+'/loops/loop-listaavaraukset.php');
	}
	jQuery( '#laitelista' ).show();
	jQuery( "#varaustietolinkki" ).show();
	jQuery( "#muokkaa" ).hide();
	jQuery( "#muokkaakohdeDivi" ).hide();
	jQuery( "#paivienvalinta" ).hide();
	jQuery("#pagination").hide();
	
	jQuery( '#laitteenkalenteri' ).hide();
	
	jQuery("#laitteet").val("-");
}
/*function noitem(sivu, value){
	
	if(sivu == "varaus"){
		
	}else if(sivu == "index"){
		
		if(value == "hinnasto"){
			
		}else if(value == "laitteet"){
			alert("123");
			
		}
		
		
		jQuery( "#laitteenkalenteri" ).hide();
		jQuery( "#varaustietolinkki" ).show();
		jQuery( "#laitelista" ).show();
	}
}*/
function haeVaraus(vid){

	jQuery( "#light" ).show();
	jQuery( "#fade" ).show();
	
	jQuery.ajax({
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto=haeVaraus",
				data: {
					id : vid
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);

					if (jsonResponse['success'] == 1) {
					//alert("123");
					
					jQuery.fancybox.open({
						href : templateDir+'/loops/loop-yhteenveto.php',
						type : 'iframe',
						padding : 5
					});
					
					} else if (jsonResponse['success'] == 0) {
						alert("Tapahtui virhe");
					}
				}
			});	
}
function haeMenneetvaraukset(id_item,time,maara){

	if(time){
			id_tieto = "";
			tiedosto = "loop-listaavaraukset";
			divi = "laitelista";
			linkki = "varaustietolinkki";

		if(time == "expd"){

			newtime = "forward";
			text = "Näytä tulevat varaukset.";
			
			if(id_item != ""){
			
				divi = 'laitevarauslista';
				linkki = "laitetietolinkki";
				id_tieto = "id_item="+id_item+"&";
				tiedosto = "laitelistasivu";
				maarainfo = "";
			}else{

				maarainfo = "&maara="+maara;
			}
			url_end = "?"+id_tieto+"menneet=1"+maarainfo;
		}else{

			newtime = "expd";
			text = "Katso varaushistoria.";
			if(id_item != ""){
				divi = 'laitevarauslista';
				linkki = "laitetietolinkki";
				id_tieto = "?id_item="+id_item;
				tiedosto = "laitelistasivu";
			}
			url_end = id_tieto;
		}
		
		jQuery('#'+divi).load(templateDir+'/loops/'+tiedosto+'.php'+url_end);
		jQuery("#"+linkki).attr('onClick', "haeMenneetvaraukset('"+id_item+"','"+newtime+"',0);");
		jQuery("#"+linkki).html(text);
	}
}

function lisaaKaupunki(data,pre){
	edelliset_show = jQuery( "#"+pre+"kaupungit_show" ).html();
	edelliset = jQuery( "#"+pre+"kaupungit" ).val();
	paikka = data.value;
	func = 'poistaKaupunki("'+paikka+'");';
	deletelink = "<a href='#' onclick='"+func+"'>X</a>";
	jQuery( "#"+pre+"kaupungit_show" ).html(edelliset_show+"<div name='kaupunki' id='"+pre+"city_"+paikka+"'>"+paikka+" "+deletelink+"</div>");
	jQuery( "#"+pre+"kaupungit" ).val(edelliset+","+paikka);

}
function poistaKaupunki(data,pre){

	
	kaupungit = jQuery( "#"+pre+"kaupungit" ).val();
	
	kaupungit = kaupungit.replace(','+data, '');

	jQuery( "#"+pre+"kaupungit" ).val(kaupungit);
	jQuery( "#"+pre+"city_"+data ).remove();
}
function haelaskutustiedot(id){
	

	check = isNaN(id.value);
	if(id != "" && check == false){	

		jQuery.ajax({
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto=haeLaskutustieto",
				data: {
					id : id.value
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);

					if (jsonResponse['success'] == 1) {
						jQuery( "#email").val(jsonResponse['email']);
						jQuery( "#y_nimi").val(jsonResponse['y_nimi']);
						jQuery( "#y_tunnus").val(jsonResponse['y_tunnus']);
						jQuery( "#verkkolaskuosoite").val(jsonResponse['verkkolaskuosoite']);
						jQuery( "#operaattori").val(jsonResponse['operaattori']);
						jQuery( "#laskutusosoite_posti").val(jsonResponse['laskutusosoite_posti']);

	
						
					} else if (jsonResponse['success'] == 0) {
						alert("Tapahtui virhe");
					}
				}
			});
	}
}
function varaustietoihin(id_item){

	if(id_item){
			
		jQuery( "#laitteenkalenteri" ).hide();
		jQuery("#laitteetvaraus").load(templateDir+'/content_varaus.php?id_item='+id_item);
		
	}
}
function teeArray(dataArray){
	
		len = dataArray.length;

		dataObj = {};

	for (i=0; i<len; i++) {
		dataObj[dataArray[i].name] = dataArray[i].value;
		
	}
	return dataObj;
}
function yhteenVetoon(next){		

	if(jQuery( "#id_item" ).val() != ""){	

		if($.trim($('#vnimi').val()) != ''){
			jQuery( ".varaus" ).hide();
			jQuery( ".viestivaraus" ).show();
			var dataArray = jQuery("form").serializeArray();
			success = 1;
			success = suoritaTarkistukset(dataArray);


			boxit = tarkistaBoxit(dataArray);
			dataArray.push(boxit);
			jQuery.ajax({
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto=tallennasuccess",
				data: {
						success : success
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
				
					varaaLaite(dataArray, "tallennaSessioon", next);
				}
			});
		}else{
			
			alert("Kohde on tyhjä.");
		}
	}else{		
		alert("Valitse laite");	
	}
	
}
function vahvista(tilaok,toiminto, next){
	if(toiminto){
			
			jQuery( '#varauslomake' ).hide();
			jQuery( '#latausimage' ).show();
			jQuery.ajax({
				
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto="+toiminto,
				data: {
				tilaok:tilaok,
				nro:"1"
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);
				
					if (jsonResponse['success'] == 1) {
						jQuery( '#latausimage' ).hide();
						jQuery( '#varattuviesti' ).show();
						jQuery( '#laiteet' ).val("");
						tyhjenna();
						jQuery( '#response' ).html("Laite varattu");
						//alert('Kohde varattu');
						//window.location.href = next;
					} else if (jsonResponse['success'] == 0) {

						jQuery( '#response' ).html("Tapahtui virhe");
					}
				}
			});
		
	}

}
function varaaLaite(dataArray, toiminto, next) {
	
	if(dataArray){
			
			jQuery.ajax({
				
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto="+toiminto,
				data: jQuery.param(dataArray),
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);
				
					if (jsonResponse['success'] == 1) {

						jQuery( '#laitteetvaraus' ).hide();
						jQuery( '#laiteet' ).val("");
						tyhjenna();
						jQuery( '#response' ).html("Laite varattu");
						window.location.href = next;
					} else if (jsonResponse['success'] == 0) {

						jQuery( '#response' ).html("Tapahtui virhe");
					}
				}
			});
		
	}
}
function poistavaraus(){
	
    var r = confirm("Haluatko poistaa varauksen?");
    if (r == true) {
		id = jQuery( "#vid" ).val();
		
		jQuery.ajax({
				
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto=poistavaraus",
				data: {
					id : id
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);
				
					if (jsonResponse['success'] == 1) {
						jQuery( '#varauslomake' ).hide();
						jQuery( '#varattuviesti' ).show();
						setTimeout(function() { window.location.href = home_url; }, 2000);
					} else if (jsonResponse['success'] == 0) {

						jQuery( '#varattuviesti' ).html("Tapahtui virhe");
					}
				}
			});
    }
	
}
function tarkistakohteenpoisto(){
	id = jQuery( "#id_item" ).val();
	 var r = confirm("Haluatko poistaa kohteen?");
    if (r == true) {
		
		jQuery.ajax({
				
				type: 'POST',
				url: templateDir+"/jq_functions.php?toiminto=tarkistaKohteenvaraukset",
				data: {
					id : id
				},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				dataType: 'json',
				success: function(results) {
					var jsonResponse = eval(results);
				
					if (jsonResponse['success'] == 1) {
						var r1 = confirm("Kohde sisältää varauksia. Myös kohteen varaukset poistetaan. Haluatko jatkaa?");
						
						if(r1 == true){
							result = poistakohde(1,id);
							
						}
					} else if (jsonResponse['success'] == 0) {

						poistakohde(0,id);
					}
				}
			});
			
    }
	
}
function poistakohde(spetieto,id){
	
	if(id){	
	jQuery.ajax({
			
			type: 'POST',
			url: templateDir+"/jq_functions.php?toiminto=poistakohde",
			data: {
				spetieto : spetieto,
				id : id
			},
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			dataType: 'json',
			success: function(results) {
				var jsonResponse = eval(results);
			
				if (jsonResponse['success'] == 1) {
					
					//alert( "Kohde poistettu. Ladataan sivu." );
					if(alert("Kohde poistettu. Ladataan sivu.")){}
					else    window.location.reload();
					
				} else if (jsonResponse['success'] == 0) {

					jQuery( '#varattuviesti' ).html("Tapahtui virhe");
				}
			}
		});
	}
}
function disableSpecificDaysAndWeekends(date) {
	
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    var d = ("0" + date.getDate()).slice(-2);
    var y = date.getFullYear();
	//alert(m);
	//("0" + (this.getMonth() + 1)).slice(-2)
	//("0" + objDate.getDate()).slice(-2)
	
    for (var i = 0; i < varatutpaivat.length; i++) {
		
        if (jQuery.inArray(y + '-' + m + '-' + d, varatutpaivat) != -1 || new Date() > date) {

            return [false];
        }
    }
 
    var noWeekend = jQuery.datepicker.noWeekends(date);
    return noWeekend[0] ? noWeekend : [true];
}
function tyhjenna(){
	
	jQuery(':input','#varaaForm')
  .removeAttr('checked')
  .removeAttr('selected')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('');
	
}

function suoritaTarkistukset(dataArray){
	var nochecks = ["toimitus", "eitoimitusta", "teemasomistus", "valaistus", "gra_suunnittelu", "promo_hlot", "muuta", "s", "verkkolaskuosoite", "y_nimi", "y_tunnus", "verkkolaskuosoite", "operaattori", "laskutusosoite_posti", "email", "tietoaextra", "pika", "kuvaus"];	

		len = dataArray.length;
		dataObj = {};

	for (i=0; i<len; i++) {
		dataObj[dataArray[i].name] = dataArray[i].value;
		
		myobjval = dataArray[i].value;
		myobjname = dataArray[i].name;
		if(nochecks.indexOf(myobjname) == -1){
			if(myobjval == ""){
				jQuery( '#check'+myobjname ).css("color", "red");
				success = 0;

				
			}else{
				jQuery( '#check'+myobjname ).css("color", "black");

			}
		}
	}
	
	if(success == 1){

		date_start = formatdate(dataObj['date_start']);
		date_end = formatdate(dataObj['date_end']);
		success = testDate(date_start, date_end);
	}

	return success;
}

function testDate(date_start, date_end){

date_start = new Date(date_start);
date_end = new Date(date_end); 


if(varatutpaivat != 0){
 success = tarkistaPaivienvali(date_start,date_end,varatutpaivat);
}
if(success == 0){

	jQuery( '#checkdate_start' ).css("color", "red");
	jQuery( '#checkdate_start' ).html("Valintojen välissä on jo valittu ajankohta");
	
	return success;
}

 if (date_start <= date_end){
	success = 1;

	jQuery( '#checkdate_start' ).html("Varaus alkaa");
	
 }else{

		success == 0;
			jQuery( '#checkdate_start' ).css("color", "red");
			jQuery( '#checkdate_start' ).html("Tarkista päivämäärät!");
  }
  return success;

}
function tarkistaPaivienvali(date_start,date_end,varatutpaivat){
		

		between = [];
		currentDate = new Date(date_start);
		//4.2.2015 Lisätty new date
		date_end = new Date(date_end);

		while (currentDate <= date_end) {

			between.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		

		success = in_array(varatutpaivat, between);
		
		return success;
}
function tarkistaBoxit(dataArray){
	
	if(jQuery("#teemasomistus").is(':checked')){
		teemasomistus = 1;

	}else{
		teemasomistus = 0;

	}
	if(jQuery("#valaistus").is(':checked')){
		valaistus = 1;

	}else{
		valaistus = 0;

	}
	if(jQuery("#gra_suunnittelu").is(':checked')){
		gra_suunnittelu = 1;

	}else{
		gra_suunnittelu = 0;

	}
	if(jQuery("#promo_hlot").is(':checked')){
		promo_hlot = 1;

	}else{
		promo_hlot = 0;

	}
	if(jQuery("#pika").is(':checked')){
		pika = 1;

	}else{
		pika = 0;

	}
	if(jQuery("#mv_update").is(':checked')){
		mv_update = 1;

	}else{
		mv_update = 0;

	}
	
	var result = {teemasomistus:teemasomistus, valaistus:valaistus, gra_suunnittelu:gra_suunnittelu, promo_hlot:promo_hlot, mv_update:mv_update, pika:pika};

	return result;
}
function avaaVaraus(id_item){
	
	jQuery( "#sulje_"+id_item ).show();
	jQuery( "#muuta_"+id_item ).hide();
	jQuery( "#varauslisatieto_"+id_item ).show();
}
function suljeVaraus(id_item){

	jQuery( "#sulje_"+id_item ).hide();
	jQuery( "#muuta_"+id_item ).show();
	jQuery( "#varauslisatieto_"+id_item ).hide();
}
function formatdate(date){

var y = date.substring(6);
var m = date.substring(3,5);
var d = date.substring(0,2);
newdate = y + "-" + m + "-" + d

return newdate;
}
function in_array(varatutpaivat, daysarray){

	if(varatutpaivat && daysarray){

		success = 1;
		for (var i=0, len=daysarray.length;i<len;i++) {
		
			var m = ("0" + (daysarray[i].getMonth() + 1)).slice(-2);
			var d = ("0" + daysarray[i].getDate()).slice(-2);
			var y = daysarray[i].getFullYear();

			if(jQuery.inArray(y+'-'+m+'-'+d, varatutpaivat) != -1){

			success = 0;

			return success;
			}
		}
		return success;
	}
}
