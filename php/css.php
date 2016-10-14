<?php 
    header("Content-Type: text/css"); 
    
    $origColor1 = "03a9f4";
    $origColor2 = "ff9800";

    //get the data from the query string
    $color1 = $_GET['c1'];
    $color2 = $_GET['c2'];

    echo "/*";
    echo "\n\n";
    
    // get the data from the CSS file as a string
    $myCSS = file_get_contents('http://cdn.ttgtmedia.com/microsites/artdemo/css/style-responsive.css');

    // swap out color 1
    // does color exist and is it hexidecimal?
    if ( $color1 && preg_match('/^[a-f0-9]{6}$/i', $color1) ) {
        // syntax: str_replace(find,replace,string,count);
        $myCSS = str_ireplace($origColor1, $color1, $myCSS, $Count1);
        echo "$Count1 instances of $origColor1 replaced with Color1: $color1";
        echo "\n\n";
    } else {
        echo "Color 1 did not exist or was not hexidecimal";
        echo "\n\n";
    }
    
    // swap out color 2
    // does color exist and is it hexidecimal?
    if ( $color1 && preg_match('/^[a-f0-9]{6}$/i', $color2) ) {
        // syntax: str_replace(find,replace,string,count);
        $myCSS = str_ireplace($origColor2, $color2, $myCSS, $Count2);
        echo "$Count2 instances of $origColor2 replaced with Color2: $color2";
        echo "\n\n";
    } else {
        echo "Color 2 did not exist or was not hexidecimal.";
        echo "\n\n";
    }

    echo "*/";
    echo "\n\n";
    
    // output updated CSS to browser
    echo $myCSS;

?>