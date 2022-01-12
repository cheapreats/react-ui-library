onmessage = (e) => {
    const { file } = e.data;
    console.log('onworker',e);
    const reader = new FileReader();
    reader.onload = () => {
        let base64StringFile = 'NO_BASE64STRINGFILE';
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
        console.log('worker;post-message');
        postMessage({ base64StringFile,name:file.name });
    };
    try{
        reader.readAsArrayBuffer(file);
    }catch(error){
        console.log(error);
        postMessage({});
    }
};