const base64ToAbsPath = (string:string, arrImgBase64:string[], arrImgAbsPath: string[]) => {
    const length:number = arrImgBase64.length;
    
    for(let i = 0; i < length; i++) {
        const sliceIndex = string.search(/data:image/);
        const imgBase64Length = arrImgBase64[i].length;
        
        string = string.slice(0, sliceIndex) + arrImgAbsPath[i] + string.slice(imgBase64Length + 13);
        
    }

    return string;
}

export const absPathToBase64 = (string: string, arrImgBase64:string[], arrImgAbsPath:string[] | null) => {
    if(arrImgAbsPath === null) {
        return string;
    }
    const length:number = arrImgAbsPath.length;

    for (let i = 0; i < length; i++) {
        const sliceIndex = string.search(/src=\"/);
        const imgAbsPathLength = arrImgAbsPath[i].length;
        
        string = string.slice(0, sliceIndex + 5) + arrImgBase64[i] + string.slice(imgAbsPathLength + 13);
    }

    return string;
}