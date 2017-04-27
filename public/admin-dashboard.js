// when the page loads, retrieve list of
// users from `/api/users` and display list
$(function() {
  $.getJSON('/admin/api/users')
    .done(function(users) {
      var userItems = users.map(function(user, index) {
        var name = [user.firstName, user.lastName].join(', ');
        return '<li><p>Name: ' + name + '</p>' + '<p>Job: ' + user.position + '</p></li>';
      });
      $('.js-users-list').append(userItems);
    })
    .fail(function(jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
});