module.exports = {
  apps: [
    {
      name: "ALtruist Beats",
      // script: "E:/Altruistindia/altruistapp/server.js",
      script: "/home/beats_react/server.js",
      watch: false,
      error_file:
        "/home/beats_react/log/pm2/beats_error.log",
      out_file:
        "/home/beats_react/log/pm2/beats_error.log",
      instances: 2,
      exec_mode: "cluster",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      max_memory_restart: "1024M",
    },
  ],
};
