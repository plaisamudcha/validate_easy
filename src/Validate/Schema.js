import * as Yup from "yup"

export const Sch = Yup.object({
  name: Yup.string().required('Put your name please'),
  post: Yup.string().required('Put your post please'),
  image: Yup.string().url().required('Show some url')
})