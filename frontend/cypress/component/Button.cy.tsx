/// <reference types="cypress" />
import React from 'react'
import '../../src/index.css'
import Button from '../../src/components/core/Button'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

describe('test', () => {
  it('Button', () => {
    cy.mount(
      <div className='flex align-top flex-col gap-4 p-4 bg-slate-50'>
        <Button variant='contained'>Contained</Button>
        <Button variant='transparent'>Transparent</Button>
        <Button startIcon={icon({ name: 'trash', style: 'solid' })}>Starticon</Button>
        <Button endIcon={icon({ name: 'trash', style: 'solid' })}>Endicon</Button>
        <Button loading>Loading</Button>
      </div>
    )
  })

})