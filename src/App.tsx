
import React from 'react'
import { Box, Button, Switch, Typography, CssBaseline, Grid } from '@mui/material'
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider'

function App() {
  // portrait handler
  const [portraitChecked, setPortraitChecked] = React.useState(false)
  const handlePortraitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortraitChecked(event.target.checked)
  }

  // upload image handler
  const uploadSourceImageInputRef = React.useRef<HTMLInputElement>(null)
  const [sourceImageSrc, setSourceImageSrc] = React.useState('src/assets/images/placeholder.jpg')

  const uploadTargetImageInputRef = React.useRef<HTMLInputElement>(null)
  const [targetImageSrc, setTargetImageSrc] = React.useState('src/assets/images/placeholder.jpg')

  React.useEffect(() => {
    // set src for Source Image
    const sourceInput = uploadSourceImageInputRef.current
    sourceInput?.addEventListener('change', () => {
      if (sourceInput.files) {
        const image = sourceInput.files[0]
        const src = URL.createObjectURL(image)
        setSourceImageSrc(src)
      }
    })

    // set src for Target Image
    const targetInput = uploadTargetImageInputRef.current
    targetInput?.addEventListener('change', () => {
      if (targetInput.files) {
        const image = targetInput.files[0]
        const src = URL.createObjectURL(image)
        setTargetImageSrc(src)
      }
    })
  })

  return (
    <>
      <CssBaseline />
      <Grid container alignItems='center'>
        <Box sx={{
          borderBottom: '1px solid black',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1rem'
        }}>
          <Typography variant='h5' component='h1'>IMAGES COMPARISON</Typography>
          <Box>
            <Button component='label' variant="outlined">
              Upload Target image
              <input ref={uploadTargetImageInputRef} hidden type="file" accept="image/png, image/jpeg" />
            </Button>
          </Box>
          <Box>
            <Button component='label' variant="outlined">
              Upload source image
              <input ref={uploadSourceImageInputRef} hidden type="file" accept="image/png, image/jpeg" />
            </Button>
          </Box>
          <Box >
            Portrait
            <Switch
              checked={portraitChecked}
              onChange={handlePortraitChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        </Box>
        <Box sx={{
          display: 'grid',
        }}>
          <ReactCompareSlider
            handle={<ReactCompareSliderHandle buttonStyle={{ display: 'none' }} linesStyle={{ height: portraitChecked ? '0.1rem' : '100%', width: portraitChecked ? '100%' : '0.1rem', color: 'red' }} />}
            itemOne={<img alt="Image one" src={targetImageSrc} />}
            itemTwo={<img alt="Image two" src={sourceImageSrc} />}
            position={90}
            portrait={portraitChecked}
            style={{
              width: '100%',
              height: 'auto'
            }}
          />
        </Box>
      </Grid >
    </>
  )
}

export default App