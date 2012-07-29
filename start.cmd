@rem Do not use "echo off" to not affect any child calls.
@setlocal

@if ("%HOME1%")==("1") (
    @call cmd /c node server.js windows
    @goto end
)

@rem Get the abolute path to the parent directory, which is assumed to be the
@rem Git installation root.
@set git_install_root=C:\Program Files (x86)\Git
@set PATH=%git_install_root%\bin;%PATH%

@if not exist "%HOME%" @set HOME=%HOMEDRIVE%%HOMEPATH%
@if not exist "%HOME%" @set HOME=%USERPROFILE%
@set HOME1=1

echo %PATH%
@rem git.exe status


cmd /K node server.js windows
:end