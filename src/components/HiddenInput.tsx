import React, { FC } from 'react'

type HiddenInputProps = {
    hiddenInputRef : React.RefObject<HTMLInputElement>,
    HandleInputChange : React.FormEventHandler<HTMLInputElement>,
    HandleKeyDown : React.KeyboardEventHandler<HTMLInputElement>
  }
  
export const HiddentInput : FC<HiddenInputProps> = ({hiddenInputRef, HandleInputChange, HandleKeyDown}) => {
    return (
        <input
        inputMode="decimal"
        ref={hiddenInputRef}
        className="hidden-input"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="off"
        onInput={HandleInputChange}
        onKeyDown={HandleKeyDown}
        />
    )
}