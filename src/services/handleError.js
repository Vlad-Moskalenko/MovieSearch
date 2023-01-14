export const handleError = (state, {payload}) => {
  state.isLoading = false
  state.error = payload
}
