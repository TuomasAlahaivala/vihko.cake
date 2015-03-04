<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<div id="lisaakohdeDivi" style="display:none;">
<?php
echo $this->Form->create('Post', array('label' => false));
echo $this->Form->input('nimi', array('placeholder' => 'Lisää uusi kohde', 'label' => false));
echo $this->Form->input('paikka', array(
    'options' => array(
        "Helsinki" => "Helsinki", 
        "Oulu" => "Oulu", 
        "Jyväskylä" => "Jyväskylä"),
    'empty' => 'Tuotteen paikka',
    'div' => 'styled-select',
    'label' => false
));
echo $this->Form->textarea('lisatietoja', array('escape' => false, 'placeholder' => 'Lisätiedot', 'label' => false));
echo $this->Form->input('formtype', array('type' => 'hidden', 'value' => 'lisaa','label' => false));?>
<p>Valitse normaalikuljetuskaupungit.</p>
<?php
sort($cities);
echo $this->Form->input('laitteet', array(
    'options' => array($cities),
    'empty' => '-',
    'div' => 'styled-select',
    'label' => false
));
echo $this->Form->input('kaupungit', array('type' => 'hidden', 'label' => false));
?><div id="kaupungit_show"></div><?php
echo $this->Form->end('Lisää');
?>
</div>
