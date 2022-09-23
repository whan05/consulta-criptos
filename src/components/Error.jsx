import styled from '@emotion/styled'
import React from 'react'

const Texto = styled.div `
    background-color: #B7322C;
    color: #FFFFFF;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    text-align: center;
    text-align: center;

`

export const Error = ({children}) => {
  return (
    <Texto>{children}</Texto>
  )
}
