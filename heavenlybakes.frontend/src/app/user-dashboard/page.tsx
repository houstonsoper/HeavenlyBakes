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
    const {auth} = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const [usersForNextPage, setUsersForNextPage] = useState<User[]>([]);
    const [userGroups, setUsersGroups] = useState<UserGroup[]>([]);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const searchRef = useRef<HTMLInputElement>(null);
    const limit: number = 10;
    const [groupFilter, setGroupFilter] = useState<number>(0);
    const groupFilterRef = useRef<HTMLSelectElement>(null);

    //Fetch users for the current page
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;

        const getUsers = async () => {
            const fetchedUsers: User[] | [] = await fetchUsers({
                limit,
                offset: (page - 1) * limit,
                search,
                groupId: groupFilter
            }, signal);
            setUsers(fetchedUsers);
        }
        getUsers();

        return () => controller.abort();
    }, [search, groupFilter]);


    //Fetch users for the next page 
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;

        const getUsersForNextPage = async () => {
            const fetchedUsers: User[] | [] = await fetchUsers({
                limit,
                offset: page * limit,
                search,
                groupId: groupFilter
            }, signal);
            setUsersForNextPage(fetchedUsers);
        }
        getUsersForNextPage();

        return () => controller.abort();
    }, [page, search, groupFilter]);

    //Get all user groups on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;
        const getAllUserGroups = async () => {
            const fetchedUserGroups: UserGroup[] = await fetchAllUserGroups(signal);
            setUsersGroups(fetchedUserGroups)
        }
        getAllUserGroups();

        return () => controller.abort();
    }, []);

    const handlePagination = () => {
        setUsers(users => [...users, ...usersForNextPage]);
        setPage(page => page + 1);
    }

    const handlePageReset = () => {
        //If there is text in the search bar clear it
        if (searchRef.current) {
            searchRef.current.value = "";
            setSearch("");
        }

        //Clear group filter
        if (groupFilterRef.current) {
            groupFilterRef.current.value = "0";
            setGroupFilter(0);
        }

        //Slice the users array down to 1 page worth of results
        setUsers(prevUsers => prevUsers.slice(0, limit))

        setPage(1);
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
            setPage(1);
        }
    }
    const groupFilterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setPage(1);
        setGroupFilter(Number(e.target.value));
    }

    //Update the users state when a user is deleted
    const handleUserDelete = (user: User) => {
        setUsers(prevUsers => prevUsers.filter(u => u.userId !== user.userId));
    }

    //If user is not an admin return a 404 error page
    if (auth.user?.userGroup.groupName !== "Admin") {
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
                <div className="mb-8">
                    <div className="lg:flex mb-6 sm:block">
                        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm w-[32rem] h-[2rem] my-auto mx-auto lg:mx-0">
                            <span className="p-2 text-grey-400 material-symbols-outlined bg-gray-100">search</span>
                            <input
                                onKeyDown={handleSearch}
                                defaultValue={search}
                                className="w-full p-2 focus:outline-none"
                                type="text"
                                placeholder="Search by name or e-mail"
                                ref={searchRef}
                            />
                        </div>
                        <div className="flex gap-4 py-2 justify-center ms-auto">
                            <div className="flex items-center">
                                <label className="mr-2 text-gray-700">Group:</label>
                                <select onChange={groupFilterHandler} className="p-2 border rounded-md shadow-sm"
                                        ref={groupFilterRef}>
                                    <option value="0">All</option>
                                    {userGroups.map((group: UserGroup) => (
                                        <option
                                            value={group.groupId}>{group.groupName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md overflow-x-auto rounded-lg">
                        <table className="table-auto w-full">
                            <thead>
                            <tr className="text-left bg-gray-100">
                                <th className="px-4 py-2 text-left text-pink-700">Name</th>
                                <th className="px-4 py-2 text-left text-pink-700">E-mail</th>
                                <th className="px-4 py-2 text-left text-pink-700">Role</th>
                                <th className="px-4 py-2 text-left text-pink-700">Actions</th>
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
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-3 text-xl"> No users found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {usersForNextPage.length > 0 && (
                    <div className="flex">
                        <Button className="m-auto bg-pink-700 hover:bg-pink-800" onClick={handlePagination}>
                            Load more
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}