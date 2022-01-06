$(function(){
    const url = "https://us-central1-techspardha-87928.cloudfunctions.net/api/";

    //recieve Notification
    /*let recieveNotifUrl = url + 'notification'
    $.get(recieveNotifUrl, function(result){
        console.log(result);
    })*/

    //send notification
    let addNotificationUrl = url + 'admin/notification'
    //add notice
    $('.addNotice').on('submit',function(e){
        e.preventDefault();
        e.stopPropagation();

        let notice = $('.addNotice').find('#notification').val();
        if(notice.length != 0){
            let token =window.localStorage.getItem("jwt");
            let data = {
                notif:notice,
                time:Date.now()
            }

            $.ajax({
                url: addNotificationUrl,
                data: data,
                type: "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': token
                },
                success: function(result) {
                    console.log(result);
                    $('.addNotice')[0].reset();
                    alert('Notification added');
                }
            });
        } else{
            alert("notification empty");
        }
        
        //calculate timestamp
    })
});