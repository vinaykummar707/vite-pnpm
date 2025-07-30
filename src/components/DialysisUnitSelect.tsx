'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useDialysisUnitStore } from '@/store/useDialysisUnitStore';
import { Skeleton } from '@/components/ui/skeleton';

const GET_DIALYSIS_UNITS = gql`
  subscription GetDialysisUnits {
    dialysis_units(order_by: { name: asc }) {
      id
      name
      location
    }
  }
`;

export function DialysisUnitSelect() {
  const { data, loading } = useSubscription(GET_DIALYSIS_UNITS);
  const { selectedUnit, setSelectedUnit } = useDialysisUnitStore();

  const handleChange = (id: string) => {
    const unit = data.dialysis_units.find((u: any) => u.id === id);
    if (unit) setSelectedUnit(unit);
  };

  if (loading) return <Skeleton className="w-full h-10 rounded-md" />;

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
          {data?.dialysis_units?.map((unit: any) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.name} – {unit.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
