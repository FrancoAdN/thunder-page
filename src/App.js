import React, { useState } from 'react'
// import Main from './Components/Main'
import StepOne from './Components/Popup/StepOne'
import StepTwo from './Components/Popup/StepTwo'
import StateProvider from './Components/Popup/_useHook'
function App() {
  const [two, setTwo] = useState(false)
  return (
    // <div>
    //   <StepOne />
    //   {/* <Main /> */}
    // </div>
    <StateProvider>
      {two ? <StepTwo /> : <StepOne set={setTwo} />}
    </StateProvider>
  );
}



export default App;
