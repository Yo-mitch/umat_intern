
<?php
require_once __DIR__ . '/../models/Email.php';

class EmailController {
    private $model;

    public function __construct() {
        $this->model = new Email();
    }

    public function handleFormSubmission() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
            $firstname = $_POST['firstname'];
            $surname = $_POST['surname'];
            $programmeCode = $_POST['programme-code'];
            $referenceNumber = $_POST['reference-number'];

            // Validation
            if (empty($firstname) || empty($surname) || empty($programmeCode) || empty($referenceNumber)) {
                echo "Fill in the blanks!";
                return;
            }

            if (!preg_match('/^[A-Za-z]{1,2}$/', $programmeCode)) {
                echo "Programme code must be 1–2 letters only.";
                return;
            }

            if (!preg_match('/^\d{1,10}$/', $referenceNumber)) {
                echo "Reference number must be 1–10 digits.";
                return;
            }

            // Store data
            $success = $this->model->insert([
                'firstname' => $firstname,
                'surname' => $surname,
                'programmeCode' => $programmeCode,
                'referenceNumber' => $referenceNumber
            ]);

            if ($success) {
                header("Location: ../app/views/result.php");
            } else {
                echo "Failed to insert data.";
            }
        } else {
            echo "Invalid access.";
        }
    }
}
