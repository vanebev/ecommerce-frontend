import './ObtenerFoto.css'

import { enviarArchivoImgen } from '../../Servicios/upload'
import { useState } from 'react'

export function ObtenerFoto(props){

    const { escribirCampoFoto, url } = props

    const [porcentaje, setPorcentaje] = useState(0)

    const enviarFoto = archivo =>{
        if (!archivo) return

        if (archivo.type && archivo.type.includes('image/')) {
            
            const formdata = new FormData()
            formdata.append('archivo', archivo)

            enviarArchivoImgen(
                formdata,
                porcentajeSubida => {
                    setPorcentaje(porcentajeSubida)
                },
                urlSubida =>{
                    if (typeof escribirCampoFoto === 'function') {
                        escribirCampoFoto(urlSubida)  
                    }
                    setPorcentaje(100)
                }
            )
        
        } else {
            console.error('El archivo elegido no corresponde a una imagen')
        }
    }

    const dragEnter = e => {
        e.preventDefault()
    }

    const dragLeave = e => {
        e.preventDefault()
    }

    const dragOver = e => {
        e.preventDefault()
    }

    const drop = e => {
        e.preventDefault()
        const archivo = e.dataTransfer.files && e.dataTransfer.files[0]
        enviarFoto(archivo)
    }

    const change = e => {
        const archivo = e.target.files && e.target.files[0]
        enviarFoto(archivo)
    }

    return(
        <div className="ObtenerFoto">
            <input
                type="file"
                id="archivo"
                accept="image/*"
                onChange={change}
            />

            <div
                id="drop"
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
            >
                { porcentaje > 0 && porcentaje < 100 &&
                    <>
                        <progress max="100" value={porcentaje}></progress>
                        <span>{porcentaje}%</span>
                    </>
                }

                <label htmlFor="archivo">
                    { url
                        ? <img src={url} alt="Foto del producto" />
                        : 'D&D or Click'
                    }
                </label> 
            </div>
        </div>
    )
}
