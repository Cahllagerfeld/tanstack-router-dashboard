{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{

  packages = [ pkgs.git ];

  languages.python = {
    enable = true;
    package = pkgs.python312;
    venv.enable = true;
    uv.enable = true;
  };

  languages.javascript = {
    enable = true;
    npm = {
      enable = true;
    };
    bun = {
      enable = true;
      install.enable = true;
    };
  };

  languages.typescript = {
    enable = true;
  };

}
