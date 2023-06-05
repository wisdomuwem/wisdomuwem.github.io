$(document).ready(function(){
  $('#searchUser').on('keyup',function(e){
    let username=e.target.value;

    // make github request
    $.ajax({
			url: 'https://api.github.com/users/' + username,
			data: {
				client_id: 'd026dd16dd9e47694bbc',
				client_secret: ' 0da448f1369c44b78e0ea4c7d431def0df0c9ee5',
			},
		}).done(function(user){
            $.ajax({
							url: 'https://api.github.com/users/' + username + '/repos',
							data: {
								client_id: 'd026dd16dd9e47694bbc',
								client_secret: ' 0da448f1369c44b78e0ea4c7d431def0df0c9ee5',
                                sort:'created:asc',
                                per_page:5
							},
						}).done(function (repos) {
                           $.each(repos, function(index,repo){
                            $('#repos').append(`
                            <div class="well">
                            <div class="row">
                            <div class="col-md-7">
                            <strong>${repo.name}</strong>:${repo.description}
                            
                            </div>
                            <div class="col-md-3">
                            <span class="btn btn-warning btn-sm m-2">Forks:${repo.forks_count}</span>
                            <span class="btn btn-primary  btn-sm">watchers:${repo.watchers_count}</span>
                            <span class="btn btn-success  btn-sm">stars:${repo.stargazers_count}</span>
                                            
                            </div>
                            <div class="col-md-2">
            
                            <a href="${repo.html_url}" target="_blank" class="btn btn-warning btn-sm m-2">Repo page</a>
                          
                         
                            
                            
                            </div>
                            
                            </div>
                            
                            </div
                            
                            `);

                           })
                        });
            $('#profile').html(`
            
            
 

<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">${user.name}</h3>
  </div>
  <div class="panel-body">
            <div class="row">

            <div class="col-md-3">
            <img class="thumbnail avatar" src="${user.avatar_url}"> 
            <a target="_blank href="${user.html_url}" class="btn btn-primary btn-block">View Profile</a>
            
            
            </div>
              <div class="col-md-9">
            <span class="btn btn-warning">Public Repos:${user.public_repos}</span>
            <span class="btn btn-primary">Public gists:${user.public_gists}</span>
            <span class="btn btn-success">Followers:${user.followers}</span>
            <span class="btn btn-info">Following:${user.following}</span>
           <br><br>
           <ul class="list-group">
            <li class="list-group-item">Company:${user.company}</li>
            <li class="list-group-item">Website/blog:${user.blog}</li>
            <li class="list-group-item">Location:${user.location}</li>
            <li class="list-group-item">Member since${user.created_at}</li>
            <li class="list-group-item">Vestibulum at eros</li>
</ul>
            
            </div>
            
            
            </div>
  </div>
</div>
<h3 class="page-header">latest repos </h3>
<div id="repos"></div>

            
            `);

        });

  })
})