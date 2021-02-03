import * as Yup from 'yup'

export const getGroupMemberInviteSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .required(),
  })
}
