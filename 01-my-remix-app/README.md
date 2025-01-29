# My Remix App
## Getting Started

### 1. Install dependencies
Run the following command to install the required dependencies:
```
npm install
```
This will create the node_modules folder in your project.

### 2. Start the development server
To start your app in development mode, use:
```
npm run dev
```

## App Result
By clicking on any item in the sidebar, the main section displays the name, achievements and image of the selected rider.
![Project Screenshot](../01-my-remix-app/app/images/Screenshot_2.png "Preview of the app")
![Project Screenshot](../01-my-remix-app/app/images/Screenshot_1.png "Preview of the app")

## New features
### 1. Create new item and edit item
A new feature has been added to the application. The `New` button now allows you to create a new item in the list. In the main section, default information is displayed. By clicking the `Edit` button, you can input the following details: first name, last name, description, image URL, and notes.  
To save this information, simply click `Save`, and the new item will appear in the list. If you want to undo the changes before saving them, you can use the `Cancel` button, which will roll back one entry in the browser history.
![Project Screenshot](../01-my-remix-app/app/images/Screenshot_New1.png "Preview of the app")
![Project Screenshot](../01-my-remix-app/app/images/Screenshot_New2.png "Preview of the app")

### 2. Delete item
A delete button has been implemented which, when pressed, prompts for confirmation before sending a `POST` request to the `contacts.$contactId_.destroy.tsx` path. This action uses `deleteContact` to delete the record and then redirects the user to the main page. Remix handles the automatic revalidation to update the data in the interface.

## Remix concepts

### 1. Loader
A `loader` is a function that gets data from the server before rendering a page or component. This ensures the required data is available when the user sees the page.  
This data can come from any source, such as a database, an API or a static file.  
It is used for:
* Load initial data for a route
* Get data that does not change frequently
* Display static or read-only data
```
// Loader: function that obtains data from the server
export const loader = async () => {
  const products = await fetch("https://api.example.com/productos").then((res) =>
    res.json()
  );
  return products; // Returns data to the component
};
```

### 2. useLoaderData
It is a hook used inside a component to access the data **loaded** by the corresponding `loader`.   
In the component, use `useLoaderData()` to access the loader's data:
```
import { useLoaderData } from "@remix-run/react";

export default function Productos() {
  const products = useLoaderData(); // Gets data from the loader
}
```

### 3. Action
Actions are responsible for modifying data on the server in response to a user action. For example, when a user submits a form, creates a new publication or deletes an item (create, update or delete resources).  
It is used for:
* Modify data on the server in response to a user action
* Submit forms
* Create, update or delete resources

### 4. useActionData
It is a hook that is used within a component to access the data **returned** by an action.

### 5. Invariant
It is a utility function in Remix that is used to validate arguments and throw clear and concise errors if the arguments do not meet expectations.  
It is used to ensure that the data passed to a function or component is of the correct type and has the expected values.

### 6. Link Component
Remix provides the `Link` component for navigation between pages without reloading the entire app. This improves performance and user experience by only loading the necessary data for the new view.
Import the Link component like this:
```
import { Link } from "@remix-run/react";
```
Example:
```
<Link to="/ruta">Texto del enlace</Link>
```

### 7. Dynamic Routes
Dynamic routes allow parts of a URL to be variable. For example, in the `routes` folder, you can create a file named `$id.tsx` to handle URLs like `/products/1`.
Example: File structure:
```
app/routes/products/$id.tsx
```
When accessing `/products/1`, the loader will fetch the data for the product with ID 1.

### 8. Nested Routes
Nested routes enable parent pages to render child pages within a shared layout.
Example: File structure:
```
app/
└── routes/
    ├── about.jsx        // parent path
    ├── about.mision.jsx // child path
    └── about.equipo.jsx // other child path
```

### 9. Outlet Component
The `Outlet` component renders child routes within a parent route.
Example:
Parent route (`about.jsx`):
```
import { Outlet } from "@remix-run/react";

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <Outlet />
    </div>
  );
}
```

Child route (`about.mision.jsx`):
```
export default function Mision() {
  return <p>Our mission is to teach Remix</p>;
}
```

When you visit `/about/mission`, Remix combines the layouts:
```
<h1>About Us</h1>
<p>Our mission is to teach Remix</p>
```