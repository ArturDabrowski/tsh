const ProfileInformation = profile => {
  const { avatar_url, name, html_url, login, bio } = profile
  return `<div class="profile">
						<h2 class="subtitle is-4">Profile</h2>
						<div class="media">
							<div class="media-left">
								<figure class="media-left image is-64x64">
									<img src="${avatar_url}" id="profile-image">
								</figure>
							</div>
							<div class="media-content">
								<p class="title is-5" id="profile-name">${name}</p>
								<p class="subtitle is-6"><a href="${html_url}" id="profile-url">@${login}</a></p>
							</div>
						</div>
						<div class="content" id="profile-bio">
							<p>${bio || '(no information)'}
							</p>
						</div>
					</div>`
}

export default ProfileInformation
