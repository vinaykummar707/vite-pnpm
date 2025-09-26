import React, { use } from "react";
import * as SubframeUtils from "../utils";
import {
  useOrganizationStore,
  type Organization,
} from "@/store/useOrganizationStore";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_ORGANIZATIONS } from "@/gql/organizations.gql";
import { Select } from "./Select";

interface OrganizationSelectRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const OrganizationSelectRoot = React.forwardRef<
  HTMLDivElement,
  OrganizationSelectRootProps
>(function OrganizationSelectRoot(
  { className, ...otherProps }: OrganizationSelectRootProps,
  ref
) {
  const { selectedOrganization, setSelectedOrganization } =
    useOrganizationStore();

  const { data, loading, error } = useQuery(GET_ALL_ORGANIZATIONS);

  const organizations: Organization[] = data?.organizations || [];

  const handleChange = (id: string) => {
    const org = organizations.find((o) => o.id === id);
    if (org) setSelectedOrganization(org);
  };

  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-2 px-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <Select
        className="h-auto w-full flex-none"
        label=""
        placeholder="Select Organization"
        helpText=""
        onValueChange={handleChange}
        value={selectedOrganization?.id ?? ""}
      >
        {organizations.map((org) => (
          <Select.Item key={org.id} value={org.id}>
            {org.name}
          </Select.Item>
        ))}
        {organizations.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground">
            No organizations found
          </p>
        )}
      </Select>
    </div>
  );
});

export const OrganizationSelect = OrganizationSelectRoot;
