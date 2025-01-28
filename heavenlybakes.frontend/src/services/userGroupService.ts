import UserGroup from "@/interfaces/userGroup";

const BASEURL = "https://localhost:44367";
export async function fetchAllUserGroups(signal? : AbortSignal) : Promise<UserGroup[] | []> {
    try{
        const url = `${BASEURL}/UserGroups`;
        const response : Response = await fetch(url, {signal});
        
        if (!response.ok) {
            throw new Error("Unable to fetch user groups");
        }
        
        return await response.json();
    } catch(error) {
        throw new Error("Unable to fetch user groups");
    }
}