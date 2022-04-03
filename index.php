<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Techspardha Backend</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/index.css">
</head>

<body>
    <!-- add bootstarp login nav -->

    <?php include 'navigationbar.php';?>

    <script src="./js/signOut.js"></script>

    <!-- add the on load script to check the  jwt -->


    <div class="container form_container">
        <nav class="navbar navbar-expand-lg">
            <ul class="navigation">
                <li class="nav-item active btn btn-primary" id="add">Add Event</li>
                <li class="nav-item btn btn-secondary" id="update">Update Event</li>
            </ul>
        </nav>
        <div class="search-form">
            <h1>Search Event</h1>
            <form action="#" class="form">
                <div class="form-group">
                    <label for="search_category">Select Category</label>
                    <select name="category" id="search_category" class="form-control">
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
                    <input type="submit" id="event-search" value="Search" class="form-control  btn btn-warning"
                        disabled>
                </div>
            </form>
        </div>
        <h1 class="heading">Add Event</h1>
        <form id="events" action="#">
            <div class="form-group">
                <label for="category">Select Category</label>
                <select name="category" id="category" class="form-control category invalid">
                    <option value="select">Loading...</option>
                </select>
                <small class="form-text category-text invalid-text">select a category</small>
            </div>
            <div class="form-group">
                <label for="event_name">Event Name</label>
                <input type="text" name="event_name" id="event_name" class="form-control" required>
            </div>
            <div class="form-group" id="flagship">
                <span class="flagship-label">Flagship Event: </span>
                <div class="form-check form-check-inline">
                    <input type="radio" name="flagship" id="true" class="form-check-input" value="true">
                    <label for="true" class="form-check-label">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="flagship" id="false" class="form-check-input" value="false" checked>
                    <label for="false" class="form-check-label">No</label>
                </div>
            </div>
            <div class="form-group times">
                <div class="time_container">
                    <label for="startDate">Start Date (Tentative)</label>
                    <input type="date" name="time" id="startDate" class="time form-control" required>
                </div>
                <div class="time_container">
                    <label for="startTime">Start Time</label>
                    <input type="time" step="1" name="time" id="startTime" class="time form-control" required>
                </div>
            </div>
            <div class="form-group times">
                <div class="time_container">
                    <label for="endDate">End Date (Tentative)</label>
                    <input type="date" name="time" id="endDate" class="time form-control" required>
                </div>
                <div class="time_container">
                    <label for="endTime">End Time</label>
                    <input type="time" step="1" name="time" id="endTime" class="time form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label for="venue">Venue</label>
                <input type="text" name="venue" id="venue" class="venue form-control">
            </div>
            <div class="form-group">
                <label for="event_description">Event Description</label>
                <textarea name="event_description" id="event_description" class="form-control" required></textarea>
                <small class="form-text"><a
                        href="https://www.grammarly.com/?q=brand&utm_source=google&utm_medium=cpc&utm_campaign=brand_f1&utm_content=229882672988&utm_term=grammarly&matchtype=e&placement=&network=g&gclid=Cj0KCQjwxvbdBRC0ARIsAKmec9YPh_x59YATjK3qWdSTkyc3jVhju-7bphz_HbXdlM_God1d9fez-dQaAidCEALw_wcB&breadcrumbs=true&page=install_popup"
                        class="link" target="_blank">please use grammarly plugin</a></small>
            </div>
            <div class="form-group" id="rules_container">
                <label for="rules"><span>Rules</span><span id="add_rules" class="btn btn-primary push-right">add
                        rule</span></label>
                <div class="hold_rules"></div>
            </div>
            <div class="form-group" id="coordinators">
                <label for="coordinator"><span>Coordinators</span><span id="add_person" class="btn btn-primary">add
                        coordinator</span></label>
                <div class="hold_coordinators"></div>
            </div>
            <div class="form-group">
                <label for="poster">Upload Image/ Poster </label>
                <input type="text" disabled name="poster" id="poster" class="poster_link form-control">
                
            </div>
            <div class="form-group">
                <label for="poster-prev">Image Preview</label>
                <img id="poster-prev" src ="" alt="poster-preview" width="150px" >
                
            </div>
              <button  type="button" class="btn btn-primary" href="javascript:void(0);" onclick="openWidget();">Upload File</button>
            <div class="form-group">
                <label for="document">Add any document / Folder Link (Google drive) for results or any info about event</label>
                <input type="text" name="document" id="document" class="document form-control">
            </div>
         
            <div class="form-group">
                <input type="submit" value="SUBMIT" class="submit btn btn-success">
            </div>
        </form>
    </div>
    <!--extra elements-->
    <div class="coordinator">

        <div class="coordinator_div">
            <div class="form-group">
                <small class="form-text">Name</small>
                <input type="text" name="coordinator_name" class="coordinator_name form-control" placeholder="name"
                    required>
            </div>
            <div class="form-group">
                <small class="form-text">Phone Number</small>
                <input type="text" name="coordinator_number" class="coordinator_number form-control"
                    placeholder="number" required>
            </div>
        </div>
        <div class="close_modal btn btn-danger">x</div>
    </div>

    <div class="form-group rule_container">
        <div class="close_modal btn btn-danger">x</div>
        <div class="rule_div">
            <small class="form-text">Rule</small>
            <input type="text" name="rule" class="form-control rule" required>
        </div>
    </div>



</body>
<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>  
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
</script>
<!-- <script src="config.js" charset="utf-8"></script> -->
<script src="./js/index.js"></script>
<script src="./js/cloudinary.js"></script>

</html>