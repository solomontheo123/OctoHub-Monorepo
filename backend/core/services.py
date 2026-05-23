import requests
from django.conf import settings
from .models import Repository, CustomUser

def fetch_and_sync_github_repos(user: CustomUser) -> int:
    """
    Connects to the official GitHub API using the user's stored access token,
    downloads their repository manifest, and upserts the records into SQLite.
    Returns the total count of successfully synchronized profiles.
    """
    # 1. Verification: Confirm the user has a valid access token stored
    if not user.github_access_token:
        print(f"Synchronization canceled for {user.username}: Missing OAuth Token.")
        return 0

    # 2. Setup outbound API headers targeting GitHub's production gateway
    url = "https://api.github.com/user/repos"
    headers = {
        "Authorization": f"token {user.github_access_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    # Parameters to pull both personal repos and ones the user contributes to
    params = {
        "per_page": 100,
        "sort": "updated"
    }

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        
        # If GitHub rejects the token (e.g., expired or revoked), handle gracefully
        if response.status_code != 200:
            print(f"GitHub API returned error status {response.status_code}: {response.text}")
            return 0
            
        repos_data = response.json()
        
        # If the user has a brand new GitHub account with zero repositories yet
        if not isinstance(repos_data, list):
            return 0

        sync_count = 0
        
        # 3. Processing Matrix: Map incoming fields into our clean Django models
        for repo_info in repos_data:
            # Safely extract programming language, fallback to 'Unknown' if null
            lang = repo_info.get("language") or "Unknown"
            # Safely extract repository description text string
            desc = repo_info.get("description") or ""

            # Use update_or_create to seamlessly overwrite existing repos or insert new ones
            repository, created = Repository.objects.update_or_create(
                owner=user,
                name=repo_info["name"],
                defaults={
                    "html_url": repo_info.get("html_url", ""),
                    "description": desc,
                    "is_private": repo_info.get("private", False),
                    "stargazers_count": repo_info.get("stargazers_count", 0),
                    "forks_count": repo_info.get("forks_count", 0),
                    "open_issues_count": repo_info.get("open_issues_count", 0),
                    "language": lang,
                }
            )
            sync_count += 1
            
        print(f"Successfully synchronized {sync_count} repositories for user: {user.username}")
        return sync_count

    except requests.exceptions.RequestException as e:
        print(f"Network connectivity failure encountered during GitHub sync: {str(e)}")
        return 0