import { FunctionComponent } from 'react'

interface ColorPickerProps {
  color: string | undefined
  handleColorChange: (color: string) => void
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({ color, handleColorChange }) => {
  return (
    <div className='flex justify-start gap-2'>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#FF3B30' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FF3B30')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FF3B30'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#FF9500' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FF9500')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FF9500'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#FFCC00' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FFCC00')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FFCC00'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#34C759' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#34C759')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#34C759'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#00C7BE' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#00C7BE')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#00C7BE'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#30B0C7' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#30B0C7')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#30B0C7'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#32ADE6' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#32ADE6')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#32ADE6'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#007AFF' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#007AFF')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#007AFF'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#5856D6' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#5856D6')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#5856D6'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#AF52DE' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#AF52DE')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#AF52DE'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#FF2D55' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FF2D55')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FF2D55'}}></div>
      </div>
      <div className={`w-8 h-8 p-0.5 border-2 ${color === '#A2845E' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#A2845E')}>
        <div className='w-full h-full rounded-full' style={{ backgroundColor: '#A2845E'}}></div>
      </div>
    </div>
  )
}

export default ColorPicker