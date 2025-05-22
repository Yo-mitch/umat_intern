<?php
//including the connection string
require_once("include/connection.php");

//algorithm for the getting the latest stored data

// 1. arrange in descending order and
// 2. make the limit one to just retrieve the latest stored data
$query = "SELECT * FROM login ORDER BY id DESC LIMIT 1";

//save the result
$result = mysqli_query($connection, $query);

//fetching the data from the database as an associative array using mysqli_fectch_assoc
// and saves it into the row
if ($row = mysqli_fetch_assoc($result)) {
    //this stores the row of the first name into the firstname variable
    $firstname = $row['first_name'];
    $surname = $row['surname'];
    $programmeCode = $row['programme_code'];
    $referenceNumber = $row['reference_number'];
    // $domain = $row['domain'];

    // *****************Generate email****************
    // taking the first letter of the firstname 
    // 1. extract a subset of the firstname(substr)
    // 2. subset should start from index 0 and extract 1 character, so basically the first character
    // 3. change the characters to lowercase and store it in the firstinitial
    $firstInitial = strtolower(substr($firstname, /*start*/0,  1/*number of characters*/));

    // extracts the last four digits starting from the end, negative means would always begin from the end
    $lastFourDigits = substr($referenceNumber, -4);

    //the email format.
    $email = strtolower($programmeCode). "-". $firstInitial . strtolower($surname) . $lastFourDigits . "@st.umat.edu.gh";
} else {
    $email = "No record found.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Email Generated</title>
</head>
<body>
    <h2>Sign-up Successful!</h2>
    <!-- check if row is declared -->
    <?php if (isset($row)): ?>
        <h3> Hurray!🚀 </h3>
        <p> Your Email is : <p><strong><?php echo htmlspecialchars($email); ?></strong></p> </p>
        <p><a href="resetpassword.php">Click here to set your password</a></p>
    <?php else: ?>
        <p><?php echo $email; ?></p>
        <!-- a link to set new password -->
    <?php endif; ?>
</body>
</html>
