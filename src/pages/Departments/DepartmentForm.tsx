import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type DepartmentFormData = z.infer<typeof schema>;

export function DepartmentForm({
  onSubmit,
  initialValues,
  loading,
}: {
  onSubmit: (data: DepartmentFormData) => void;
  initialValues?: DepartmentFormData;
  loading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Department Name" {...register("name")} />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
