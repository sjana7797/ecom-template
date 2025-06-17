"use client";

import React, { useState } from "react";
import { api } from "@repo/services";
import { DataTable } from "@repo/ui/components/data-table";
import { columns } from "./columns";
import Render from "@repo/ui/components/render";
import TableShimmer from "@repo/ui/components/table-shimmer";
import { Button } from "@repo/ui/components/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

function UserTable() {
  const [page] = useState(1);

  const { data, isLoading, isRefetching, refetch } =
    api.userService.getUser.useInfiniteQuery({
      limit: 10,
      cursor: page,
    });

  const refreshData = () => {
    refetch();
  };

  const users = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end gap-x-2">
        <Button
          onClick={refreshData}
          disabled={isRefetching}
          variant="secondary"
          size="sm"
        >
          Refresh
          <RefreshCw className={cn(isRefetching && "animate-spin", "size-4")} />
        </Button>
        <Button size="sm">
          Add
          <PlusCircle className={cn("size-4")} />
        </Button>
      </div>
      <Render condition={isLoading || !data}>
        <TableShimmer columns={columns} rows={5} />
      </Render>
      <Render condition={!isLoading && !!users}>
        <DataTable data={users} columns={columns} />
      </Render>
    </div>
  );
}

export default UserTable;
