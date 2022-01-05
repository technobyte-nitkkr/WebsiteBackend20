<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/registeredUsers.css">
</head>
<body>
    <!-- add bootstarp login nav -->
    <?php include 'navigationbar.php';?>

     <script src="./js/signOut.js"></script>

     <!-- add the on load script to check the  jwt -->
    <div class="container registered">
        <h2>Registered Users</h2>
        <form action="#" class="form" id="search-event">
            <div class="form-group">
                <label for="category">Select Category</label>
                <select name="category" id="category" class="form-control">
                    <option value="...">Loading...</option>
                </select>
            </div>
            <div class="form-group">
                <label for="event">Select Event</label>
                <select name="event" id="event" class="form-control">
                    <option value="...">Loading...</option>
                </select>
            </div>
            <div class="form-group">
                <input type="submit" value="Search" class="btn btn-success search"  disabled>
            </div>   
        </form>
        <div class="download_info">
            <span id="information"></span>
        </div>
        <div class="download">
            <button class="btn btn-primary" id="download" disabled>download file</b>
        </div>
    </div>
</body>
<script src="js/CSVExport.js"></script>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script src="./js/registeredUsers.js"></script>
</html>