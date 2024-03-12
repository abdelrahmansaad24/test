const express = require('express');
const { spawn } = require('child_process');
const { py, python } = require('pythonia')

const app = express();
const PORT = process.env.PORT || 3000;
const np = python("./test.py")
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

app.get('/', async (req, res) => {
  await np.plus()
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
