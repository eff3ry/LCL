if [ ! -d "./node_modules/@neutralinojs/neu" ]; then
    echo
    echo Installing Node Modules...
    npm i
fi

if [ ! -e "./bin/neutralino-win_x64.exe" ]; then
    echo
    echo Downloading Neutralino Binaries
    npx neu update
fi

WEBKIT_DISABLE_COMPOSITING_MODE=1 npx neu run