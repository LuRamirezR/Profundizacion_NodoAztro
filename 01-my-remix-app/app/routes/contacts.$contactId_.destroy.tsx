import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteContact } from "../data";


// Función de acción, trae los datos del formulario y actualiza el contacto
// consigue la informacion renderizada y enviarla a la API
export const action = async ({ params }: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");

    await deleteContact(params.contactId);

    return redirect("/", { status: 301 });
};

