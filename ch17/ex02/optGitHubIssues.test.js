import { Octokit } from 'octokit';
import { listIssues, createIssue, closeIssue } from './optGitHubIssues.js';
import dotenv from 'dotenv';

dotenv.config();

// octokitのメソッドを置き換え
jest.mock('octokit', () => {
  const mOctokit = {
    request: jest.fn()
  };
  return { Octokit: jest.fn(() => mOctokit) };
});

describe('GitHub Issues Functions', () => {
  const token = process.env.GITHUB_TOKEN;
  const owner = '8o9';
  const repo = 'training-js';
  const verbose = false;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('listIssues should list open issues', async () => {
    const mockIssues = [
      { number: 6, id: 2780425689, title: 'test 😈' },
      { number: 4, id: 2778662024, title: 'test issue 🐍' },
      { number: 3, id: 2778608812, title: 'test 🐙' },
      { number: 1, id: 2778607280, title: 'test issue 🐮' }
    ];
    Octokit.prototype.request.mockResolvedValue({ data: mockIssues });

    console.log = jest.fn();
    await listIssues(token, owner, repo, verbose);

    expect(Octokit.prototype.request).toHaveBeenCalledWith(
      'GET /repos/{owner}/{repo}/issues',
      { owner, repo, state: 'open' }
    );
    expect(console.log).toHaveBeenCalledWith('open issues:');
    mockIssues.forEach((issue) => {
      expect(console.log).toHaveBeenCalledWith(
        `#${issue.number} id: ${issue.id} title: ${issue.title}`
      );
    });
  });

  // to be added...
  // npm test がまだうまくいっていない
  // ReferenceError: require is not defined

  //     11 |   };
  //     12 |   return { Octokit: jest.fn(() => mOctokit) };
  //   > 13 | });
  //        |    ^
  //     14 |
  //     15 | describe('GitHub Issues Functions', () => {
});
