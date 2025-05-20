<?php
    //this snippet holds the connection to the database
    $connection = mysqli_connect("localhost", "intern", "Intern@UMaT", "interndb");

    //check if the connection is successful
    if (!$connection){
        die("connection failed"). mysqli_connect_error();
    }else{
        echo "connection successful!";
    }
?>