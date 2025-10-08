import {useForm, useFieldArray, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from "@/ui";
import RouteCreationLayout from "@/pages/Routes/RouteCreation/RouteCreationLayout.tsx";


// --- Zod schemas ---
const ScrollTypeEnum = z.enum(["Right To Left", "Fixed", "Left To Right"]);
const PositionEnum = z.enum(["Center", "Left", "Right"]);
const FontWeightEnum = z.enum(["bold", "normal"]);
const FormatEnum = z.enum(["single", "two", "three"]);
const LanguageEnum = z.enum(["en", "hi", "te"]);
const RouteTypeEnum = z.enum(["route", "specialMessage"]);


const TextAttributesSchema = z.object({
    text: z.string().optional().default(''),
    bitmap: z.string().optional().default(''),
    fontWidth: z.number().nullable().default(null),
    scrollType: ScrollTypeEnum,
    position: PositionEnum,
    scrollSpeed: z.string().default('1'),
    fontSize: z.string().default('16'),
    fontWeight: FontWeightEnum,
    fontHeight: z.string().default('16'),
    x_offset: z.string().default('0'),
    y_offset: z.string().default('0'),
    spacing: z.string().default('1'),
});

const SingleTextSchema = z.object({
    text: TextAttributesSchema.optional(),
});

const TwoTextSchema = z.object({
    sideText: TextAttributesSchema.optional(),
    text: TextAttributesSchema.optional(),
    routeNumber1: TextAttributesSchema.optional(),
    routeNumber2: TextAttributesSchema.optional(),
});

const ThreeTextSchema = z.object({
    sideText: TextAttributesSchema.optional(),
    text: TextAttributesSchema.optional(),
    routeNumber1: TextAttributesSchema.optional(),
    routeNumber2: TextAttributesSchema.optional(),
    upperHalfText: TextAttributesSchema.optional(),
    lowerHalfText: TextAttributesSchema.optional(),
});

const RouteFormatSchema = z.object({
    format: FormatEnum,
    language: LanguageEnum,
    type: RouteTypeEnum,
    duration: z.number().default(0),
    nextChangeIn: z.number().default(0),
    texts: z.union([SingleTextSchema, TwoTextSchema, ThreeTextSchema]),
});

const RouteSchema = z.object({
    routeNumber: z.string().default(''),
    source: z.string().default(''),
    destination: z.string().default(''),
    via: z.string().default(''),
    splitRoute: z.boolean().default(false),
    routeNumber1: z.string().default(''),
    routeNumber2: z.string().default(''),
    separation: z.string().default(''),
});

const RouteInformationSchema = z.object({
    route: RouteSchema,
    front: z.array(RouteFormatSchema).default([]),
    side: z.array(RouteFormatSchema).default([]),
    rear: z.array(RouteFormatSchema).default([]),
    internal: z.array(RouteFormatSchema).default([]),
    version: z.string().default('1.0'),
    areaId: z.string().default(''),
    depotId: z.string().default(''),
    active: z.boolean().default(true),
    deleted: z.boolean().default(false),
    createdAt: z.string().default(new Date().toISOString()),
});

export type RouteInformation = z.infer<typeof RouteInformationSchema>;
const defaultTextAttributes = {
    text: "",
    bitmap: "",
    fontWidth: null,
    scrollType: "Right To Left",
    position: "Center",
    scrollSpeed: "",
    fontSize: "",
    fontWeight: "normal",
    fontHeight: "",
    x_offset: "",
    y_offset: "",
    spacing: "",
};
const defaultRouteFormat = (format: z.infer<typeof FormatEnum> = "single") => ({
    format,
    language: "en",
    type: "route",
    duration: 5,
    nextChangeIn: 0,
    texts: format === "single" ? {text: defaultTextAttributes} : format === "two" ? {text: defaultTextAttributes} : {text: defaultTextAttributes},
});

const defaultValues: RouteInformation = {
    route: {
        routeNumber: "",
        source: "",
        destination: "",
        via: "",
        splitRoute: false,
        routeNumber1: "",
        routeNumber2: "",
        separation: "",
    },
    front: [],
    side: [],
    rear: [],
    internal: [],
    version: "2.0",
    areaId: "",
    depotId: "",
    active: true,
    deleted: false,
    createdAt: new Date().toISOString(),
};

export default function RouteCreationPage() {
    const methods = useForm<RouteInformation>({
        resolver: zodResolver(RouteInformationSchema),
        defaultValues,
    });

    const { register, handleSubmit, watch} = methods;

    const submit = (data: RouteInformation) => {
        console.log("validated payload", data);
    };

    // handleSubmit is used directly as the form's onSubmit handler
    return (
        <FormProvider {...methods}>
            <form >
                <RouteCreationLayout/>
            </form>
        </FormProvider>

    );
}


