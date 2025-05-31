<?php
//including the connection string
require_once("include/connection.php");

//algorithm for the getting the latest stored data

// 1. arrange in descending order and
// 2. make the limit one to just retrieve the latest stored data
$query = " SELECT * FROM login ORDER BY id DESC LIMIT 1 ";

//save the result
$result = mysqli_query($connection, $query);

//fetching the data from the database as an associative array using mysqli_fectch_assoc
// and saves it into the row
if ($row = mysqli_fetch_assoc($result)) {
    //this stores the row of the first name into the firstname variable
    $firstname = $row["first_name"];
    $surname = $row["surname"];
    $programmeCode = $row["programme"];
    $referenceNumber = $row["reference_number"];
    // $domain = $row['domain'];

    // *****************Generate email****************
    // taking the first letter of the firstname 
    // 1. extract a subset of the firstname(substr)
    // 2. subset should start from index 0 and extract 1 character, so basically the first character
    // 3. change the characters to lowercase and store it in the firstinitial
    $firstInitial = strtolower(substr($firstname, /*start*/0,  1/*number of characters*/));

    // extracts the last four digits starting from the end, negative means would always begin from the end
    $lastFourDigits = substr($referenceNumber, -4);

    // getting the programme code between brackets
    $startChar = '(';
    $endChar = ')';

    $lower = strtolower($programmeCode);
    $startIndex = strpos($lower, strtolower($startChar));
    $endIndex = strpos($lower, strtolower($endChar));

    $extractingProgrammeCode = '';

    if ($startIndex === false || $endIndex === false || $endIndex <= $startIndex) {
        $extractingProgrammeCode = "Start or end character not found, or in wrong order.";
    } else {
        $result = substr($lower, $startIndex + 1, $endIndex - $startIndex - 1);
        $extractingProgrammeCode = $result;
    }

    //the email format.
    $email = strtolower($extractingProgrammeCode). "-". $firstInitial . strtolower($surname) . $lastFourDigits . "@st.umat.edu.gh";
} else {
    $email = "No record found.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Email Generated</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
</head>

<!--     Auto redirect after a delay-->
<script> 
  setTimeout(() => {
    window.location.href = "login.php"; // or "index.html" or wherever home is
  }, 7000);
</script>

<body class="success-body">
    <div class="success-card">
        <?php if (isset($row)): ?>
            <h2 class="success-title">🎉 Email Generated Successfully!</h2>
            <p class="success-msg">Your official email address is:</p>
            <p class="email-display"><?php echo htmlspecialchars($email); ?></p>
        
            <p class="email-display" id="generatedEmail"><?php echo htmlspecialchars($email); ?></p>
            <button class="copy-btn" data-clipboard-target="#generatedEmail">Copy Email</button>

            <a class="reset-link" href="resetpassword.php">Reset your password</a>
        <?php else: ?>
            <p class="error-msg"><?php echo $email; ?></p>
        <?php endif; ?>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js"></script>
    <script>
      const clipboard = new ClipboardJS('.copy-btn');
    
      clipboard.on('success', function(e) {
        e.trigger.textContent = 'Copied!';
        setTimeout(() => {
          e.trigger.textContent = 'Copy Email';
        }, 2000);
        e.clearSelection();
      });
    
      clipboard.on('error', function(e) {
        alert('Copy failed. Please copy manually.');
      });
    </script>

</body>
</html>

