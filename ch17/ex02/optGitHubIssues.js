import { Octokit } from 'octokit';

export const listIssues = async (token, owner, repo, verbose) => {
  try {
    const octokit = new Octokit({
      auth: token,
      log: verbose ? console : undefined
    });
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo,
      state: 'open'
    });
    console.log('open issues:');
    response.data.forEach((issue) => {
      console.log(`#${issue.number} id: ${issue.id} title: ${issue.title}`);
    });
  } catch (error) {
    console.error(error);
  }
};

export const createIssue = async (token, owner, repo, title, body, verbose) => {
  try {
    const octokit = new Octokit({
      auth: token,
      log: verbose ? console : undefined
    });
    const response = await octokit.request(
      'POST /repos/{owner}/{repo}/issues',
      {
        owner: owner,
        repo: repo,
        title: title,
        body: body
      }
    );
    console.log(`Issue created: ${response.data.html_url}`);
  } catch (error) {
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
      console.error('Request:', error.request);
    }
  }
};

export const closeIssue = async (token, owner, repo, issueNumber, verbose) => {
  try {
    const octokit = new Octokit({
      auth: token,
      log: verbose ? console : undefined
    });
    const response = await octokit.request(
      'PATCH /repos/{owner}/{repo}/issues/{issue_number}',
      {
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        state: 'closed'
      }
    );
    console.log(`Issue closed: ${response.data.html_url}`);
  } catch (error) {
    console.error(
      'Error closing issue:',
      error.response ? error.response.data : error.message
    );
  }
};
