var electron = require("electron");
var minimist = require("minimist");
var Server = require("http-server");

var args = minimist(process.argv);

// We die on any error, to prevent holding the port in an inconsistent state
process.on("uncaughtException", function(err) {
  console.error(err);
  electron.app.exit(1);
});

electron.app.on("ready", function() {

  var server = Server.createServer({
    port: 8000,
    host: "localhost",
    root: "./resources/app",
    showDir: true
  });

  server.listen(8000, "localhost", function() {
    var window = new electron.BrowserWindow({
      fullscreen: true
    });
    window.on("closed", () => electron.app.exit(0));
    window.webContents.session.clearCache(() => window.loadURL("http://localhost:8000"));

    if (args.debug) window.toggleDevTools();
  });

});