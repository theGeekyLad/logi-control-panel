const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const { exec } = require('child_process');

let process = null

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 210,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// runtime
ipcMain.on('pulse-led', (event, val) => {
    console.log('Pulse...', val)
    exec('g413-led -fx breathing all ff0000 ' + val, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})

ipcMain.on('on-led', (event) => {
    console.log('Off...')
    exec('g413-led -a ff0000', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})

ipcMain.on('off-led', (event) => {
    console.log('Off...')
    exec('g413-led -a 000000', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})

ipcMain.on('change-led', (event, val) => {
    console.log('Change...', val)
    exec('g413-led -a ' + val + '0000', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})

ipcMain.on('hook-notifications', (event) => {
    console.log('Hooking...')
    process = exec('python3 ./hook-notifications.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})

ipcMain.on('unhook-notifications', (event) => {
    console.log('Unhooking...', process.kill());
})
