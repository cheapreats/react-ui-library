onmessage = (e) => {
    const { file } = e.data;
    const reader = new FileReader();
    reader.onload = () => {
        let base64StringFile;
        if (reader.result) {
            if (typeof reader.result === 'string') {
                base64StringFile = btoa(reader.result);
            } else {
                const bytes = Array.from(new Uint8Array(reader.result));
                base64StringFile = btoa(
                    bytes.map((item) => String.fromCharCode(item)).join(''),
                );
            }
        }
        postMessage({ base64StringFile });
    };
    reader.readAsArrayBuffer(file);
};
