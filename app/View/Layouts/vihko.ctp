<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Vihko</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
<?php
echo $this->Html->css(array(
    'datepicker',
    'jquery.fancybox',
    'jquery.timepicker',
    'login',
    'normalize',
    'style',
    'vihko_style'
));
echo $this->Html->script(array(
    'jquery.min',
    'jquery-1.7.1.min',
    'jquery-ui-1.8.18.custom.min',
    'jquery.fancybox',
    'jquery.fancybox.pack',
    'bootstrap-datepicker',
    'bootstrap',
    'bootstrap.min',
    'html5shiv',
    'jquery.timepicker',
    'jquery.timepicker.min',
    'jscalender',
    'respond.min',
    'vihkofunctions'));
?>
<script type="text/javascript">
	$.noConflict();
	jQuery(document).ready(function($){
		$("#lisaa").click(function(){
		$(".hide").stop().slideToggle("slow");
		$(".page").stop().animate({"margin-top":"120px"}, "slow")
		}, function() {
		$(".page").stop().animate({"margin-top":"0"}, "slow")
		$(".hide").stop().slideToggle("slow");
  });
});
jQuery("#inline").fancybox();
</script>

<!-- Include external files and scripts here (See HTML helper for more info.) -->
<?php
 


echo $this->fetch('meta');
echo $this->fetch('css');
echo $this->fetch('script');
?>
</head>
<body>

<!-- If you'd like some sort of menu to
show up on all of your views, include it here -->
<div id="wrapper">
    <div id="header">

        <h2 class="title"><a href="vihko.cake">Vihko</a></h2>


        <ul class="navigation">
                <li>Laitteet</li>
                <li>Varaus</li>
                <li>Yhteenveto</li>
        </ul>
</div>

<!-- Here's where I want my views to be displayed -->
<div class="container">
<?php echo $this->fetch('content'); ?>
</div>
<!-- Add a footer to each displayed page -->
</div>

</body>
</html>
