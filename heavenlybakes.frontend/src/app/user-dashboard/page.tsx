"use client"

import {useUser} from "@/contexts/userContext";
import PageHeader from "@/components/pageHeader";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import User from "@/interfaces/user";
import {fetchUsers} from "@/services/userService";
import {fetchAllUserGroups} from "@/services/userGroupService";
import UserGroup from "@/interfaces/userGroup";
import UserDashboardRow from "@/components/userDashboardRow";
import {Button} from "@/components/ui/button";

export default function UserDashboard() {
    const {user} = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const [usersForNextPage, setUsersForNextPage] = useState<User[]>([]);
    const [userGroups, setUsersGroups] = useState<UserGroup[]>([]);
    const [search, setSearch] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const searchRef = useRef<string>('');
    const limit: number = 10;
    const [groupFilter, setGroupFilter] = useState<number>(0);

    //Fetch users
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;

        //Get the users for the current page
        const getUsers = async () => {
            try {
                const fetchedUsers: User[] | [] = await fetchUsers({limit, offset: (pageNumber - 1) * limit, search, groupId : groupFilter}, signal);
                setUsers(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        }
        getUsers();

        return () => controller.abort();
    }, [search, groupFilter]);


    //Fetch users for the next page when the page is updated
    useEffect(() => {
        const limit: number = 10;
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;

        const getUsersForNextPage = async () => {
            try {
                const fetchedUsers: User[] | [] = await fetchUsers({limit, offset: pageNumber * limit, search, groupId : groupFilter}, signal);
                setUsersForNextPage(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        }
        getUsersForNextPage();
        
        return () => controller.abort();
    }, [pageNumber, search, groupFilter]);

    //Get all user groups on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;
        const getAllUserGroups = async () => {
            try {
                const fetchedUserGroups: UserGroup[] = await fetchAllUserGroups(signal);
                setUsersGroups(fetchedUserGroups)
            } catch (error) {
                console.error(error);
            }
        }
        getAllUserGroups();
        
        return () => controller.abort();
    }, []);
    
    //Handler to update search state
    const searchHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            //Don't update the search state if the input matches what is already stored in state
            //Instead set the users state to the first 10 users of the current state
            if (searchRef.current === search){
                setUsers(users => users.slice(0 , limit))
            }
            
            setSearch(searchRef.current); //Update search
            setPageNumber(1);
        }
    }
    
    //Handler to set the users state back to the state before the search,
    // clear the search term and hide the back button
    const handleClearSearch = () => {
        searchRef.current = "";
        setSearch(searchRef.current);
        setPageNumber(1);
    }

    //Handler to load more users when the user clicks load all
    const handlePagination = () => {
        setPageNumber(pageNumber + 1);
        setUsers((currentUsers) => [...currentUsers, ...usersForNextPage]);
    }
    
    const groupFilterHandler = ( e : ChangeEvent<HTMLSelectElement>) => {
        setPageNumber(1);
        setGroupFilter(Number(e.target.value));
    }

    //Update the users state when a user is deleted
    const handleUserDelete = (user: User) => {
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
            <div className="container m-auto my-12 px-5">
                <div className="py-4">
                    <div className="w-1/2 m-auto">
                        <div className="flex border rounded w-full mb-12 px-1">
                            <span className="m-auto material-symbols-outlined">search</span>
                            <input
                                onKeyDown={searchHandler}
                                onChange={(e) => searchRef.current = e.target.value}
                                defaultValue={search}
                                className="w-full p-1"
                                type="text"
                                placeholder="Search by name or e-mail"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="ms-auto">
                            <label className="font-semibold text-pink-700">Group:</label>
                            <select onChange={groupFilterHandler} className="border mx-1 px-1 rounded ">
                                <option value="0">All</option>
                                {userGroups.map((group: UserGroup) => (
                                    <option
                                        value={group.groupId}>{group.groupName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="text-left">
                                <th className="border-b border-gray-300 text-pink-700">Name</th>
                                <th className="border-b border-gray-300 text-pink-700">E-mail</th>
                                <th className="border-b border-gray-300 text-pink-700">Role</th>
                                <th className="border-b border-gray-300 text-pink-700">Actions</th>
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
                    {usersForNextPage.length > 0 && (
                        <Button className="m-auto bg-pink-700 hover:bg-pink-800" onClick={handlePagination}>
                            Load more
                        </Button>
                    )}
                    {/* Back button */}
                    {searchRef.current !== "" && usersForNextPage.length <= 0 && (
                        <Button
                            className="m-auto bg-pink-700 hover:bg-pink-800"
                            onClick={handleClearSearch}>
                            Back
                        </Button>
                    )}
                </div>
            </div>
        </main>
    )
}