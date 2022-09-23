import styled from '@emotion/styled';
import {useEffect, useState} from 'react';
import { monedas } from '../data/monedas';
import { useSelectMonedas } from '../hooks/useSelectMonedas';
import { Error } from './Error';



const InputSubmit =  styled.input `
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;

export const Formulario = ({setMonedas}) => {
    
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);


    const [moneda , SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
    const [criptoMoneda , SelectCriptoMoneda] = useSelectMonedas("Elige tu Criptomoneda", criptos);

    useEffect(() => {
      const consultarApi = async() => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        const arrayCriptos = resultado.Data.map( cripto => {

            const objeto = {
                id : cripto.CoinInfo.Name,
                nombre : cripto.CoinInfo.FullName,
            }
            return objeto
        })
        setCriptos(arrayCriptos)
      }
      consultarApi()
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault();
        if ([moneda, criptoMoneda].includes("")) {
            setError(true)

            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptoMoneda
        })
    }

  return (
    <>
        { error && <Error>Todos los campos son obligatorios</Error>}
        <form
            onSubmit={handleSubmit}
        >
            <SelectMonedas/>
            <SelectCriptoMoneda/>
            <InputSubmit 
                type="submit"
                value="cotizar" 

            />
        </form>
    </>
  )
}
