import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getContact, updateContact } from "../data";
import { Form, useLoaderData } from "@remix-run/react";

// Cargador de datos, carga la información del contacto y ponerla en el formulario
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);

  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

// Función de acción, trae los datos del formulario y actualiza el contacto
// consigue la informacion renderizada y enviarla a la API
export const action = async ({ request, params }: ActionFunctionArgs) => {
    invariant(request.method === "POST", "Method Not Allowed");
    invariant(params.contactId, "Missing contactId param");

    const formData = await request.formData();
    // const firstName = formData.get("first");
    // const lastName = formData.get("last");
    const updates = Object.fromEntries(formData);

    await updateContact(params.contactId, updates);

    return redirect(`/contacts/${params.contactId}`, { status: 301 });
};


export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <Form key={contact.id} method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          type="text"
          name="first"
          defaultValue={contact.first}
          placeholder="First"
          aria-label="First Name"
        />
        <input
          type="text"
          name="last"
          defaultValue={contact.last}
          placeholder="Last"
          aria-label="Last Name"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          defaultValue={contact.twitter}
          placeholder="@twitter"
        />
      </label>
      <label>
        <span>Avatar</span>
        <input
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea 
            name="notes" 
            defaultValue={contact.notes}
            rows={6}>
        </textarea>
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
