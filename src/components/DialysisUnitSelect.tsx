'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gql, useSubscription, useQuery } from '@apollo/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useDialysisUnitStore } from '@/store/useDialysisUnitStore';
import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

const GET_DIALYSIS_UNITS = gql`
  subscription GetDialysisUnits {
    dialysis_units(order_by: { name: asc }) {
      id
      name
      location
    }
  }
`;

const GET_UNIT_ADMIN = gql`
  query GetUnitAdmin($id: uuid!) {
    unit_admins_by_pk(id: $id) {
      dialysis_unit_id
    }
  }
`;

const GET_DIALYSIS_UNIT_BY_ID = gql`
  query GetDialysisUnitById($id: uuid!) {
    dialysis_units_by_pk(id: $id) {
      id
      name
      location
    }
  }
`;

export function DialysisUnitSelect() {
  const { selectedUnit, setSelectedUnit } = useDialysisUnitStore();
  const auth = useAuth();
  const user = auth?.user;
  const role = user?.user_metadata?.role;
  const userId = user?.id;

  // MASTER: fetch all units
  const {
    data: allUnitsData,
    loading: allUnitsLoading,
    error: allUnitsError,
  } = useSubscription(GET_DIALYSIS_UNITS, { skip: role !== 'MASTER' });

  // UNIT_ADMIN: fetch only assigned unit
  const {
    data: adminData,
    loading: adminLoading,
    error: adminError,
  } = useQuery(GET_UNIT_ADMIN, {
    variables: { id: userId },
    skip: role !== 'UNIT_ADMIN' || !userId,
  });

  const dialysisUnitId = adminData?.unit_admins_by_pk?.dialysis_unit_id;

  const {
    data: unitData,
    loading: unitLoading,
    error: unitError,
  } = useQuery(GET_DIALYSIS_UNIT_BY_ID, {
    variables: { id: dialysisUnitId },
    skip: !dialysisUnitId || role !== 'UNIT_ADMIN',
  });

  // Combine loading and error states
  const loading = allUnitsLoading || adminLoading || unitLoading;
  const error = allUnitsError || adminError || unitError;

  // Prepare units array
  let units: any[] = [];
  if (role === 'MASTER') {
    units = allUnitsData?.dialysis_units || [];
  } else if (role === 'UNIT_ADMIN' && unitData?.dialysis_units_by_pk) {
    units = [unitData.dialysis_units_by_pk];
  }

  const handleChange = (id: string) => {
    const unit = units.find((u: any) => u.id === id);
    if (unit) setSelectedUnit(unit);
  };

  if (loading) return <Skeleton className="w-full h-10 rounded-md" />;

  if (error) {
    return (
      <div className="w-full p-2 text-sm text-red-500 border border-red-200 rounded-md">
        Error loading dialysis units: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <Select
        onValueChange={handleChange}
        value={selectedUnit?.id ?? ''}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a dialysis unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit: any) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.name} – {unit.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {units.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">No dialysis units found</p>
      )}
    </div>
  );
}