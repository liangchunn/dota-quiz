import styled from 'styled-components'

export const ModalWrapper = styled('div')`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  flex-direction: column;
  background-color: white;
`

export const Modal = styled('div')`
  margin: 0 auto;
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
`
