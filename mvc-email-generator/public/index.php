
<?php
require_once __DIR__ . '/../app/controllers/EmailController.php';

$controller = new EmailController();
$controller->handleFormSubmission();
