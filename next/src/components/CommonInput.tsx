import TextField from '@mui/material/TextField'
import { Dispatch, FC, SetStateAction } from 'react'

interface Props {
  label?: string
  onChange: Dispatch<SetStateAction<string>>
  className?: string
}

export const CommonInput: FC<Props> = ({ label, onChange, className }) => (
  <div className={`${className} flex items-center rounded-sm h-10 justify-between`}>
    {/* label */}
    <p className='w-1/4 min-w-[80px]'>{label}</p>
    <TextField
      className='w-3/4'
      id='standard-basic'
      variant='standard'
      onChange={({ target }) => onChange(target.value)}
      InputProps={{ sx: { height: 40 } }}
    />
  </div>
)
