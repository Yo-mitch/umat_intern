
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Set Your Password</title>
</head>
<body>
    <h2>Set Your New Password</h2>
    <form action="set_password.php" method="POST">
        <label>Reference Number:</label>
        <input type="text" name="reference_number" value="<?php echo isset($_GET['ref']) ? htmlspecialchars($_GET['ref']) : ''; ?>" required><br><br>

        <label>New Password:</label>
        <input type="password" name="new_password" required><br><br>

        <button type="submit">Set Password</button>
    </form>
</body>
</html>
