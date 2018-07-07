require('babel-core/register')();

module.exports = {
  src_folders: ['./client/__test__/e2e_test/cliente2eTest'],
  output_folder: './client/__test__/reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: true,
    server_path: './client/bin/selenium-server-standalone-3.9.1.jar',
    log_path: '',
    port: 9000,
    cli_args: {
      'webdriver.chrome.driver': './client/bin/chromedriver',
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 9000,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnable: true,
        acceptSslCerts: true,
      },
    },

  },
};
