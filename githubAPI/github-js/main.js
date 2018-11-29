$(document).ready(function(){
$("#search").click(function(){
    let username = $("#term").val();
	var pic = 'http://ghchart.rshah.org/' + username;
  // Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
               client_id:'d9308aacf8b204d361fd',
        client_secret:'62551cc02cee983fff0bac41baf170eb5a312c1c'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
                 client_id:'d9308aacf8b204d361fd',
        client_secret:'62551cc02cee983fff0bac41baf170eb5a312c1c',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $("#calender-pic").attr("src",pic);
	  $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
			   <h3 class="panel-title"><strong>${user.name}</strong></h3>
              <span class="label label-default">Public Repos: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
                <li class="list-group-item"><strong>Website/blog:</strong> ${user.blog}</li>
                <li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
                <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>

              </ul>
              </div>
            </div>
			<br>
			<p><strong>Contributions by ${user.name} over the last year</strong></p>
          </div>
        </div>
      `);
    });
  });
});
