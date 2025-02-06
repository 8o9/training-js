import { Octokit } from 'octokit';
import { Command } from 'commander';

const program = new Command();

program
  .requiredOption('-t, --token <token>', 'GitHub personal access token')
  .requiredOption('-o, --owner <owner>', 'GitHub repository owner')
  .requiredOption('-r, --repo <repo>', 'GitHub repository name')
  .option('-v, --verbose', 'Enable logging to console');

// show open issues
// ex:
// ❯ node index.js -t <token> -o 8o9 -r training-js list
program
  .command('list')
  .description('List all "open" issues')
  .action(async () => {
    try {
      const octokit = new Octokit({
        auth: program.opts().token,
        log: program.opts().verbose ? console : undefined
      });
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        {
          owner: program.opts().owner,
          repo: program.opts().repo,
          state: 'open'
        }
      );
      console.log('open issues:');
      response.data.forEach((issue) => {
        console.log(`#${issue.number} id: ${issue.id} title: ${issue.title}`);
      });
    } catch (error) {
      console.error(error);
    }
  });

// create an issue
// ex:
// ❯ node index.js -t <token> -o 8o9 -r training-js create <title> [body]
program
  .command('create <title> [body]')
  .description('Create a new issue')
  .action(async (title, body) => {
    try {
      const octokit = new Octokit({
        auth: program.opts().token,
        log: program.opts().verbose ? console : undefined
      });
      const response = await octokit.request(
        'POST /repos/{owner}/{repo}/issues',
        {
          owner: program.opts().owner,
          repo: program.opts().repo,
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
  });

// close an issue
// ex:
// ❯ node index.js -t <token> -o 8o9 -r training-js close <issue_number>
program
  .command('close <issue_number>')
  .description('Close an issue')
  .action(async (issueNumber) => {
    try {
      const octokit = new Octokit({
        auth: program.opts().token,
        log: program.opts().verbose ? console : undefined
      });
      const response = await octokit.request(
        'PATCH /repos/{owner}/{repo}/issues/{issue_number}',
        {
          owner: program.opts().owner,
          repo: program.opts().repo,
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
  });

// ここで初めてコマンド引数が取れる。そのため`oktokit`は各コマンドのところで作成してauthにデータを設定する
program.parse(process.argv);
