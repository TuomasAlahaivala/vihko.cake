var tdate = new Date();
var MM = tdate.getMonth() + 1; //yields month
var yyyy = tdate.getFullYear(); //yields year
yyyy = parseInt(yyyy);
nextyearnow = yyyy + 1;
lastyearnow = yyyy - 1;
var pickdate = 0;
var pickerdate = [];
function haeKuukausi(value, ym, id_item){

	$('#kalenterisisalto').html("");
	
	if(ym == 'm'){
		
		$( "#m" ).val(value.value);

	}else{
		$( "#y" ).val(value.value);
	}
	
	var y = $( "#y" ).val();
	var m = $( "#m" ).val();
	
	if(y == lastyearnow && m == 1){
		
		$("#lastmonthButton").hide();		
	}else{
		$("#lastmonthButton").show();
	}
	if(y == nextyearnow && m == 12){
		
		$("#nextmonthButton").hide();		
	}else{
		$("#nextmonthButton").show();	
	}
	
	$('#kalenterisisalto').load(templateDir+'/loops/content_kalenteri.php?y='+y+'&m='+m+'&id_item='+id_item);
	
}
function vahennaKuukausi(id_item){
	
	$("#nextmonthButton").show();
	$('#kalenterisisalto').html("");
	year = $( "#y" ).val();
	year = parseInt(year);
	month = $( "#m" ).val();
	month = parseInt(month);
	lastyear = year
	m = month - 1;
	if(m == 0){
	
		lastyear = year - 1;
		m = 12;
		$( "#m" ).val( m );
		$( "#y" ).val( lastyear );
		$('#year').val( lastyear );
	}else{
	
		$( "#m" ).val( m );
	}
	if(lastyear == lastyearnow && m == 1){
		
		$("#lastmonthButton").hide();		
	}
	$('#month').val(m);
	var y = $( "#y" ).val();
	var m = $( "#m" ).val();
	$('#kalenterisisalto').html('/loops/content_kalenteri.php?y='+y+'&m='+m+'&id_item='+id_item);
        
        jQuery.ajax({
                type: 'POST',
                 url: 'varaukset/haevaraukset/'+id_item,
                 data: {
                    month : m,
                    year : y
                },
                 beforeSend: function(xhr) {
                     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                 },
                 success: function(response) {

                     if (response) {

                         $('#kalenterisisalto').html(response.content);
                     }
                 },
                 error: function(e) {
                     alert("An error occurred: " + e.responseText.message);
                     console.log(e);
                 }
         });
        
}
function lisaaKuukausi(id_item){

	$("#lastmonthButton").show();
	$('#kalenterisisalto').html("");
	year = $( "#y" ).val();
	year = parseInt(year);
	month = $( "#m" ).val();
	month = parseInt(month);
	nextyear = year;
	m = month + 1;
	if(m == 13){
	
		nextyear = year + 1;
		m = 1;
		$( "#m" ).val( m );
		$( "#y" ).val( nextyear );
		$('#year').val(nextyear);
	}else{
		$( "#m" ).val( m );
	}

	if(nextyear == nextyearnow && m == 12){
		
		$("#nextmonthButton").hide();		
	}
		
	$('#month').val(m);
	var y = $( "#y" ).val();
	var m = $( "#m" ).val();
	$('#kalenterisisalto').load(templateDir+'/loops/content_kalenteri.php?y='+y+'&m='+m+'&id_item='+id_item);

}
function valitsepaiva(date){
	if(date){
		
		date_value = date.attributes["value"].value;
		isinarray = jQuery.inArray(date_value, pickerdate);
		bgcol = jQuery( "#"+date.id+"_color" ).html();

		if(isinarray != -1){
			pickerdate.splice(isinarray, 1);
			jQuery( "#"+date.id ).css("background-color", bgcol);
		}else{
		pickerdate.push(date_value);
		jQuery( "#"+date.id ).css("background-color", "#3399FF");

		}
		if(pickerdate.length > 1){
			
			date1 = new Date(formatdate(pickerdate[0]));
			date2 = new Date(formatdate(pickerdate[1]));

			if(date1 > date2){
				date_start = date2;
				date_start_index = 1;
				date_end = date1;
				date_end_index = 0;
			}else{
				date_start_index = 0;

				date_start = date1;
				date_end_index = 1;
				date_end = date2;
			}
			for (var i = 1; i < pickerdate.length; i++) {
				
				testvalue = new Date(formatdate(pickerdate[i]));

				if(testvalue < date_start){
					date_start = testvalue;
					date_start_index = i;
				}else if(testvalue > date_end){
					date_end = testvalue;
					date_end_index = i;
				}

			}
			//alert(date_start);
			//alert(date_end);
			date_start = pickerdate[date_start_index];
			date_end = pickerdate[date_end_index];
			testdate_start = formatdate(date_start);
			testdate_end = formatdate(date_end);
			success = 1;
			
			if(varatutpaivat != 0){
				success = tarkistaPaivienvali(testdate_start,testdate_end,varatutpaivat);
			}
			if(success == 1){
				jQuery( "#valitutpaivat" ).html("<div>Valitut päivät:</div>"+date_start+" - "+date_end);
				laskeVuokra(date_start,date_end);
				func_tallennapaivat(date_start,date_end);
			}else{
				alert('Virhe valittaessä päiviä');
			}
		}else{
			jQuery( "#valitutpaivat" ).html("");
			jQuery( "#varauksenhinta" ).hide();
		}
	}
}
function func_tallennapaivat(date_start,date_end){

	if(date_start && date_end){

		jQuery.ajax({
			type: 'POST',
			url: templateDir+"/jq_functions.php?toiminto=tallennaPaivat",
			data: {
				date_start : date_start,
				date_end : date_end
			},
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			dataType: 'json',
			success: function(results) {
				var jsonResponse = eval(results);
				if (jsonResponse['success'] == 1) {
										
				} else if (jsonResponse['success'] == 0) {
						
				}
			}
		});
	}
}