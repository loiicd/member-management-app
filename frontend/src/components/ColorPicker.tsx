import { FunctionComponent } from 'react'

interface ColorPickerProps {
  color: string | undefined
  handleColorChange: (color: string) => void
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({ color, handleColorChange }) => {
  const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE', '#30B0C7', '#32ADE6', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E']

  return (
    <div className='flex justify-start gap-2'>
      {colors.map((colorCode) => (
        <div className={`w-8 h-8 p-0.5 border-2 ${color === colorCode ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange(colorCode)}>
          <div className='w-full h-full rounded-full' style={{ backgroundColor: colorCode}}></div>
        </div>
      ))}
    </div>
  )
}

export default ColorPicker