const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

function callPythonScript(callback) {
  const pythonProcess = spawn('python', ['./test.py']);  // Assuming the Python script is named test.py

  let dataString = '';

  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    callback(dataString);
  });
}

app.get('/', (req, res) => {
  callPythonScript((result) => {
    res.send(`Output: ${result}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
