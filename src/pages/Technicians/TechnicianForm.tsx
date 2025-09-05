import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
});

export type TechnicianFormData = z.infer<typeof schema>;

export function TechnicianForm({
  onSubmit,
  initialValues,
  loading,
}: {
  onSubmit: (data: TechnicianFormData) => void;
  initialValues?: TechnicianFormData;
  loading?: boolean;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technician Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: John Doe" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormDescription>We won't spam you, we promise.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="99XXXXXXXX" {...field} type="number" />
              </FormControl>
              <FormDescription>No need to add country code</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Input placeholder="Name" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <Input placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <Input placeholder="Phone" {...register("phone")} />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div> */}
          <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
      </form>
    </Form>

  );
}
