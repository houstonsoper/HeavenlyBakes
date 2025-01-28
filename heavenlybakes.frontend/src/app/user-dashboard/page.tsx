"use client"

import {useUser} from "@/contexts/userContext";
import PageHeader from "@/components/pageHeader";
import {useEffect, useRef, useState} from "react";
import User from "@/interfaces/user";
import {fetchUsers} from "@/services/userService";
import {fetchAllUserGroups} from "@/services/userGroupService";
import UserGroup from "@/interfaces/userGroup";
import UserDashboardRow from "@/components/userDashboardRow";
import {Button} from "@/components/ui/button";

export default function UserDashboard() {
    const {user} = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const usersRef = useRef<User[]>([]);
    const [usersForNextPage, setUsersForNextPage] = useState<User[]>([]);
    const [userGroups, setUsersGroups] = useState<UserGroup[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [displayBackButton, setDisplayBackButton] = useState(false);
    
    //Fetch users and user groups on mount 
    useEffect(() => {
        const limit: number = 10;
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;

        //Get the users for the current page
        const getUsers = async () => {
            try {
                const fetchedUsers: User[] | [] = await fetchUsers({limit, offset: (pageNumber - 1) * limit}, signal);
                setUsers(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        }

        //Get all user groups
        const getAllUserGroups = async () => {
            try {
                const fetchedUserGroups: UserGroup[] = await fetchAllUserGroups(signal);
                setUsersGroups(fetchedUserGroups)
            } catch (error) {
                console.error(error);
            }
        }
        
        getUsers();
        getAllUserGroups();

        return () => controller.abort();
    }, []);

    //Use effect to fetch users for the next page when the page is updated
    useEffect(() => {
        const limit: number = 10;
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;

        const getUsersForNextPage = async () => {
            try {
                const fetchedUsers: User[] | [] = await fetchUsers({limit, offset: pageNumber * limit}, signal);
                setUsersForNextPage(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        }
        getUsersForNextPage();
        return () => controller.abort();
    }, [pageNumber]);

    console.log("searchterm", searchTerm);

    //Search handler 
    const handleSearch = async () => {
        try {
            //Store the previous list of users in usersRef
            //This is so they can be retrieved once the user returns from the search screen
            usersRef.current = users;
            
            //Reset page
            setPageNumber(1);

            //Find all users which match the search string and update the users state;
            const filteredUsers: User[] = await fetchUsers({search: searchTerm, offset: 0, limit: 999});
            setUsers(filteredUsers);

            //Show/hide the back button based on if search term is empty
            setDisplayBackButton(searchTerm !== "");
            
        } catch (error) {
            console.error(error);
        }
    }
    //Handler to set the users state back to the state before the search,
    // clear the search term and hide the back button
    const handleClearSearch = () => {
        setUsers(usersRef.current);
        setSearchTerm('');
        setDisplayBackButton(false);
    }

    //Handler to load more users when the user clicks load all
    const handlePagination = () => {
        setPageNumber(pageNumber + 1);
        setUsers((currentUsers) => [...currentUsers, ...usersForNextPage]);
    }
    
    //Update the users state when a user is deleted
    const handleUserDelete = (user : User) => {
        setUsers(prevUsers => prevUsers.filter(u => u.userId !== user.userId));
    }
    

    //If user is not an admin return a 404 error page
    if (user?.userGroup.groupName !== "Admin") {
        return (
            <main>
                <h1 className="text-center py-12">404 - Page Not Found</h1>
            </main>
        )
    }

    return (
        <main>
            <div>
                <PageHeader
                    title="User Dashboard"
                    description="Manage users within the system"
                />
            </div>
            <div className="container m-auto h-screen border my-12 px-5">
                <div className="py-4">
                    <div className="w-1/2 m-auto">
                        <div className="flex border rounded w-full mb-12 px-1">
                            <span className="m-auto material-symbols-outlined">search</span>
                            <input
                                onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && handleSearch()}
                                defaultValue={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setSearchTerm(e.target.value);
                                }}
                                className="w-full p-1"
                                type="text"
                                placeholder="Search by name or e-mail"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="text-left">
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length > 0 ? (
                                users.map((user: User) => (
                                    <UserDashboardRow 
                                        key={user.userId} 
                                        user={user} 
                                        userGroups={userGroups}
                                        handleUserDelete={handleUserDelete}
                                    />
                                ))
                            ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex pt-12">
                    {/*If there are more users to load and not a search display the "Load more" button*/}
                    {usersForNextPage.length > 0 && searchTerm === "" && (
                        <Button className="m-auto" onClick={handlePagination}>
                            Load more
                        </Button>
                    )}
                    {/* Back button */}
                    {displayBackButton && (
                        <Button 
                            className="m-auto"
                            onClick={handleClearSearch}>
                            Back
                        </Button> 
                    )}
                </div>
            </div>
        </main>
    )
}