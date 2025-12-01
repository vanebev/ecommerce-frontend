
const produccion = import.meta.env.MODE == 'production'
const url= produccion?'/api/upload/' : 'http://localhost:8080/api/upload/'

export const enviarArchivoImgen = (formdata, cbProgress, cbUrlFoto) =>{
     
    let porcentaje = 0
     
    const xhr = new XMLHttpRequest()
    xhr.open('post', url)
    
    xhr.addEventListener('load', () =>{
        if(xhr.status == 200) {
            const rta = JSON.parse(xhr.response)
            console.log(rta)

            const {urlFoto:urlFotoAux} = rta
            const urlFoto = (produccion? '' : 'http://localhost:8080') + urlFotoAux
            if(typeof cbUrlFoto == 'function')cbUrlFoto(urlFoto)
            
        }
        else (
            console.error('error al enviar el archivo', xhr.status)
        )
    })
    xhr.addEventListener('error', e=>{
        console.error('error en la comunicacion al enviar el archivo', e)
    })
    xhr.upload.addEventListener('progress', e => {
       
       if(e.lengthComputable){
        porcentaje = parseInt((e.loaded * 100) / e.total)
        if(typeof cbProgress == 'function')cbProgress(porcentaje)
        

       }
    })
    xhr.send(formdata)
}