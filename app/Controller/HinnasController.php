<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class HinnasController extends AppController {
    public $helpers = array('Html', 'Form');

    public function index() {
    }
    public function haehinnat() {
         $this->request->onlyAllow('ajax');

         $this->viewClass = 'Tools.Ajax';
       // $this->loadModel('Data.CountryProvince');

        $data = $this->Hinna->findById(1);
        $this->set(compact('data'));
    }
}