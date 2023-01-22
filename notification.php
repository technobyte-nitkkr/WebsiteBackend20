<?php include 'navigationbar.php';?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Techspardha Backend</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/addNotice.css">
</head>
<body>
    <!-- add bootstarp login nav -->
    

    <script src="./js/signOut.js"></script>

    <!-- add the on load script to check the  jwt -->

    <div class="container addNotification">
        <h1>Add Mobile Notification</h1>
        <form action="#" class="form addNotice">
            <div class="form-group">
                <input class="form-control" type="text" id="topic" placeholder="topic">
            </div>
            <div class="form-group">
                <input class="form-control" type="text" id="title" placeholder="title" />
            </div>
            <div class="form-group">
                <textarea class="form-control" placeholder="body" type="text" id="body" value=""></textarea>
            </div>
            <div class="form-group">
                <input class="form-control" type="text" placeholder="imageUrl" id="image" />
            </div>
            <div class="form-group">
                <input class="form-control" placeholder="Link" type="text" id="link" />
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-success" value="SUBMIT" />
            </div>
        </form>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
</script>

<script src="./js/addNotification.js"></script>

</html>