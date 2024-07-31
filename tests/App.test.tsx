import React from "react";
import userEvent from "@testing-library/user-event";
import { describe,test,expect } from "vitest";
import {render, screen} from '@testing-library/react'
import App from '../src/App'

describe('<App/>', () => {
  /* test('should work', () => {
    render(<App/>)

    expect(
      screen.getByText('Moving List')
      ).toBeDefined()
   })*/

   test('should add items and remove them', async () => {
      const user = userEvent.setup()

      render(<App/>)

      //buscar el input
      const input = screen.getByRole('textbox')
      expect(input).toBeDefined

      //buscar el form
      const form = screen.getByRole('form')
      expect(form).toBeDefined()

      const button = form.querySelector('button')
      expect(button).toBeDefined()

      const randomText = crypto.randomUUID()
      await user.type(input, randomText)
      await user.click(button!) //?

      //asegurar que el elemento ha sido agregado
      const list = screen.getByRole('list')
      expect(list).toBeDefined()

      screen.debug()
      expect(list.childNodes.length).toBe(3)

      //asegurar que se puede borrar
      const item = screen.getByText(randomText)
      const removeButton = item.querySelector('button')
      expect(removeButton).toBeDefined()

      await user.click(removeButton!)

     // const noResults = screen.getByText('No hay elementos')
      //expect(noResults).toBeDefined()
      expect(list.childNodes.length).toBe(2)
   })
})