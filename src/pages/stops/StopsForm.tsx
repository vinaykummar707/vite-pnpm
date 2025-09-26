// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";

// const schema = z.object({
//   route_id: z.string().uuid({ message: "Valid route ID required" }),
//   name: z.string().uuid({ message: "Valid stop name required" }),
//   down_latitude: z.number({ message: "Latitude required" }),
//   down_longitude: z.number({ message: "Longitude required" }),
//   up_latitude: z.number({ message: "Latitude required" }),
//   up_longitude: z.number({ message: "Longitude required" }),
// });

// export type StopFormData = z.infer<typeof schema>;

// export function StopsForm({
//   onSubmit,
//   initialValues,
//   loading,
// }: {
//   onSubmit: (data: StopFormData) => void;
//   initialValues?: Partial<StopFormData>;
//   loading?: boolean;
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<StopFormData>({
//     resolver: zodResolver(schema),
//     defaultValues: initialValues,
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Input placeholder="Route ID" {...register("route_id")} />
//       {errors.route_id && <p className="text-sm text-red-500">{errors.route_id.message}</p>}

//       <Input
//         type="number"
//         step="any"
//         placeholder="Down Latitude"
//         {...register("down_latitude", { valueAsNumber: true })}
//       />
//       {errors.down_latitude && <p className="text-sm text-red-500">{errors.down_latitude.message}</p>}

//       <Input
//         type="number"
//         step="any"
//         placeholder="Down Longitude"
//         {...register("down_longitude", { valueAsNumber: true })}
//       />
//       {errors.down_longitude && <p className="text-sm text-red-500">{errors.down_longitude.message}</p>}

//       <Input
//         type="number"
//         step="any"
//         placeholder="Up Latitude"
//         {...register("up_latitude", { valueAsNumber: true })}
//       />
//       {errors.up_latitude && <p className="text-sm text-red-500">{errors.up_latitude.message}</p>}

//       <Input
//         type="number"
//         step="any"
//         placeholder="Up Longitude"
//         {...register("up_longitude", { valueAsNumber: true })}
//       />
//       {errors.up_longitude && <p className="text-sm text-red-500">{errors.up_longitude.message}</p>}

//       <div className="flex justify-end">
//         <Button type="submit" disabled={loading}>
//           {loading ? "Saving..." : "Save"}
//         </Button>
//       </div>
//     </form>
//   );
// }

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  up_latitude: z.string().min(1, { message: "This field is required" }),
  up_longitude: z.string().min(1, { message: "This field is required" }),
  down_latitude: z.string().min(1, { message: "This field is required" }),
  down_longitude: z.string().min(1, { message: "This field is required" }),
});

export type StopFormData = z.infer<typeof formSchema>;

export default function StopsForm({
  onSubmit,
  initialValues,
  loading,
}: {
  onSubmit: (data: StopFormData) => void;
  initialValues?: Partial<StopFormData>;
  loading?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container"
      >
        <div className="grid grid-cols-12 gap-4">
          <div key="text-0" id="text-0" className=" col-span-12 col-start-auto">
            <p className="not-first:mt-6 leading-7">
              <span className="text-lg font-semibold">Add Stop</span>
              <br />
              <span className="text-sm text-muted-foreground">
                This is your real world bus stop.
              </span>
            </p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Stop Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-2"
                        placeholder="ex: Kachiguda"
                        type="text"
                        id="name"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div key="text-1" id="" className=" col-span-12 col-start-auto">
            <p className="not-first:mt-6">
              <span className="text-sm text-muted-foreground">
                Positions from source - destination
              </span>
            </p>
          </div>

          <FormField
            control={form.control}
            name="up_latitude"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Latitude</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="ex: 17.999232"
                        type="text"
                        id="up_latitude"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="up_longitude"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Longitude</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-1"
                        placeholder="ex: 17.999232"
                        type="text"
                        id="up_longitude"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div key="text-2" id="" className=" col-span-12 col-start-auto">
            <p className="not-first:mt-6">
              <span className="text-sm text-muted-foreground">
                Positions from destination - source
              </span>
            </p>
          </div>

          <FormField
            control={form.control}
            name="down_latitude"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Latitude</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-3"
                        placeholder="ex:23.676455"
                        type="text"
                        id="down_latitude"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="down_longitude"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Longitude</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-4"
                        placeholder="ex: 67.0232132"
                        type="text"
                        id="down_longitude"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            key="submit-button-0"
            id="submit-button-0"
            name=""
            className="col-span-12"
            type="submit"
            variant="default"
          >
            Submit
          </Button>

          <Button
            key="button-1"
            id="button-1"
            name=""
            className="col-span-12"
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
