export function YupToError (err) {
  const errObj = {}
  console.log(err.inner)

  err.inner.forEach((error)=>{
    errObj[error.path] = error.message
  })
  return errObj
}