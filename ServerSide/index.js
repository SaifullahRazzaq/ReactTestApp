const http = require("http");
const app = require("./App");
const server = http.createServer(app);
const port = 3010;

// server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});