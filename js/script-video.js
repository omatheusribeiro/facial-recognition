const cam = document.getElementById('cam');

const startVideo = () => {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length > 0) {
                const preferredDevice = videoDevices.find(device => device.label.toLowerCase().includes('c922')) || videoDevices[0];

                navigator.mediaDevices.getUserMedia({
                    video: { deviceId: preferredDevice.deviceId }
                })
                .then(stream => {
                    cam.srcObject = stream;
                    cam.play();
                })
                .catch(error => console.error('Error accessing webcam:', error));
            } else {
                console.warn('No video devices found.');
            }
        })
        .catch(error => console.error('Error enumerating devices:', error));
};

const loadLabels = () => {
    const labels = ['User Photo']
    return Promise.all(labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 1; i++) {
            const img = await faceapi.fetchImage(`/lib/face-api/labels/${label}/${i}.jpg`)
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/lib/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/lib/face-api/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/lib/face-api/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/lib/face-api/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/lib/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/lib/face-api/models'),
]).then(startVideo);

cam.addEventListener('loadeddata', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam);
    const canvasSize = { width: 500, height: 375 };
    faceapi.matchDimensions(canvas, canvasSize);
    document.getElementById('div-video').appendChild(canvas);

    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(cam, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();

        const resizedDetections = faceapi.resizeResults(detections, canvasSize);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        resizedDetections.forEach(detection => {
            const { age, gender, genderProbability, expressions } = detection;
            const expression = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b)[0]; // Expression with highest probability

            new faceapi.draw.DrawTextField([
                `Age: ${parseInt(age, 10)} years old`,
                `Gender: ${gender} (${parseInt(genderProbability * 100, 10)}%)`,
                `Expression: ${expression}`
            ], detection.detection.box.bottomRight).draw(canvas);
        });
    }, 100);
});