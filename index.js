var express = require('express');
var app = express();
const exec = require('child_process').execSync;
const execFile = require('child_process').execFileSync;

var PATH_TO_MYBLOG = '/usr/share/nginx/my-blog/'
var PATH_TO_MYBLOG_ADMIN = '/usr/share/nginx/my-blog-admin/'

app.post('/my-blog-deploy', function (req, res) {
    console.log('Begin myblog deploy');

    exec('git pull origin master', {
        cwd: PATH_TO_MYBLOG
    }, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
        console.log(stderr);
        return;
    });

    execFile('build.sh', ['-env production', '-api_region remote'], {
        cwd: PATH_TO_MYBLOG
    }, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
        console.log(stderr);
        return;
    })
});

app.listen('8082', function () {
    console.log('Deploy server started, port is 8082');
})
