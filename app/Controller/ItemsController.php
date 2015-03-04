<?php

/* 
 * Author Tuomas Alahäivälä 26.2.205
 * File: LaitteetController.php
 */
class ItemsController extends AppController {
    public $helpers = array('Html', 'Form', 'Autoload');

    public function index() {
        $this->layout= 'vihko';
        $this->set('laitteet', $this->Item->find('all'));
    }
}

