import UserGroup from "@/interfaces/userGroup";

export default interface User {
    userId : string,
    forename : string,
    surname : string,
    email : string,
    password: string,
    userGroup : UserGroup,
}