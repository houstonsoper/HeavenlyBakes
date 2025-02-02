import User from "@/interfaces/user";
import {ChangeEvent, useState} from "react";
import UserGroup from "@/interfaces/userGroup";
import {UpdateUserDetails} from "@/interfaces/updateUserDetails";
import {deleteUser, updateUsersUserGroup} from "@/services/userService";
import {useUser} from "@/contexts/userContext";
import Alert from "@/components/alert";

export interface UserDashboardRowProps {
    user: User;
    userGroups: UserGroup[];
    handleUserDelete: (user: User) => void;
}

export default function UserDashboardRow({user, userGroups, handleUserDelete}: UserDashboardRowProps) {
    const [selectedUserGroup, setSelectedUserGroup] = useState<string | null>(null);
    const { auth } = useUser();

    const handleUpdate = async (details: UpdateUserDetails) => {
        //If no group/new group has been selected, do not update the users user group
        if (!selectedUserGroup || Number(selectedUserGroup) === user.userGroup.groupId) {
            return;
        }
        //Update the users group
        try {
            await updateUsersUserGroup(details.userId, details.groupId);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteUser(user.userId);
            handleUserDelete(user);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <tr>
                <td className="border-b border-gray-300">{user.forename} {user.surname}</td>
                <td className="border-b border-gray-300">{user.email}</td>
                <td className="border-b border-gray-300">
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
                <td className="border-b border-gray-300">
                    <div>
                        {auth.user?.userGroup.groupName === "Admin" && (
                            <Alert
                            buttonIcon="delete"
                            buttonText="Delete"
                            title="Delete user"
                            description="Are you sure you want to delete this user?"
                            action={handleDelete}
                            className="m-1 bg-gray-800 hover:bg-gray-900 text-white"
                            cancelText="No"
                            continueText="Yes"
                        />
                        )}
                        {auth.user?.userGroup.groupName === "Admin" && (
                        <Alert
                            buttonIcon="update"
                            buttonText="Update"
                            title="Update user"
                            description="Are you sure you want to update this user?"
                            action={() => handleUpdate({userId: user.userId, groupId: Number(selectedUserGroup)})}
                            className="m-1 bg-pink-700 hover:bg-pink-900 text-white"
                            cancelText="No"
                            continueText="Yes"
                        />
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}