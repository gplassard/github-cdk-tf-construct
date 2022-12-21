import { BranchDefault } from '@cdktf/provider-github/lib/branch-default';
import { BranchProtection } from '@cdktf/provider-github/lib/branch-protection';
import { GithubProvider } from '@cdktf/provider-github/lib/provider';
import { Repository } from '@cdktf/provider-github/lib/repository';
import { App, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

class GithubConfig extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GithubProvider(this, 'provider', {
      owner: 'gplassard',
    });

    const repository = new Repository(this, 'repo', {
      visibility: 'public',
      name: 'github-cdk-tf-construct',
      archiveOnDestroy: true,
      allowMergeCommit: false,
      allowSquashMerge: true,
      allowRebaseMerge: false,
      allowAutoMerge: true,
      squashMergeCommitTitle: 'COMMIT_OR_PR_TITLE',
      squashMergeCommitMessage: 'COMMIT_MESSAGES',
      deleteBranchOnMerge: true,
      allowUpdateBranch: true,
    });

    new BranchDefault(this, 'defaultBranch', {
      branch: 'main',
      repository: repository.id,
    });

    new BranchProtection(this, 'mainProtection', {
      repositoryId: repository.id,
      pattern: 'main',
      enforceAdmins: true,
      allowsDeletions: false,
      requiredLinearHistory: true,
      allowsForcePushes: false,
      requiredStatusChecks: [
        { strict: true, contexts: ['build', 'pull-request-lint'] },
      ],
    });
    // define resources here
  }
}

const app = new App();
new GithubConfig(app, 'github');
app.synth();
