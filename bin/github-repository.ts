import { App } from 'cdktf';
import { GithubConfig } from '../src/GithubConfig';


const app = new App();
new GithubConfig(app, 'github');
app.synth();
