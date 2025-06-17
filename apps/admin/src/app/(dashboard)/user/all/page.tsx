import React from "react";
import UserTable from "~/features/users/components/user-table";

type Props = {};

function AllUsers({}: Props) {
  return (
    <main className="@container/main flex flex-1 flex-col gap-2 p-4">
      <UserTable />
    </main>
  );
}

export default AllUsers;
