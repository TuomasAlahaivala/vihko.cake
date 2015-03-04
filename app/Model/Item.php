<?php

/* 
 * Author: Tuomas Alahäivälä 26.2.2015
 * File: Laite.php
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Item extends AppModel {
    
    public $useTable = 'items';
    
    public function haeLaite($id){
        
        $laite = $this->findById($id);
        
        return $laite;
    }
}
