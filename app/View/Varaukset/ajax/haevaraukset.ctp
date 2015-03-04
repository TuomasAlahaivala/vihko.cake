<?php

	//$varaukset = $laite->haeLaiteenvaraustiedot($id_item,$month,false);
	//var_dump($varaukset);

	$calendar= '';

	$year = date('Y');
	$month = date('m');

if($year != "" && $month != ""){
	/* draw table */
	//$calendar = '<table cellpadding="0" cellspacing="0" class="calendar">';

	/* table headings */
	$headings = array('','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai','Sunnuntai');

	//$calendar= '<thead><tr><td>'.implode('</td><td class="calendar-day-head">',$headings).'</td></tr></thead>';

	/* days and weeks vars now ... */
	$running_day = date('w',mktime(0,0,0,$month,1,$year));
	//$running_day = $running_day - 1;
	$days_in_month = date('t',mktime(0,0,0,$month,1,$year));
	$days_in_this_week = 1;
	$day_counter = 0;
	$dates_array = array();

	/* row for week one */
	$calendar.= '<tr>';

	$ddate = $year."-".$month."-1";
	$date = new DateTime($ddate);
	$week = $date->format("W");

	$calendar.= '<th class="ui-state-default ui-widget ui-widget-header">'.$week.'</th>';
	/* print "blank" days until the first of the current week */

	if($running_day == 0){
		$running_day = 6;
	}else{
		$running_day = $running_day - 1;
	}

	for($x = 0; $x < $running_day; $x++):
		$calendar.= '<td class="phpc-date ui-state-default phpc-shadow ui-widget">-</td>';
		$days_in_this_week++;
	endfor;

	/* keep going with days.... */
	for($list_day = 1; $list_day <= $days_in_month; $list_day++):

		if(strlen($list_day) == 1){
			$list_day = "0".$list_day;
		}
		if(strlen($month) == 1){
			$month = "0".$month;
		}
		//yyyy-mm-dd
			$str = $year."-".$month."-".$list_day;
			$date = date("Y-m-d", strtotime($str));
			$today = date("Y-m-d");
                        $jsfunctio = "";
                        $color = "";
                        $title = "";
                        $isinarray = false;
			if($date > $today){
                               
				$color = "white";
				$jsfunctio = 'onClick="valitsepaiva(this)"';
				$back = "";
				if(isset($varaukset['datees'])){
                                    //var_dump($varaukset);
                                       foreach($varaukset['datees'] as $id => $dates){
                                           foreach($dates as $date_start => $date_end){
                                                if($str >= $date_start && $str <= $date_end){

                                                    $isinarray = 1;
                                                    $varausid = $id;
                                                    break;
                                                }
                                                   
                                                
                                            }   
                                        }
					if (isset($isinarray) && $isinarray == 1) {
                                        
						if($varaukset[$varausid]['data']['Varaukset']['tila'] == 1){
                                                 
							$color = "green";
							$jsfunctio = "";

						}else if($varaukset[$varausid]['data']['Varaukset']['tila'] == 0){
                                               
							$color = "yellow";

						}

						$back = "background-color: ".$color.";";
						if(isset($varaukset[$varausid]['data']['Varaukset']['paikka'])){
							$title = "Paikka: ".$varaukset[$varausid]['data']['Varaukset']['paikka'];
						}

					}
				}
			}else{
                             
				$back = "background-color:gray;";

			}

		$calendar.= '<td id="'.$list_day.$month.$year.'" '.$jsfunctio.' class="ui-widget ui-widget-content" value="'.$list_day.'.'.$month.'.'.$year.'" style="'.$back.'">';
			/* add in the day number */
			$calendar.= '<div id="'.$list_day.$month.$year.'_color" style="display:none;">'.$color.'</div><div class="phpc-date ui-state-default phpc-shadow ui-widget">'.$list_day.'<div class="varauspaikannimi" style="padding-top:10px;">'.$title.'</div></div>';

			/** QUERY THE DATABASE FOR AN ENTRY FOR THIS DAY !!  IF MATCHES FOUND, PRINT THEM !! **/
			//$calendar.= str_repeat('<p> </p>',2);

		$calendar.= '</td>';
		if($running_day == 6):
			$calendar.= '</tr>';
			if(($day_counter+1) != $days_in_month):
				$calendar.= '<tr>';
				$week = $week + 1;
				$calendar.= '<th class="ui-state-default ui-widget ui-widget-header">'.$week.'</th>';
			endif;
			$running_day = -1;
			$days_in_this_week = 0;
		endif;
		$days_in_this_week++; $running_day++; $day_counter++;
	endfor;

	/* finish the rest of the days in the week */
	if($days_in_this_week < 8):
		for($x = 1; $x <= (8 - $days_in_this_week); $x++):
			$calendar.= '<td class="phpc-date ui-state-default phpc-shadow ui-widget">-</td>';
		endfor;
	endif;

	/* final row */
	$calendar.= '</tr>';

	/* end the table */
	//$calendar.= '</table>';

	/* all done, return result */
	echo $calendar;

/* sample usages */
}
?>