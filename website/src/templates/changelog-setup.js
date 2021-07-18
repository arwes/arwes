// The auto-changelog package generates for each release the merge commits,
// the fixes commits, and all remaining commits. They are concatenated
// and then listed by groups of type of commit.

const GIT_COMMIT_TYPES = {
  feat: 'Features',
  fix: 'Bug Fixes',
  docs: 'Documentation',
  style: 'Styles',
  refactor: 'Code Refactoring',
  perf: 'Performance Improvements',
  test: 'Tests',
  build: 'Builds',
  ci: 'Continuous Integrations',
  chore: 'Chores',
  revert: 'Reverts'
};

const mapCommitToMarkdown = ({ breaking, href, subject, shorthash }) => {
  const breakingNote = breaking ? '**Breaking change:** ' : '';
  const hashLink = href ? ` [\`${shorthash}\`](${href})` : '';
  return `- ${breakingNote}${subject}${hashLink}`;
};

const mapReleaseCommitsToMarkdown = ({ commits, fixes }) => {
  // Merge commits are ignored.

  const fixesCommits = fixes.map(fix => fix.commit);
  const allCommits = commits.concat(fixesCommits);

  return Object
    .keys(GIT_COMMIT_TYPES)
    .map(commitType => {
      const title = GIT_COMMIT_TYPES[commitType];

      const commitsInMarkdown = allCommits
        .filter(({ subject }) => subject.startsWith(commitType))
        .map(mapCommitToMarkdown)
        .join('\n');

      if (commitsInMarkdown) {
        return `### ${title}\n\n${commitsInMarkdown}`;
      }

      return null;
    })
    .filter(Boolean)
    .join('\n\n');
};

module.exports = Handlebars => {
  Handlebars.registerHelper('release-changes', releases => {
    return releases
      .map(release => {
        const { title, href, niceDate } = release;
        const heading = `## [${title}](${href})`;
        const subheading = `> Released on ${niceDate}. See [Official Release Notes](https://github.com/arwes/arwes/releases/tag/${title}).`;
        const header = `${heading}\n\n${subheading}\n\n`;
        const changes = mapReleaseCommitsToMarkdown(release);
        return { header, changes };
      })
      .filter(({ changes }) => changes.length)
      .map(({ header, changes }) => [header, changes].join('\n\n'))
      .join('\n\n');
  });
};
