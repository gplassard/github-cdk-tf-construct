import { BranchDefault } from '@cdktf/provider-github/lib/branch-default';
import { BranchProtection } from '@cdktf/provider-github/lib/branch-protection';
import { GithubProvider } from '@cdktf/provider-github/lib/provider';
import { Repository } from '@cdktf/provider-github/lib/repository';
import { S3Backend, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

export class GithubConfig extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new S3Backend(this, {
      bucket: 'terraform-state-eu-west-1-1475',
      key: 'github-cdk-tf-construct/terraform.tfstate',
      region: 'eu-west-1',
    });

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
        { strict: true, contexts: ['build', 'Validate PR title'] },
      ],
      requiredPullRequestReviews: [
        { requiredApprovingReviewCount: 0 },
      ],
    });
  }
}
