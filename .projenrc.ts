// .projenrc.ts
import { TypescriptLibraryProject } from '@gplassard/projen-extensions';

// opinionated wrapper around projen TypeScriptProject for libraries
const project = new TypescriptLibraryProject({
  name: 'github-cdk-tf-construct',
  packageName: '@gplassard/github-cdk-tf-construct',
  devDeps: ['cdktf-cli', 'cdktf', 'constructs', '@cdktf/provider-github'],
  peerDeps: ['cdktf', 'constructs', '@cdktf/provider-github'],
  srcdir: '.',
  gitignore: ['*.tfstate*', 'cdktf.out'],
});
project.synth();
