import { roles } from "../../DB/Models/user.model.js";

export const endpoints = {
    getProfile : [roles.admin,roles.user]
}