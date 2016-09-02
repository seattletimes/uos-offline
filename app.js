var electron = require("electron");

var Server = require("http-server");

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
    window.once("closed", () => electron.app.exit(0));
    window.webContents.session.clearCache(() => window.loadURL("http://localhost:8000"));

    window.toggleDevTools();
  });

});