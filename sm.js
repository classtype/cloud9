var spawn = require("child_process").spawn;
var fs = require("fs")

run = function(cmd, cb) {
	var buildDebug = spawn("cmd", ["/c " + cmd]);

	buildDebug.stderr.setEncoding("utf8");
	buildDebug.stderr.on('data', function (data) {
	  console.error(data);
	});

	buildDebug.stdout.setEncoding("utf8");
	buildDebug.stdout.on('data', function (data) {
	  console.log(data);
	});

	buildDebug.on('exit', function (code) {
	  if (code !== 0) {
		console.error(cmd + '::: process exited with code :::' + code);
	  }
	  cb()
	});
}


run("npm install -f")
run("npm install sm -f")
var js = fs.readFileSync("package.json", "utf8")
p = JSON.parse(js)
m = p.mappings
delete m.vfs
delete m.jsDAV
delete m["vfs-architect"]

for (var i in m) {
	x = m[i]
	x && run("npm install " + x[1] + " -f")
}


