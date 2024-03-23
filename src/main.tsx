import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


{/* <Select
defaultValue={selectedCuisine}
onValueChange={(event) => setSelectedCuisine(event.target.value)}
>
<SelectTrigger>
  <SelectValue placeholder="Choose cuisine" />
</SelectTrigger>
<SelectContent>
  <SelectItem value="">All</SelectItem>
  <SelectItem value="Американская кухня">Американская кухня</SelectItem>
  <SelectItem value="Русская кухня">Русская кухня</SelectItem>
</SelectContent>
</Select> */}