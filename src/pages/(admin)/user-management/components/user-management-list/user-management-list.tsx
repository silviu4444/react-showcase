import TryAgainButton from "@/shared/components/buttons/try-again-button";
import Spinner from "@/shared/components/ui/spinner";
import { FC } from "react";
import useGetUserQuery from "../../hooks/use-get-user-query";
import UserManagementItem from "../user-management-item/user-management-item";

type UserManagementListProps = {
  query: string;
};

const UserManagementList: FC<UserManagementListProps> = ({ query }) => {
  const { isFetching, error, isError, refetch, data } = useGetUserQuery({
    query
  });

  if (isFetching) {
    return <Spinner center />;
  }

  if (error?.response?.status === 404) {
    return <h1 className="text-center text-lg font-medium">No user found</h1>;
  }

  if (isError) {
    return <TryAgainButton onRetry={refetch} />;
  }

  if (!data) {
    return;
  }

  return <UserManagementItem user={data} />;
};

export default UserManagementList;
