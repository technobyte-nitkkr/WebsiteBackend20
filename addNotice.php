<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/addNotice.css">
</head>
<body>

    <!-- add bootstarp login nav -->

    <?php include 'navigationbar.php';?>

     <script src="./js/signOut.js"></script>

     <!-- add the on load script to check the  jwt -->
    
    <div class="container addNotification">
        <h1>Add Notification</h1>
        <form action="#" class="form addNotice">
            <div class="form-group">
                <textarea name="Notification" id="notification" rows="10"  placeholder="type notification" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-success"  value="SUBMIT"/>
            </div>
        </form>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script src="config.js" charset="utf-8"></script>
<script src="./js/addNotice.js"></script>
</html>
