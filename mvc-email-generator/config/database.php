<?php
class Database {
    private $host = "localhost";
    private $user = "intern";
    private $pass = "Intern@UMaT";
    private $dbname = "interndb";
    public $conn;

    public function connect() {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }

        return $this->conn;
    }
}

