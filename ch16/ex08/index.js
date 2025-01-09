import { Octokit } from "@octokit/core";
import { Command } from 'commander';

const program = new Command();

program
  .requiredOption('-t, --token <token>', 'GitHub personal access token')
  .requiredOption('-o, --owner <owner>', 'GitHub repository owner')
  .requiredOption('-r, --repo <repo>', 'GitHub repository name')
  .option('-v, --verbose', 'Enable logging to console');

const octokit = new Octokit({
  auth: program.opts().token,
  log: program.opts().verbose ? console : undefined
});

// show open issues
// ex:
// ❯ node index.js -t <token> -o 8o9 -r training-js list
// open issues:
// #3 id: 2778608812 title: test 🐙
// #1 id: 2778607280 title: test issue 🐮
program
  .command('list')
  .description('List all "open" issues')
  .action(async () => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: program.opts().owner,
        repo: program.opts().repo,
        state: 'open'
      });
      console.log(`open issues:`);
      response.data.forEach(issue => {
        console.log(`#${issue.number} id: ${issue.id} title: ${issue.title}`);
      });
    } catch (error) {
      console.error(error);
    }
  });

//! WIP, curlではissueが作れるのに404(request urlが)と言われる
// create an issue
// ex:
// ❯ node index.js -t <token> -o 8o9 -r training-js create <title> [body]
program
  .command('create <title> [body]')
  .description('Create a new issue')
  .action(async (title, body) => {
    try {
      const response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: program.opts().owner,
        repo: program.opts().repo,
        title: title,
        body: body
      });
      console.log(`Issue created: ${response.data.html_url}`);
    } catch (error) {
      console.error('Error creating issue:', error.response ? error.response.data : error.message);
      console.error(error);
    }
  });

//! WIP 401 (requires authentication と言われる)
// close an issue
// ex:
// ❯ node index.js -t <token> -o 8o9 -r training-js close <issue_number>
program
  .command('close <issue_number>')
  .description('Close an issue')
  .action(async (issueNumber) => {
    try {
      const response = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: program.opts().owner,
        repo: program.opts().repo,
        issue_number: issueNumber,
        state: 'closed'
      });
      console.log(`Issue closed: ${response.data.html_url}`);
    } catch (error) {
      console.error('Error closing issue:', error.response ? error.response.data : error.message);
      console.error(error);
    }
  });

program.parse(process.argv);
