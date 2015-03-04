<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App::import('Model', 'Item');
class VarauksetController extends AppController {
    public $helpers = array('Html', 'Form');
    
    public function index() {
    }
    public function tallennalaite($id = null) {
        $this->request->onlyAllow('ajax');
        if(!$id){
            throw new NotFoundException(__('Invalid id'));
        }
        $this->viewClass = 'Tools.Ajax';
        
        $varaukset = $this->Varaukset->haeLaiteenvaraustiedot($id,date("Y"),date("m"));
        
        
        $this->set(compact('id'));
        $items = new Item;
        
        $laite = $items->haeLaite($id);
        $this->set(compact('laite'));
        
        $this->set(compact('varaukset'));
    }
    public function haevaraukset($id = null) {
		//git test line
        $this->request->onlyAllow('ajax');
        $year = $this->request->data('year');
        $month = $this->request->data('month');
     
         $this->viewClass = 'Tools.Ajax';
       // $this->loadModel('Data.CountryProvince');

        $varaukset = $this->Varaukset->haeLaiteenvaraustiedot($id,$year,$month);
        $this->set(compact('data'));
    }

}