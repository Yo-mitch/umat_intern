<?php
require_once __DIR__ . '/../models/Email.php';

$model = new Email();
$row = $model->getLatest();

if ($row) {
    $firstname = $row['first_name'];
    $surname = $row['surname'];
    $programmeCode = $row['programme_code'];
    $referenceNumber = $row['reference_number'];

    $firstInitial = strtolower(substr($firstname, 0, 1));
    $lastFourDigits = substr($referenceNumber, -4);
    $email = strtolower($programmeCode) . "-" . $firstInitial . strtolower($surname) . $lastFourDigits . "@st.umat.edu.gh";
} else {
    $email = "No record found.";
}
?>

<h3>Hurray!🚀</h3>
<p>Your Email is: <strong><?= htmlspecialchars($email) ?></strong></p>

