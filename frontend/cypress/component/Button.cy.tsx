/// <reference types="cypress" />
import React from 'react'
import '../../src/index.css'
import Button from '../../src/components/core/Button'

describe('test', () => {
  it('Button', () => {
    cy.mount(
      <div className='flex align-top flex-col'>
        <Button>Click me!</Button>
        <Button loading>Loading Button</Button>
        </div>
    )
  })

})