"use client";

import { ColumnDef } from "@repo/ui/lib/table";
import { User } from "@repo/validators/schema/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
