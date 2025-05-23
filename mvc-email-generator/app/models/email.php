<?php
require_once __DIR__ . '/../../config/database.php';

class Email {
    private $conn;
    private $table = 'login';

    public function __construct() {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function insert($data) {
        $stmt = $this->conn->prepare(
            "INSERT INTO $this->table (first_name, surname, programme_code, reference_number)
             VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param("sssi", $data['firstname'], $data['surname'], $data['programmeCode'], $data['referenceNumber']);
        return $stmt->execute();
    }

    public function getLatest() {
        $result = $this->conn->query("SELECT * FROM $this->table ORDER BY id DESC LIMIT 1");
        return $result->fetch_assoc();
    }
}

