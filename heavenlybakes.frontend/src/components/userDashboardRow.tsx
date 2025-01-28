

import User from "@/interfaces/user";
import {ChangeEvent, useState} from "react";
import UserGroup from "@/interfaces/userGroup";
import {UpdateUserDetails} from "@/interfaces/updateUserDetails";
import {deleteUser, updateUsersUserGroup} from "@/services/userService";

export interface UserDashboardRowProps {
    user: User;
    userGroups : UserGroup[];
    handleUserDelete : (user : User) => void;
}
export default function UserDashboardRow({user, userGroups, handleUserDelete} : UserDashboardRowProps) {
    
    const [selectedUserGroup, setSelectedUserGroup] = useState<string | null>(null);

    const handleUpdate = async (details : UpdateUserDetails) => {
        //If no group/new group has been selected, do not update the users user group
        if(!selectedUserGroup || Number(selectedUserGroup) === user.userGroup.groupId){
            return;
        }

        //Update the users group
        try {
            await updateUsersUserGroup(details.userId, details.groupId);
        } catch (error){
            console.error(error);
        }
    }
    
    const handleDelete = async () => {
        try {
            await deleteUser(user.userId);
            handleUserDelete(user);
        } catch (error){
            console.error(error);
        }
    }
    
    return (
        <>
        <tr>
            <td>{user.forename} {user.surname}</td>
            <td>{user.email}</td>
            <td>
                <select
                    value={selectedUserGroup ?? user.userGroup.groupId}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedUserGroup(e.target.value)}
                >
                    {userGroups.map((group: UserGroup) => (
                        <option
                            key={group.groupId}
                            value={group.groupId}
                        >
                            {group.groupName}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <button 
                    className="material-symbols-outlined" 
                    onClick={handleDelete}
                >
                    delete
                </button>
        </td>
    <td>
        <button
            className="material-symbols-outlined"
            onClick={() => handleUpdate({userId: user.userId, groupId: Number(selectedUserGroup)})}
        >
            update
        </button>
        </td>
    </tr>
    </>
    )
}