<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App::uses('AppController', 'Controller');
class ToolsAppController extends AppController {
public $components = ['Tools.Common'];
public $helpers = ['Tools.Common', 'Tools.Format', 'Tools.Datetime', 'Tools.Numeric'];
}
