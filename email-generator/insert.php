<!-- this is insert.php file. this file should be triggered after when the sign up button is clicked.
it checks the validity of the information provided and pushes them to the databases.

NB: the GET method was used in this program just for practicing purposes. -->

<?php
    //getting the connection from the connection file in the include folder
    require_once("include/connection.php");

    //getting our data and storing them
    $firstname = $_POST["firstname"];
    $surname = $_POST["surname"];
    $programmeCode = $_POST["programme-code"];
    $referenceNumber = $_POST["reference-number"];
    // $domain = $_POST["domain"];

    //user authentication
    if (isset($_POST["submit"])) {
        if (empty($firstname) || empty($surname) || empty($programmeCode) || empty($referenceNumber)){
            echo "fill in the blanks";
        } 
        // Validate programme code: only letters, 2 characters max
        elseif (!preg_match('/^[A-Za-z]{1,2}$/', $programmeCode)) {
            echo "Programme code must be letters only and not more than 2 characters.";
        }
        // Validate reference number: only digits, max length 10
        elseif (!preg_match('/^\d{1,10}$/', $referenceNumber)) {
            echo "Reference number must be digits only and not more than 10 digits.";
        }
        else{
            //code snippet to push data into the database
            // insert into table (name of table columns created) where (the respective values for the tables)
            $query = " INSERT INTO  login (first_name,  surname, programme_code, reference_number) VALUES ('$firstname', '$surname', '$programmeCode', '$referenceNumber' )";

            //real pushing is done here
            $result = mysqli_query($connection, $query);

            //checking if push was successful
            if ($result){
                //open the view page
                header("location: view.php");

            }else{
                //still be at the index file
                header("location: index.html");
            }
        }
    }
    else{
        echo "submit not set!";
    }
?>
