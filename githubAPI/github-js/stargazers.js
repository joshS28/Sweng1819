function GitStream() {
	var sort_asc = function (commit1, commit2) {
	  if (commit1.date < commit2.date) return 1;
	  if (commit1.date > commit2.date) return -1;
	  return 0;
	};
	
	var commits = [];
	var toDo = 0;
	var done = 0;

        //All the async things screw up the order so thats why its so complicated,
        //we have to reorganize everything :/
	$.ajax({
  	url: 'https://api.github.com/users/{user here}/repos',
  	dataType: "jsonp",
  	success: function(response){ //get repos
			toDo = response.data.length;
			for(var i = 0; i < response.data.length; i++){
				//code for each repo
				var repo = response.data[i];
				var commit_url = repo.url + "/commits";
				$.ajax({ url: commit_url, dataType: "jsonp", 
					success: function(commit_res){
						var local_toDo = 5;
						var local_done = 0;
						for(var j = 0; j < local_toDo; j++){
							if(j < commit_res.data.length){
								var i_commit = commit_res.data[j].commit;
								var msg = i_commit.message;
								var date = new Date(i_commit.committer.date);
								var author = commit_res.data[j].author.login;
								var author_link = "http://github.com/" + commit_res.data[j].author.login;
								var commit = {msg: msg, date: date, author: author, author_profile: author_link};
								commits.push(commit);
							}
							local_done++;
							if(local_done == local_toDo){
								done++;
							}
						}
					}
				});

			} //end of for loop

			var check = setInterval(function() {
					if(done == toDo){
						clearInterval(check);
						commits.sort(sort_asc);
						$(".js-git-stream .loading").fadeOut();
						$(".js-git-stream").empty();
						var i = 0;
						for(i = 0; i < 5; i++){
							if(commits.length > i){
			 					$(".js-git-stream").append("<li><b><i><a href=" + commits[i].author_profile + ">" + commits[i].author + "</a>: </i></b><span>" + commits[i].msg + "</span></li>");
			 				}
						}
						$(".js-git-stream li").fadeIn();
						$(".js-git-more").fadeIn();
						$(".js-git-more").click(function() {
							i++;
							var x = i + 5;
							for(i; i < x; i++){
								if(commits.length > i){
				 					$(".js-git-stream").append("<li><b><i><a href=" + commits[i].author_profile + ">" + commits[i].author + "</a>: </i></b><span>" + commits[i].msg + "</span></li>");
				 				}
							}
							if(x + 1 > commits.length){
								$(".js-git-more").fadeOut();
							}
							$(".js-git-stream li").fadeIn();
						});
					}
				}, 500);
		}
	});
}