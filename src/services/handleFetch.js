const handleError = (state) => {
  state.status = 'error'
}

const handlePending = (state) => {
  state.status = 'loading'
}

const handleFulfilled = (state) => {
  state.status = 'success'
}

export {handleError, handlePending, handleFulfilled}
