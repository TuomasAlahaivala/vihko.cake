<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

echo $this->Form->create('Post');
echo $this->Form->input('perusmaksu', array('value' => $data['Hinna']['perusmaksu']));
echo $this->Form->input('lisamaksu', array('value' => $data['Hinna']['lisamaksu']));
echo $this->Form->input('pidempiaika', array('value' => $data['Hinna']['pidempiaika']));
echo $this->Form->input('normaali_kuljetus', array('value' => $data['Hinna']['normaali_kuljetus']));
echo $this->Form->input('suuri_etaisyys', array('value' => $data['Hinna']['suuri_etaisyys']));
echo $this->Form->input('pika', array('value' => $data['Hinna']['pika']));
echo $this->Form->input('valoperusmaksu', array('value' => $data['Hinna']['valoperusmaksu']));
echo $this->Form->input('valolisamaksu', array('value' => $data['Hinna']['valolisamaksu']));
echo $this->Form->input('gra_maksut', array('value' => $data['Hinna']['gra_maksut']));
echo $this->Form->input('mv_update', array('value' => $data['Hinna']['mv_update']));
echo $this->Form->input('formtype', array('type' => 'hidden', 'value' => 'muutahintoja'));
echo $this->Form->end('Muuta');
?>
