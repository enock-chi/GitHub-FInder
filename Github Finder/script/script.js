$(document).ready(function () {
  $('#searchUser').on('keyup', function (e) {
    let userName = e.target.value;

    $.ajax({
      url: 'https://api.github.com/users/' + userName,
      data: {
        client_id: '23b02eeb9ac712f45b11',
        client_secret: '21c06e2b31b4a063f20683ad24ac997be9d008f0'
      }
    }).done(function (user) {
      $.ajax({
         url:'https://api.github.com/users/' + userName+'/repos',
         data: {
          client_id: '23b02eeb9ac712f45b11',
          client_secret: '21c06e2b31b4a063f20683ad24ac997be9d008f0',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
          $.each(repos, function(index, repo){
          $('#repos').append(`
          <div class="well">
             <div class="row">
                 <div class="col-md-7">
                   <strong>${repo.name}</strong>:${repo.description}
                 </div>
                     <div class="col-md-3">
                     <span class="label label-default"> Fork Count: ${repo.fork_count},   </span>
                     <span class="label label-primary">Seen: ${repo.watchers},   </span>
                     <span class="label label-success">Stars${repo.stargazers_count},   </span>
                 </div>
                 <div class="col-md-3">
                    <a target="_blank" href="${repo.html_url} class="btn btn-default">Repo Page</a>
                 </div>
             </div> 
          </div>
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
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos},   </span>
                <span class="label label-primary">Public Gists: ${user.public_gists},   </span>
                <span class="label label-success">Followers${user.followers},   </span>
                <span class="label label-info">Following: ${user.following},   </span><br><br>
                <ul>
                   <li class="list-group-item">Compamy: ${user.company}</li>
                   <li class="list-group-item">Website/blog: ${user.blog}</li>
                   <li class="list-group-item">Location: ${user.location}</li>
                   <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
            </div
          </div>
        </div>
          <h3 class="page-header">Latest Repos </h3>
          <div id=repos></div
      `);
    })
  });
});