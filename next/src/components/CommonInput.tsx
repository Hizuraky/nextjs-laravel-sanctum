import TextField from '@mui/material/TextField'
import { Dispatch, FC, SetStateAction } from 'react'

interface Props {
  label?: string
  onChange: Dispatch<SetStateAction<string>>
  className?: string
  errorMessage?: string
}

export const CommonInput: FC<Props> = ({ label, onChange, className, errorMessage }) => (
  <div className={`${className} flex items-center rounded-sm h-10 justify-between`}>
    <p className='w-1/4 min-w-[80px]'>{label}</p>
    <TextField
      error={Boolean(errorMessage)}
      className='w-3/4'
      id='standard-error-helper-text'
      variant='standard'
      onChange={({ target }) => onChange(target.value)}
      helperText={errorMessage}
      InputProps={{ sx: { height: 40 } }}
    />
  </div>
)
