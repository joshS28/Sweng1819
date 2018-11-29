$(document).ready(function(){
$("#search").click(function(){
    let username = $("#term").val();

	var repoDownloads=[];
	var repoNames=[];
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
        }
      }).done(function(repos){	//Repositories
        $.each(repos, function(index, repo){	//apply function to each repo
		repoDownloads[index] = repo.stargazers_count;
		repoNames[index]= repo.name;
			console.log(repo.name + repoDownloads[index].toString());
        });
      });
    });
  });
});