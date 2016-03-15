<?php
    
ini_set("display_errors", true);

$myVar = $_GET['msg'];

if (strpos($myVar, "meow") !== false) 
{
    print_r(str_replace("meow","go",$myVar));
}

elseif (strpos($myVar, "nap") !== false) 
{
    print_r(str_replace("nap","stop",$myVar));
}

?>