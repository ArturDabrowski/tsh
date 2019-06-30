import { getFormattedDate } from '../utils/dateFormatter';

const HistoryListElement = (events) => {
	const {
		created_at, 
		actor, 
		payload, 
		type, 
		repo,
	} = events;
	return `<div class="timeline-item">
						<div class="timeline-marker"></div>
						<div class="timeline-content">
							<p class="heading">${getFormattedDate(created_at)}</p>
							<div class="content">
								<div class="content-avatar">
									<img src="${actor.avatar_url}"/>
								</div>
								<div class="content-text">
									<span class="gh-username">
										<a href="https://github.com/${actor.login}">${actor.display_login}</a>
									</span>
									${payload.action}
									<a href="${payload.pull_request.html_url}">${type}</a>
									<p class="repo-name">
										<a href="https://github.com/${repo.name}">${repo.name}</a>
									</p>
								</div>
							</div>
						</div>
					</div>`;
}

export default HistoryListElement;