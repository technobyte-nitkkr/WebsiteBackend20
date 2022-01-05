$(function(){
    const url = "https://us-central1-techspardha-87928.cloudfunctions.net/api/";

  let token = localStorage.getItem("jwt");
  const $tableBody = $('.query tbody');
  const $queryRow = $('.query-row tr').detach();
  
  //$queryRow;
  //retrieve all the queries and put it in a variable
  const requestQueriesUrl = url + "admin/query";
  let queries;

  const replyQueryUrl = url + 'admin/query'
  function replyQuery(id,email)
  {
      return new Promise(function(res){
          $.ajax({
              url: replyQueryUrl,
              data: {'id' : id, 'queryEmail' : email},
              type: "PUT",
              headers: {
              'Content-Type': "application/x-www-form-urlencoded",
              'Authorization': token
              },
              success: function(result){
                  console.log(result);
                  res(result);
              }
          });
      })
      
  }

  function sort_table(allTuples){
      let deleteArray = allTuples.filter(function(a){
          return $(a).find('th').hasClass('delete');
      })
      let repliedArray = allTuples.filter(function(a){
          return $(a).find('th').hasClass('replied');
      })
      deleteArray.sort(function(a,b){

          let dateA = new Date($(a).find('.date').text());
          let dateB = new Date($(b).find('.date').text());

          return dateB - dateA;
      });
      repliedArray.sort(function(a,b){

          let dateA = new Date($(a).find('.date').text());
          let dateB = new Date($(b).find('.date').text());

          return dateB - dateA;
      });
      let total = [...deleteArray,...repliedArray];
      $tableBody.append(total);
  }

  $.ajax({
          url: requestQueriesUrl,
          type: "GET",
          headers:{
          'Content-Type': "application/x-www-form-urlencoded",
          'Authorization': token
          },
          success: function(result, status) {
              queries = result.data.queries;
              console.log(queries);
              $tableBody.html('');
              let count = 1;
              let allQueries = [];
              let myQuery = {}
              queries.forEach(function(el){
                  el.query.forEach(function(q){
                      allQueries.push({email:el.email, query:q})
                  })
              });
              allQueries.forEach(function(el){

                  let email = el.email;

                  let $trClone = $queryRow.clone();
                  $trClone.attr('data-id',el.query.id);
                  $trClone.attr('data-email',email);
                  if(!el.query.status){//if not replied
                      $trClone.find('.delete').empty();
                      $trClone.find('.delete').html('Replied');
                      $trClone.find('.delete').addClass('replied');
                      $trClone.find('.delete').removeClass('delete');
                  }
                  $trClone.find('.serial').html(count);
                  $trClone.find('.email').html(email);
                  $trClone.find('.query-para').html(el.query.text);
                  $trClone.find('.date').html(new Date(el.query.id).toLocaleString());
                  $tableBody.append($trClone);
              
              })
              $delete = $('.query .delete');
              $delete.on('click',function(e){
                  
                  if($(this).hasClass('delete')){
                      $tableBody.css('opacity','0.4');
                      let id = $(this).parent('tr').attr('data-id');
                      let email = $(this).parent('tr').attr('data-email');
                      console.log(id,'id',email,'email');
                      let myThis = this;
                      replyQuery(id,email).then(function(data){
                          $tableBody.css('opacity','1');
                          console.log(data);
                          $(myThis).removeClass('delete');
                          $(myThis).addClass('replied');
                          $(myThis).html('Replied');
                          let allTuples = $('.query tr').toArray();
                          sort_table(allTuples);
                      })
                  }
              })
              
          },
          complete:function(){
              $(".copy").on('click',function(){

                  $('#clipboard').val($(this).prev('span.email').text());
                  $('#clipboard').select();
                  document.execCommand('copy');

              });
              let allTuples = $('.query tbody tr').toArray();
              sort_table(allTuples);
          }
      });
      

})