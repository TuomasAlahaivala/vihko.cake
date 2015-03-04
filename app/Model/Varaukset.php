<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Varaukset extends AppModel {
    
    public $useTable = 'varaukset';
    public $dbTabletiedot;
    
    public function haeMonthvaraukset($id_item,$year,$month = ""){
        
        $conditions = array(
            'id_item' => $id_item,
            'date_end >= CURDATE()',
            'OR' => array(
                array(
                    'MONTH(date_end)' => $month,
                    'YEAR(date_end)' => $year,
                ),
                array(
                   'MONTH(date_start)' => $month,
                   'YEAR(date_start)' => $year, 
                ),
            ),
        );
        $myrows =  $this->find('all', array(
            'conditions' => $conditions
        ));
        return $myrows;
    }
    
    public function haeLaiteenvaraustiedot($id_item,$year, $month){
		
        if($id_item != ""){		

            $_SESSION["id_item"] = $id_item;
            
            $myrows = $this->haeMonthvaraukset($id_item,$year,$month);
            
            $varaukset = array();
            //var_dump($myrows);
            foreach ( $myrows as $myrow ) {		
                $varaukset['datees'][$myrow['Varaukset']['id']] = array(
                        $myrow['Varaukset']['date_start'] => 
                        $myrow['Varaukset']['date_end']);
                //echo $myrow['Varaukset']['id'];
                $varaukset[$myrow['Varaukset']['id']]['data'] = $myrow;
            }
            $varaukset['dates'] = 0;
           // print_r($varaukset);
            return $varaukset;
        }
    }
}