import { Input } from "@/shared/components/ui/input";
import { KeyboardEventHandler, useState } from "react";
import UserManagementList from "../user-management-list/user-management-list";

const UserManagementView = () => {
  const [query, setQuery] = useState("");

  const onInputKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setQuery(e.currentTarget.value);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <Input
        className="w-full sm:w-fit"
        placeholder="Search by email or user id..."
        onKeyDown={onInputKeydown}
      />

      <div className="relative size-full">
        <UserManagementList query={query} />
      </div>
    </div>
  );
};

export default UserManagementView;
