import { roles } from "../../DB/Models/user.model.js";

export const endpoints = {
    getProfile : [roles.admin,roles.user],
    updateProfile : [roles.admin,roles.user],
    freezeAccount : [roles.admin,roles.user],
    restoreAccountByAdmin : [roles.admin],
    restoreAccountByUser : [roles.user],
    deleteAccount: [roles.admin],
    updatePassword: [roles.admin, roles.user]

} 