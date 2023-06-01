import { Testing } from 'cdktf';
import { GithubConfig } from '../src/GithubConfig';

describe('GithubConfig', () => {
  it('should produce the expected', () => {
    const app = Testing.app();
    const stack = new GithubConfig(app, 'github');
    const synthesized = Testing.synth(stack);

    expect(synthesized).toMatchSnapshot();
  });
});
