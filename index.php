<?php
// New Tailwind-based homepage for the refreshed site
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Swarnandhra — New Site</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
</head>
<body class="bg-gray-50 text-gray-900">
    <?php include_once(__DIR__ . '/includes/header.php'); ?>
    <main>
        <?php include_once(__DIR__ . '/sections/banner.php'); ?>
        <?php include_once(__DIR__ . '/sections/courses.php'); ?>
        <?php include_once(__DIR__ . '/sections/facilities.php'); ?>
        <?php include_once(__DIR__ . '/sections/placements.php'); ?>
    </main>
    <?php include_once(__DIR__ . '/includes/footer.php'); ?>
</body>
</html>