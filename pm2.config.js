// pm2 start --no-autorestart pm2.config.js 
module.exports = {
    apps: [
        {
            name: "api",
            script: "app.js",
            watch: false,
            env: {
                "NODE_ENV": "development",
            }
        }
    ]
}