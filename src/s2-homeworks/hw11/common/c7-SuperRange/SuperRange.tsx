import React from 'react'
import {Slider, SliderProps} from '@mui/material'


const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider

            sx={{ // стили для слайдера // пишет студент
                width: 147,
                height: 4,
                mb: 2,
                '& .MuiSlider-rail': {
                    backgroundColor: 'grey',
                },
                '& .MuiSlider-track': {
                    backgroundColor: 'green',
                    color: 'green',
                },
                '& .MuiSlider-thumb': {
                    backgroundColor: 'green',
                },
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
